// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.

// deno-lint-ignore-file

const core = globalThis.Deno.core;
const ops = core.ops;
const internals = globalThis.__bootstrap.internals;
const primordials = globalThis.__bootstrap.primordials;
const {
  ArrayIsArray,
  ArrayPrototypeIncludes,
  ArrayPrototypeIndexOf,
  ArrayPrototypeJoin,
  ArrayPrototypePush,
  ArrayPrototypeSlice,
  ArrayPrototypeSplice,
  ObjectGetOwnPropertyDescriptor,
  ObjectGetPrototypeOf,
  ObjectHasOwn,
  ObjectSetPrototypeOf,
  ObjectKeys,
  ObjectEntries,
  ObjectPrototype,
  ObjectCreate,
  Proxy,
  SafeMap,
  SafeWeakMap,
  SafeArrayIterator,
  JSONParse,
  String,
  StringPrototypeEndsWith,
  StringPrototypeIndexOf,
  StringPrototypeIncludes,
  StringPrototypeMatch,
  StringPrototypeSlice,
  StringPrototypeSplit,
  StringPrototypeStartsWith,
  StringPrototypeCharCodeAt,
  RegExpPrototypeTest,
  Error,
  TypeError,
} = primordials;
import { nodeGlobalThis } from "ext:deno_node/00_globals.js";
import _httpAgent from "ext:deno_node/_http_agent.mjs";
import _httpOutgoing from "ext:deno_node/_http_outgoing.ts";
import _streamDuplex from "ext:deno_node/internal/streams/duplex.mjs";
import _streamPassthrough from "ext:deno_node/internal/streams/passthrough.mjs";
import _streamReadable from "ext:deno_node/internal/streams/readable.mjs";
import _streamTransform from "ext:deno_node/internal/streams/transform.mjs";
import _streamWritable from "ext:deno_node/internal/streams/writable.mjs";
import assert from "ext:deno_node/assert.ts";
import assertStrict from "ext:deno_node/assert/strict.ts";
import asyncHooks from "ext:deno_node/async_hooks.ts";
import buffer from "ext:deno_node/buffer.ts";
import childProcess from "ext:deno_node/child_process.ts";
import cluster from "ext:deno_node/cluster.ts";
import console from "ext:deno_node/console.ts";
import constants from "ext:deno_node/constants.ts";
import crypto from "ext:deno_node/crypto.ts";
import dgram from "ext:deno_node/dgram.ts";
import diagnosticsChannel from "ext:deno_node/diagnostics_channel.ts";
import dns from "ext:deno_node/dns.ts";
import dnsPromises from "ext:deno_node/dns/promises.ts";
import domain from "ext:deno_node/domain.ts";
import events from "ext:deno_node/events.ts";
import fs from "ext:deno_node/fs.ts";
import fsPromises from "ext:deno_node/fs/promises.ts";
import http from "ext:deno_node/http.ts";
import http2 from "ext:deno_node/http2.ts";
import https from "ext:deno_node/https.ts";
import inspector from "ext:deno_node/inspector.ts";
import internalCp from "ext:deno_node/internal/child_process.ts";
import internalCryptoCertificate from "ext:deno_node/internal/crypto/certificate.ts";
import internalCryptoCipher from "ext:deno_node/internal/crypto/cipher.ts";
import internalCryptoDiffiehellman from "ext:deno_node/internal/crypto/diffiehellman.ts";
import internalCryptoHash from "ext:deno_node/internal/crypto/hash.ts";
import internalCryptoHkdf from "ext:deno_node/internal/crypto/hkdf.ts";
import internalCryptoKeygen from "ext:deno_node/internal/crypto/keygen.ts";
import internalCryptoKeys from "ext:deno_node/internal/crypto/keys.ts";
import internalCryptoPbkdf2 from "ext:deno_node/internal/crypto/pbkdf2.ts";
import internalCryptoRandom from "ext:deno_node/internal/crypto/random.ts";
import internalCryptoScrypt from "ext:deno_node/internal/crypto/scrypt.ts";
import internalCryptoSig from "ext:deno_node/internal/crypto/sig.ts";
import internalCryptoUtil from "ext:deno_node/internal/crypto/util.ts";
import internalCryptoX509 from "ext:deno_node/internal/crypto/x509.ts";
import internalDgram from "ext:deno_node/internal/dgram.ts";
import internalDnsPromises from "ext:deno_node/internal/dns/promises.ts";
import internalErrors from "ext:deno_node/internal/errors.ts";
import internalEventTarget from "ext:deno_node/internal/event_target.mjs";
import internalFsUtils from "ext:deno_node/internal/fs/utils.mjs";
import internalHttp from "ext:deno_node/internal/http.ts";
import internalReadlineUtils from "ext:deno_node/internal/readline/utils.mjs";
import internalStreamsAddAbortSignal from "ext:deno_node/internal/streams/add-abort-signal.mjs";
import internalStreamsBufferList from "ext:deno_node/internal/streams/buffer_list.mjs";
import internalStreamsLazyTransform from "ext:deno_node/internal/streams/lazy_transform.mjs";
import internalStreamsState from "ext:deno_node/internal/streams/state.mjs";
import internalTestBinding from "ext:deno_node/internal/test/binding.ts";
import internalTimers from "ext:deno_node/internal/timers.mjs";
import internalUtil from "ext:deno_node/internal/util.mjs";
import internalUtilInspect from "ext:deno_node/internal/util/inspect.mjs";
import net from "ext:deno_node/net.ts";
import os from "ext:deno_node/os.ts";
import pathPosix from "ext:deno_node/path/posix.ts";
import pathWin32 from "ext:deno_node/path/win32.ts";
import path from "ext:deno_node/path.ts";
import perfHooks from "ext:deno_node/perf_hooks.ts";
import punycode from "ext:deno_node/punycode.ts";
import process from "ext:deno_node/process.ts";
import querystring from "ext:deno_node/querystring.ts";
import readline from "ext:deno_node/readline.ts";
import readlinePromises from "ext:deno_node/readline/promises.ts";
import repl from "ext:deno_node/repl.ts";
import stream from "ext:deno_node/stream.ts";
import streamConsumers from "ext:deno_node/stream/consumers.mjs";
import streamPromises from "ext:deno_node/stream/promises.mjs";
import streamWeb from "ext:deno_node/stream/web.ts";
import stringDecoder from "ext:deno_node/string_decoder.ts";
import sys from "ext:deno_node/sys.ts";
import timers from "ext:deno_node/timers.ts";
import timersPromises from "ext:deno_node/timers/promises.ts";
import tls from "ext:deno_node/tls.ts";
import tty from "ext:deno_node/tty.ts";
import url from "ext:deno_node/url.ts";
import utilTypes from "ext:deno_node/util/types.ts";
import util from "ext:deno_node/util.ts";
import v8 from "ext:deno_node/v8.ts";
import vm from "ext:deno_node/vm.ts";
import workerThreads from "ext:deno_node/worker_threads.ts";
import wasi from "ext:deno_node/wasi.ts";
import zlib from "ext:deno_node/zlib.ts";

