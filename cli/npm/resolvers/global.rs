// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.

//! Code for global npm cache resolution.

use std::path::Path;
use std::path::PathBuf;
use std::sync::Arc;

use async_trait::async_trait;
use deno_ast::ModuleSpecifier;
use deno_core::error::AnyError;
use deno_core::url::Url;
use deno_npm::resolution::PackageNotFoundFromReferrerError;
use deno_npm::NpmPackageCacheFolderId;
use deno_npm::NpmPackageId;
use deno_npm::NpmResolutionPackage;
use deno_npm::NpmSystemInfo;
use deno_runtime::deno_fs::FileSystem;
use deno_runtime::deno_node::NodePermissions;
use deno_runtime::deno_node::NodeResolutionMode;

use crate::npm::resolution::NpmResolution;
use crate::npm::resolvers::common::cache_packages;
use crate::npm::NpmCache;

use super::common::ensure_registry_read_permission;
use super::common::types_package_name;
use super::common::NpmPackageFsResolver;

/// Resolves packages from the global npm cache.
#[derive(Debug)]
pub struct GlobalNpmPackageResolver {
  fs: Arc<dyn FileSystem>,
  cache: Arc<NpmCache>,
  resolution: Arc<NpmResolution>,
  registry_url: Url,
  system_info: NpmSystemInfo,
}

impl GlobalNpmPackageResolver {
  pub fn new(
    fs: Arc<dyn FileSystem>,
    cache: Arc<NpmCache>,
    registry_url: Url,
    resolution: Arc<NpmResolution>,
    system_info: NpmSystemInfo,
  ) -> Self {
    Self {
      fs,
      cache,
      resolution,
      registry_url,
      system_info,
    }
  }

  fn resolve_types_package(
    &self,
    package_name: &str,
    referrer_pkg_id: &NpmPackageCacheFolderId,
  ) -> Result<NpmResolutionPackage, Box<PackageNotFoundFromReferrerError>> {
    let types_name = types_package_name(package_name);
    self
      .resolution
      .resolve_package_from_package(&types_name, referrer_pkg_id)
  }
}

#[async_trait]
impl NpmPackageFsResolver for GlobalNpmPackageResolver {
  fn root_dir_url(&self) -> &Url {
    self.cache.root_dir_url()
  }

  fn node_modules_path(&self) -> Option<PathBuf> {
    None
  }

  fn package_folder(&self, id: &NpmPackageId) -> Result<PathBuf, AnyError> {
    let folder_id = self
      .resolution
      .resolve_package_cache_folder_id_from_id(id)
      .unwrap();
    Ok(
      self
        .cache
        .package_folder_for_id(&folder_id, &self.registry_url),
    )
  }

  fn resolve_package_folder_from_package(
    &self,
    name: &str,
    referrer: &ModuleSpecifier,
    mode: NodeResolutionMode,
  ) -> Result<PathBuf, AnyError> {
    let referrer_pkg_id = self
      .cache
      .resolve_package_folder_id_from_specifier(referrer, &self.registry_url)?;
    let pkg = if mode.is_types() && !name.starts_with("@types/") {
      // attempt to resolve the types package first, then fallback to the regular package
      match self.resolve_types_package(name, &referrer_pkg_id) {
        Ok(pkg) => pkg,
        Err(_) => self
          .resolution
          .resolve_package_from_package(name, &referrer_pkg_id)?,
      }
    } else {
      self
        .resolution
        .resolve_package_from_package(name, &referrer_pkg_id)?
    };
    self.package_folder(&pkg.pkg_id)
  }

  fn resolve_package_folder_from_specifier(
    &self,
    specifier: &ModuleSpecifier,
  ) -> Result<PathBuf, AnyError> {
    let pkg_folder_id = self.cache.resolve_package_folder_id_from_specifier(
      specifier,
      &self.registry_url,
    )?;
    Ok(
      self
        .cache
        .package_folder_for_id(&pkg_folder_id, &self.registry_url),
    )
  }

  async fn cache_packages(&self) -> Result<(), AnyError> {
    let package_partitions = self
      .resolution
      .all_system_packages_partitioned(&self.system_info);

    cache_packages(
      package_partitions.packages,
      &self.cache,
      &self.registry_url,
    )
    .await?;

    // create the copy package folders
    for copy in package_partitions.copy_packages {
      self.cache.ensure_copy_package(
        &copy.get_package_cache_folder_id(),
        &self.registry_url,
      )?;
    }

    Ok(())
  }

  fn ensure_read_permission(
    &self,
    permissions: &dyn NodePermissions,
    path: &Path,
  ) -> Result<(), AnyError> {
    let registry_path = self.cache.registry_folder(&self.registry_url);
    ensure_registry_read_permission(&self.fs, permissions, &registry_path, path)
  }
}