const nativeModuleExports = ObjectCreate(null);
const builtinModules = [];

// NOTE(bartlomieju): keep this list in sync with `ext/node/polyfill.rs`
function setupBuiltinModules() {
  const nodeModules = {
    "_http_agent": _httpAgent,
    "_http_outgoing": _httpOutgoing,
    "_stream_duplex": _streamDuplex,
    "_stream_passthrough": _streamPassthrough,
    "_stream_readable": _streamReadable,
    "_stream_transform": _streamTransform,
    "_stream_writable": _streamWritable,
    assert,
    "assert/strict": assertStrict,
    "async_hooks": asyncHooks,
    buffer,
    crypto,
    console,
    constants,
    child_process: childProcess,
    cluster,
    dgram,
    diagnostics_channel: diagnosticsChannel,
    dns,
    "dns/promises": dnsPromises,
    domain,
    events,
    fs,
    "fs/promises": fsPromises,
    http,
    http2,
    https,
    inspector,
    "internal/child_process": internalCp,
    "internal/crypto/certificate": internalCryptoCertificate,
    "internal/crypto/cipher": internalCryptoCipher,
    "internal/crypto/diffiehellman": internalCryptoDiffiehellman,
    "internal/crypto/hash": internalCryptoHash,
    "internal/crypto/hkdf": internalCryptoHkdf,
    "internal/crypto/keygen": internalCryptoKeygen,
    "internal/crypto/keys": internalCryptoKeys,
    "internal/crypto/pbkdf2": internalCryptoPbkdf2,
    "internal/crypto/random": internalCryptoRandom,
    "internal/crypto/scrypt": internalCryptoScrypt,
    "internal/crypto/sig": internalCryptoSig,
    "internal/crypto/util": internalCryptoUtil,
    "internal/crypto/x509": internalCryptoX509,
    "internal/dgram": internalDgram,
    "internal/dns/promises": internalDnsPromises,
    "internal/errors": internalErrors,
    "internal/event_target": internalEventTarget,
    "internal/fs/utils": internalFsUtils,
    "internal/http": internalHttp,
    "internal/readline/utils": internalReadlineUtils,
    "internal/streams/add-abort-signal": internalStreamsAddAbortSignal,
    "internal/streams/buffer_list": internalStreamsBufferList,
    "internal/streams/lazy_transform": internalStreamsLazyTransform,
    "internal/streams/state": internalStreamsState,
    "internal/test/binding": internalTestBinding,
    "internal/timers": internalTimers,
    "internal/util/inspect": internalUtilInspect,
    "internal/util": internalUtil,
    net,
    os,
    "path/posix": pathPosix,
    "path/win32": pathWin32,
    path,
    perf_hooks: perfHooks,
    process,
    get punycode() {
      process.emitWarning(
        "The `punycode` module is deprecated. Please use a userland " +
          "alternative instead.",
        "DeprecationWarning",
        "DEP0040",
      );
      return punycode;
    },
    querystring,
    readline,
    "readline/promises": readlinePromises,
    repl,
    stream,
    "stream/consumers": streamConsumers,
    "stream/promises": streamPromises,
    "stream/web": streamWeb,
    string_decoder: stringDecoder,
    sys,
    timers,
    "timers/promises": timersPromises,
    tls,
    tty,
    url,
    util,
    "util/types": utilTypes,
    v8,
    vm,
    wasi,
    worker_threads: workerThreads,
    zlib,
  };
  for (const [name, moduleExports] of ObjectEntries(nodeModules)) {
    nativeModuleExports[name] = moduleExports;
    ArrayPrototypePush(builtinModules, name);
  }
}
setupBuiltinModules();

// Map used to store CJS parsing data.
const cjsParseCache = new SafeWeakMap();

function pathDirname(filepath) {
  if (filepath == null) {
    throw new Error("Empty filepath.");
  } else if (filepath === "") {
    return ".";
  }
  return ops.op_require_path_dirname(filepath);
}

function pathResolve(...args) {
  return ops.op_require_path_resolve(args);
}

const nativeModulePolyfill = new SafeMap();

const relativeResolveCache = ObjectCreate(null);
let requireDepth = 0;
let statCache = null;
let isPreloading = false;
let mainModule = null;
let hasBrokenOnInspectBrk = false;
let hasInspectBrk = false;
// Are we running with --node-modules-dir flag?
let usesLocalNodeModulesDir = false;

function stat(filename) {
  // TODO: required only on windows
  // filename = path.toNamespacedPath(filename);
  if (statCache !== null) {
    const result = statCache.get(filename);
    if (result !== undefined) {
      return result;
    }
  }
  const result = ops.op_require_stat(filename);
  if (statCache !== null && result >= 0) {
    statCache.set(filename, result);
  }

  return result;
}

function updateChildren(parent, child, scan) {
  if (!parent) {
    return;
  }

  const children = parent.children;
  if (children && !(scan && ArrayPrototypeIncludes(children, child))) {
    ArrayPrototypePush(children, child);
  }
}

function tryFile(requestPath, _isMain) {
  const rc = stat(requestPath);
  if (rc !== 0) return;
  return toRealPath(requestPath);
}

function tryPackage(requestPath, exts, isMain, originalPath) {
  const packageJsonPath = pathResolve(
    requestPath,
    "package.json",
  );
  const pkg = ops.op_require_read_package_scope(packageJsonPath)?.main;
  if (!pkg) {
    return tryExtensions(
      pathResolve(requestPath, "index"),
      exts,
      isMain,
    );
  }

  const filename = pathResolve(requestPath, pkg);
  let actual = tryFile(filename, isMain) ||
    tryExtensions(filename, exts, isMain) ||
    tryExtensions(
      pathResolve(filename, "index"),
      exts,
      isMain,
    );
  if (actual === false) {
    actual = tryExtensions(
      pathResolve(requestPath, "index"),
      exts,
      isMain,
    );
    if (!actual) {
      // eslint-disable-next-line no-restricted-syntax
      const err = new Error(
        `Cannot find module '${filename}'. ` +
          'Please verify that the package.json has a valid "main" entry',
      );
      err.code = "MODULE_NOT_FOUND";
      err.path = pathResolve(
        requestPath,
        "package.json",
      );
      err.requestPath = originalPath;
      throw err;
    } else {
      nodeGlobalThis.process.emitWarning(
        `Invalid 'main' field in '${packageJsonPath}' of '${pkg}'. ` +
          "Please either fix that or report it to the module author",
        "DeprecationWarning",
        "DEP0128",
      );
    }
  }
  return actual;
}

const realpathCache = new SafeMap();
function toRealPath(requestPath) {
  const maybeCached = realpathCache.get(requestPath);
  if (maybeCached) {
    return maybeCached;
  }
  const rp = ops.op_require_real_path(requestPath);
  realpathCache.set(requestPath, rp);
  return rp;
}

function tryExtensions(p, exts, isMain) {
  for (let i = 0; i < exts.length; i++) {
    const filename = tryFile(p + exts[i], isMain);

    if (filename) {
      return filename;
    }
  }
  return false;
}

// Find the longest (possibly multi-dot) extension registered in
// Module._extensions
function findLongestRegisteredExtension(filename) {
  const name = ops.op_require_path_basename(filename);
  let currentExtension;
  let index;
  let startIndex = 0;
  while ((index = StringPrototypeIndexOf(name, ".", startIndex)) !== -1) {
    startIndex = index + 1;
    if (index === 0) continue; // Skip dotfiles like .gitignore
    currentExtension = StringPrototypeSlice(name, index);
    if (Module._extensions[currentExtension]) {
      return currentExtension;
    }
  }
  return ".js";
}

function getExportsForCircularRequire(module) {
  if (
    module.exports &&
    ObjectGetPrototypeOf(module.exports) === ObjectPrototype &&
    // Exclude transpiled ES6 modules / TypeScript code because those may
    // employ unusual patterns for accessing 'module.exports'. That should
    // be okay because ES6 modules have a different approach to circular
    // dependencies anyway.
    !module.exports.__esModule
  ) {
    // This is later unset once the module is done loading.
    ObjectSetPrototypeOf(
      module.exports,
      CircularRequirePrototypeWarningProxy,
    );
  }

  return module.exports;
}

function emitCircularRequireWarning(prop) {
  nodeGlobalThis.process.emitWarning(
    `Accessing non-existent property '${String(prop)}' of module exports ` +
      "inside circular dependency",
  );
}

// A Proxy that can be used as the prototype of a module.exports object and
// warns when non-existent properties are accessed.
const CircularRequirePrototypeWarningProxy = new Proxy({}, {
  get(target, prop) {
    // Allow __esModule access in any case because it is used in the output
    // of transpiled code to determine whether something comes from an
    // ES module, and is not used as a regular key of `module.exports`.
    if (prop in target || prop === "__esModule") return target[prop];
    emitCircularRequireWarning(prop);
    return undefined;
  },

  getOwnPropertyDescriptor(target, prop) {
    if (
      ObjectHasOwn(target, prop) || prop === "__esModule"
    ) {
      return ObjectGetOwnPropertyDescriptor(target, prop);
    }
    emitCircularRequireWarning(prop);
    return undefined;
  },
});

const moduleParentCache = new SafeWeakMap();
function Module(id = "", parent) {
  this.id = id;
  this.path = pathDirname(id);
  this.exports = {};
  moduleParentCache.set(this, parent);
  updateChildren(parent, this, false);
  this.filename = null;
  this.loaded = false;
  this.children = [];
}

Module.builtinModules = builtinModules;

Module._extensions = ObjectCreate(null);
Module._cache = ObjectCreate(null);
Module._pathCache = ObjectCreate(null);
let modulePaths = [];
Module.globalPaths = modulePaths;

const CHAR_FORWARD_SLASH = 47;
const TRAILING_SLASH_REGEX = /(?:^|\/)\.?\.$/;
const encodedSepRegEx = /%2F|%2C/i;

function finalizeEsmResolution(
  resolved,
  parentPath,
  pkgPath,
) {
  if (RegExpPrototypeTest(encodedSepRegEx, resolved)) {
    throw new ERR_INVALID_MODULE_SPECIFIER(
      resolved,
      'must not include encoded "/" or "\\" characters',
      parentPath,
    );
  }
  // const filename = fileURLToPath(resolved);
  const filename = resolved;
  const actual = tryFile(filename, false);
  if (actual) {
    return actual;
  }
  throw new ERR_MODULE_NOT_FOUND(
    filename,
    path.resolve(pkgPath, "package.json"),
  );
}

// This only applies to requests of a specific form:
// 1. name/.*
// 2. @scope/name/.*
const EXPORTS_PATTERN = /^((?:@[^/\\%]+\/)?[^./\\%][^/\\%]*)(\/.*)?$/;
function resolveExports(
  modulesPath,
  request,
  parentPath,
  usesLocalNodeModulesDir,
) {
  // The implementation's behavior is meant to mirror resolution in ESM.
  const [, name, expansion = ""] =
    StringPrototypeMatch(request, EXPORTS_PATTERN) || [];
  if (!name) {
    return;
  }

  return ops.op_require_resolve_exports(
    usesLocalNodeModulesDir,
    modulesPath,
    request,
    name,
    expansion,
    parentPath,
  ) ?? false;
}

Module._findPath = function (request, paths, isMain, parentPath) {
  const absoluteRequest = ops.op_require_path_is_absolute(request);
  if (absoluteRequest) {
    paths = [""];
  } else if (!paths || paths.length === 0) {
    return false;
  }

  const cacheKey = request + "\x00" + ArrayPrototypeJoin(paths, "\x00");
  const entry = Module._pathCache[cacheKey];
  if (entry) {
    return entry;
  }

  let exts;
  let trailingSlash = request.length > 0 &&
    StringPrototypeCharCodeAt(request, request.length - 1) ===
      CHAR_FORWARD_SLASH;
  if (!trailingSlash) {
    trailingSlash = RegExpPrototypeTest(TRAILING_SLASH_REGEX, request);
  }

  // For each path
  for (let i = 0; i < paths.length; i++) {
    // Don't search further if path doesn't exist
    const curPath = paths[i];
    if (curPath && stat(curPath) < 1) continue;

    if (!absoluteRequest) {
      const exportsResolved = resolveExports(
        curPath,
        request,
        parentPath,
        usesLocalNodeModulesDir,
      );
      if (exportsResolved) {
        return exportsResolved;
      }
    }

    let basePath;

    if (usesLocalNodeModulesDir) {
      basePath = pathResolve(curPath, request);
    } else {
      const isDenoDirPackage = ops.op_require_is_deno_dir_package(
        curPath,
      );
      const isRelative = ops.op_require_is_request_relative(
        request,
      );
      basePath = (isDenoDirPackage && !isRelative)
        ? pathResolve(curPath, packageSpecifierSubPath(request))
        : pathResolve(curPath, request);
    }
    let filename;

    const rc = stat(basePath);
    if (!trailingSlash) {
      if (rc === 0) { // File.
        filename = toRealPath(basePath);
      }

      if (!filename) {
        // Try it with each of the extensions
        if (exts === undefined) {
          exts = ObjectKeys(Module._extensions);
        }
        filename = tryExtensions(basePath, exts, isMain);
      }
    }

    if (!filename && rc === 1) { // Directory.
      // try it with each of the extensions at "index"
      if (exts === undefined) {
        exts = ObjectKeys(Module._extensions);
      }
      filename = tryPackage(basePath, exts, isMain, request);
    }

    if (filename) {
      Module._pathCache[cacheKey] = filename;
      return filename;
    }
  }

  return false;
};

Module._nodeModulePaths = function (fromPath) {
  return ops.op_require_node_module_paths(fromPath);
};

Module._resolveLookupPaths = function (request, parent) {
  const paths = [];

  if (ops.op_require_is_request_relative(request)) {
    ArrayPrototypePush(
      paths,
      parent?.filename ? ops.op_require_path_dirname(parent.filename) : ".",
    );
    return paths;
  }

  if (
    !usesLocalNodeModulesDir && parent?.filename && parent.filename.length > 0
  ) {
    const denoDirPath = ops.op_require_resolve_deno_dir(
      request,
      parent.filename,
    );
    if (denoDirPath) {
      ArrayPrototypePush(paths, denoDirPath);
    }
  }
  const lookupPathsResult = ops.op_require_resolve_lookup_paths(
    request,
    parent?.paths,
    parent?.filename ?? "",
  );
  if (lookupPathsResult) {
    ArrayPrototypePush(paths, ...new SafeArrayIterator(lookupPathsResult));
  }
  return paths;
};

Module._load = function (request, parent, isMain) {
  let relResolveCacheIdentifier;
  if (parent) {
    // Fast path for (lazy loaded) modules in the same directory. The indirect
    // caching is required to allow cache invalidation without changing the old
    // cache key names.
    relResolveCacheIdentifier = `${parent.path}\x00${request}`;
    const filename = relativeResolveCache[relResolveCacheIdentifier];
    if (filename !== undefined) {
      const cachedModule = Module._cache[filename];
      if (cachedModule !== undefined) {
        updateChildren(parent, cachedModule, true);
        if (!cachedModule.loaded) {
          return getExportsForCircularRequire(cachedModule);
        }
        return cachedModule.exports;
      }
      delete relativeResolveCache[relResolveCacheIdentifier];
    }
  }

  const filename = Module._resolveFilename(request, parent, isMain);
  if (StringPrototypeStartsWith(filename, "node:")) {
    // Slice 'node:' prefix
    const id = StringPrototypeSlice(filename, 5);

    const module = loadNativeModule(id, id);
    if (!module) {
      // TODO:
      // throw new ERR_UNKNOWN_BUILTIN_MODULE(filename);
      throw new Error("Unknown built-in module");
    }

    return module.exports;
  }

  const cachedModule = Module._cache[filename];
  if (cachedModule !== undefined) {
    updateChildren(parent, cachedModule, true);
    if (!cachedModule.loaded) {
      return getExportsForCircularRequire(cachedModule);
    }
    return cachedModule.exports;
  }

  const mod = loadNativeModule(filename, request);
  if (
    mod
  ) {
    return mod.exports;
  }
  // Don't call updateChildren(), Module constructor already does.
  const module = cachedModule || new Module(filename, parent);

  if (isMain) {
    nodeGlobalThis.process.mainModule = module;
    mainModule = module;
    module.id = ".";
  }

  Module._cache[filename] = module;
  if (parent !== undefined) {
    relativeResolveCache[relResolveCacheIdentifier] = filename;
  }

  let threw = true;
  try {
    module.load(filename);
    threw = false;
  } finally {
    if (threw) {
      delete Module._cache[filename];
      if (parent !== undefined) {
        delete relativeResolveCache[relResolveCacheIdentifier];
        const children = parent?.children;
        if (ArrayIsArray(children)) {
          const index = ArrayPrototypeIndexOf(children, module);
          if (index !== -1) {
            ArrayPrototypeSplice(children, index, 1);
          }
        }
      }
    } else if (
      module.exports &&
      ObjectGetPrototypeOf(module.exports) ===
        CircularRequirePrototypeWarningProxy
    ) {
      ObjectSetPrototypeOf(module.exports, ObjectPrototype);
    }
  }

  return module.exports;
};

Module._resolveFilename = function (
  request,
  parent,
  isMain,
  options,
) {
  if (
    StringPrototypeStartsWith(request, "node:") ||
    nativeModuleCanBeRequiredByUsers(request)
  ) {
    return request;
  }

  let paths;

  if (typeof options === "object" && options !== null) {
    if (ArrayIsArray(options.paths)) {
      const isRelative = ops.op_require_is_request_relative(
        request,
      );

      if (isRelative) {
        paths = options.paths;
      } else {
        const fakeParent = new Module("", null);
        paths = [];

        for (let i = 0; i < options.paths.length; i++) {
          const path = options.paths[i];
          fakeParent.paths = Module._nodeModulePaths(path);
          const lookupPaths = Module._resolveLookupPaths(request, fakeParent);

          for (let j = 0; j < lookupPaths.length; j++) {
            if (!ArrayPrototypeIncludes(paths, lookupPaths[j])) {
              ArrayPrototypePush(paths, lookupPaths[j]);
            }
          }
        }
      }
    } else if (options.paths === undefined) {
      paths = Module._resolveLookupPaths(request, parent);
    } else {
      // TODO:
      // throw new ERR_INVALID_ARG_VALUE("options.paths", options.paths);
      throw new Error("Invalid arg value options.paths", options.path);
    }
  } else {
    paths = Module._resolveLookupPaths(request, parent);
  }

  if (parent?.filename) {
    if (request[0] === "#") {
      const maybeResolved = ops.op_require_package_imports_resolve(
        parent.filename,
        request,
      );
      if (maybeResolved) {
        return maybeResolved;
      }
    }
  }

  // Try module self resolution first
  const parentPath = ops.op_require_try_self_parent_path(
    !!parent,
    parent?.filename,
    parent?.id,
  );
  const selfResolved = ops.op_require_try_self(parentPath, request);
  if (selfResolved) {
    const cacheKey = request + "\x00" +
      (paths.length === 1 ? paths[0] : ArrayPrototypeJoin(paths, "\x00"));
    Module._pathCache[cacheKey] = selfResolved;
    return selfResolved;
  }

  // Look up the filename first, since that's the cache key.
  const filename = Module._findPath(
    request,
    paths,
    isMain,
    parentPath,
  );
  if (filename) return filename;
  const requireStack = [];
  for (let cursor = parent; cursor; cursor = moduleParentCache.get(cursor)) {
    ArrayPrototypePush(requireStack, cursor.filename || cursor.id);
  }
  let message = `Cannot find module '${request}'`;
  if (requireStack.length > 0) {
    message = message + "\nRequire stack:\n- " +
      ArrayPrototypeJoin(requireStack, "\n- ");
  }
  // eslint-disable-next-line no-restricted-syntax
  const err = new Error(message);
  err.code = "MODULE_NOT_FOUND";
  err.requireStack = requireStack;
  throw err;
};

/**
 * Internal CommonJS API to always require modules before requiring the actual
 * one when calling `require("my-module")`. This is used by require hooks such
 * as `ts-node/register`.
 * @param {string[]} requests List of modules to preload
 */
Module._preloadModules = function (requests) {
  if (!ArrayIsArray(requests) || requests.length === 0) {
    return;
  }

  const parent = new Module("internal/preload", null);
  // All requested files must be resolved against cwd
  parent.paths = Module._nodeModulePaths(process.cwd());
  for (let i = 0; i < requests.length; i++) {
    parent.require(requests[i]);
  }
};

Module.prototype.load = function (filename) {
  if (this.loaded) {
    throw Error("Module already loaded");
  }

  // Canonicalize the path so it's not pointing to the symlinked directory
  // in `node_modules` directory of the referrer.
  this.filename = ops.op_require_real_path(filename);
  this.paths = Module._nodeModulePaths(
    pathDirname(this.filename),
  );
  const extension = findLongestRegisteredExtension(filename);
  // allow .mjs to be overriden
  if (
    StringPrototypeEndsWith(filename, ".mjs") && !Module._extensions[".mjs"]
  ) {
    // TODO: use proper error class
    throw new Error("require ESM", filename);
  }

  Module._extensions[extension](this, filename);
  this.loaded = true;

  // TODO: do caching
};

// Loads a module at the given file path. Returns that module's
// `exports` property.
Module.prototype.require = function (id) {
  if (typeof id !== "string") {
    // TODO(bartlomieju): it should use different error type
    // ("ERR_INVALID_ARG_VALUE")
    throw new TypeError("Invalid argument type");
  }

  if (id === "") {
    // TODO(bartlomieju): it should use different error type
    // ("ERR_INVALID_ARG_VALUE")
    throw new TypeError("id must be non empty");
  }
  requireDepth++;
  try {
    return Module._load(id, this, /* isMain */ false);
  } finally {
    requireDepth--;
  }
};

Module.wrapper = [
  // We provide the non-standard APIs in the CommonJS wrapper
  // to avoid exposing them in global namespace.
  "(function (exports, require, module, __filename, __dirname, globalThis) { const { Buffer, clearImmediate, clearInterval, clearTimeout, console, global, process, setImmediate, setInterval, setTimeout, performance} = globalThis; var window = undefined; (function () {",
  "\n}).call(this); })",
];
Module.wrap = function (script) {
  script = script.replace(/^#!.*?\n/, "");
  return `${Module.wrapper[0]}${script}${Module.wrapper[1]}`;
};

function enrichCJSError(error) {
  if (error instanceof SyntaxError) {
    if (
      StringPrototypeIncludes(
        error.message,
        "Cannot use import statement outside a module",
      ) ||
      StringPrototypeIncludes(error.message, "Unexpected token 'export'")
    ) {
      console.error(
        'To load an ES module, set "type": "module" in the package.json or use ' +
          "the .mjs extension.",
      );
    }
  }
}

function wrapSafe(
  filename,
  content,
  cjsModuleInstance,
) {
  const wrapper = Module.wrap(content);
  const [f, err] = core.evalContext(wrapper, `file://${filename}`);
  if (err) {
    if (nodeGlobalThis.process.mainModule === cjsModuleInstance) {
      enrichCJSError(err.thrown);
    }
    throw err.thrown;
  }
  return f;
}

Module.prototype._compile = function (content, filename) {
  const compiledWrapper = wrapSafe(filename, content, this);

  const dirname = pathDirname(filename);
  const require = makeRequireFunction(this);
  const exports = this.exports;
  const thisValue = exports;
  const module = this;
  if (requireDepth === 0) {
    statCache = new SafeMap();
  }

  if (hasInspectBrk && !hasBrokenOnInspectBrk) {
    hasBrokenOnInspectBrk = true;
    ops.op_require_break_on_next_statement();
  }

  const result = compiledWrapper.call(
    thisValue,
    exports,
    require,
    this,
    filename,
    dirname,
    nodeGlobalThis,
  );
  if (requireDepth === 0) {
    statCache = null;
  }
  return result;
};

Module._extensions[".js"] = function (module, filename) {
  const content = ops.op_require_read_file(filename);

  if (StringPrototypeEndsWith(filename, ".js")) {
    const pkg = ops.op_require_read_package_scope(filename);
    if (pkg && pkg.exists && pkg.typ == "module") {
      let message = `Trying to import ESM module: ${filename}`;

      if (module.parent) {
        message += ` from ${module.parent.filename}`;
      }

      message += ` using require()`;

      throw new Error(message);
    }
  }

  module._compile(content, filename);
};

function stripBOM(content) {
  if (StringPrototypeCharCodeAt(content, 0) === 0xfeff) {
    content = StringPrototypeSlice(content, 1);
  }
  return content;
}

// Native extension for .json
Module._extensions[".json"] = function (module, filename) {
  const content = ops.op_require_read_file(filename);

  try {
    module.exports = JSONParse(stripBOM(content));
  } catch (err) {
    err.message = filename + ": " + err.message;
    throw err;
  }
};

// Native extension for .node
Module._extensions[".node"] = function (module, filename) {
  if (filename.endsWith("fsevents.node")) {
    throw new Error("Using fsevents module is currently not supported");
  }
  module.exports = ops.op_napi_open(filename, nodeGlobalThis);
};

function createRequireFromPath(filename) {
  const proxyPath = ops.op_require_proxy_path(filename);
  const mod = new Module(proxyPath);
  mod.filename = proxyPath;
  mod.paths = Module._nodeModulePaths(mod.path);
  return makeRequireFunction(mod);
}

function makeRequireFunction(mod) {
  const require = function require(path) {
    return mod.require(path);
  };

  function resolve(request, options) {
    return Module._resolveFilename(request, mod, false, options);
  }

  require.resolve = resolve;

  function paths(request) {
    return Module._resolveLookupPaths(request, mod);
  }

  resolve.paths = paths;
  require.main = mainModule;
  // Enable support to add extra extension types.
  require.extensions = Module._extensions;
  require.cache = Module._cache;

  return require;
}

// Matches to:
// - /foo/...
// - \foo\...
// - C:/foo/...
// - C:\foo\...
const RE_START_OF_ABS_PATH = /^([/\\]|[a-zA-Z]:[/\\])/;

function isAbsolute(filenameOrUrl) {
  return RE_START_OF_ABS_PATH.test(filenameOrUrl);
}

function createRequire(filenameOrUrl) {
  let fileUrlStr;
  if (filenameOrUrl instanceof URL) {
    if (filenameOrUrl.protocol !== "file:") {
      throw new Error(
        `The argument 'filename' must be a file URL object, file URL string, or absolute path string. Received ${filenameOrUrl}`,
      );
    }
    fileUrlStr = filenameOrUrl.toString();
  } else if (typeof filenameOrUrl === "string") {
    if (!filenameOrUrl.startsWith("file:") && !isAbsolute(filenameOrUrl)) {
      throw new Error(
        `The argument 'filename' must be a file URL object, file URL string, or absolute path string. Received ${filenameOrUrl}`,
      );
    }
    fileUrlStr = filenameOrUrl;
  } else {
    throw new Error(
      `The argument 'filename' must be a file URL object, file URL string, or absolute path string. Received ${filenameOrUrl}`,
    );
  }
  const filename = ops.op_require_as_file_path(fileUrlStr);
  return createRequireFromPath(filename);
}

Module.createRequire = createRequire;

Module._initPaths = function () {
  const paths = ops.op_require_init_paths();
  modulePaths = paths;
  Module.globalPaths = ArrayPrototypeSlice(modulePaths);
};

Module.syncBuiltinESMExports = function syncBuiltinESMExports() {
  throw new Error("not implemented");
};

// Mostly used by tools like ts-node.
Module.runMain = function () {
  Module._load(process.argv[1], null, true);
};

Module.Module = Module;

nativeModuleExports.module = Module;

function loadNativeModule(_id, request) {
  if (nativeModulePolyfill.has(request)) {
    return nativeModulePolyfill.get(request);
  }
  const modExports = nativeModuleExports[request];
  if (modExports) {
    const nodeMod = new Module(request);
    nodeMod.exports = modExports;
    nodeMod.loaded = true;
    nativeModulePolyfill.set(request, nodeMod);
    return nodeMod;
  }
  return undefined;
}

function nativeModuleCanBeRequiredByUsers(request) {
  return !!nativeModuleExports[request];
}

function readPackageScope() {
  throw new Error("not implemented");
}

/** @param specifier {string} */
function packageSpecifierSubPath(specifier) {
  let parts = StringPrototypeSplit(specifier, "/");
  if (StringPrototypeStartsWith(parts[0], "@")) {
    parts = ArrayPrototypeSlice(parts, 2);
  } else {
    parts = ArrayPrototypeSlice(parts, 1);
  }
  return ArrayPrototypeJoin(parts, "/");
}

// This is a temporary namespace, that will be removed when initializing
// in `02_init.js`.
internals.requireImpl = {
  setUsesLocalNodeModulesDir() {
    usesLocalNodeModulesDir = true;
  },
  setInspectBrk() {
    hasInspectBrk = true;
  },
  Module,
  nativeModuleExports,
};

export { builtinModules, createRequire, Module };
export const _cache = Module._cache;
export const _extensions = Module._extensions;
export const _findPath = Module._findPath;
export const _initPaths = Module._initPaths;
export const _load = Module._load;
export const _nodeModulePaths = Module._nodeModulePaths;
export const _pathCache = Module._pathCache;
export const _preloadModules = Module._preloadModules;
export const _resolveFilename = Module._resolveFilename;
export const _resolveLookupPaths = Module._resolveLookupPaths;
export const globalPaths = Module.globalPaths;
export const wrap = Module.wrap;

export default Module;
