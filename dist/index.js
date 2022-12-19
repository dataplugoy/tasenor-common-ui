var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/node-stdlib-browser/helpers/esbuild/shim.js
var import_buffer, import_process, _globalThis, _global;
var init_shim = __esm({
  "node_modules/node-stdlib-browser/helpers/esbuild/shim.js"() {
    import_buffer = require("buffer");
    import_process = __toESM(require("process"));
    _globalThis = function(Object2) {
      function get() {
        var _global3 = this || self;
        delete Object2.prototype.__magic__;
        return _global3;
      }
      if (typeof globalThis === "object") {
        return globalThis;
      }
      if (this) {
        return get();
      } else {
        Object2.defineProperty(Object2.prototype, "__magic__", {
          configurable: true,
          get
        });
        var _global2 = __magic__;
        return _global2;
      }
    }(Object);
    _global = _globalThis;
  }
});

// node_modules/clone/clone.js
var require_clone = __commonJS({
  "node_modules/clone/clone.js"(exports, module2) {
    init_shim();
    var clone2 = function() {
      "use strict";
      function _instanceof(obj, type) {
        return type != null && obj instanceof type;
      }
      var nativeMap;
      try {
        nativeMap = Map;
      } catch (_) {
        nativeMap = function() {
        };
      }
      var nativeSet;
      try {
        nativeSet = Set;
      } catch (_) {
        nativeSet = function() {
        };
      }
      var nativePromise;
      try {
        nativePromise = Promise;
      } catch (_) {
        nativePromise = function() {
        };
      }
      function clone3(parent, circular, depth, prototype, includeNonEnumerable) {
        if (typeof circular === "object") {
          depth = circular.depth;
          prototype = circular.prototype;
          includeNonEnumerable = circular.includeNonEnumerable;
          circular = circular.circular;
        }
        var allParents = [];
        var allChildren = [];
        var useBuffer = typeof import_buffer.Buffer != "undefined";
        if (typeof circular == "undefined")
          circular = true;
        if (typeof depth == "undefined")
          depth = Infinity;
        function _clone(parent2, depth2) {
          if (parent2 === null)
            return null;
          if (depth2 === 0)
            return parent2;
          var child;
          var proto;
          if (typeof parent2 != "object") {
            return parent2;
          }
          if (_instanceof(parent2, nativeMap)) {
            child = new nativeMap();
          } else if (_instanceof(parent2, nativeSet)) {
            child = new nativeSet();
          } else if (_instanceof(parent2, nativePromise)) {
            child = new nativePromise(function(resolve, reject) {
              parent2.then(function(value) {
                resolve(_clone(value, depth2 - 1));
              }, function(err) {
                reject(_clone(err, depth2 - 1));
              });
            });
          } else if (clone3.__isArray(parent2)) {
            child = [];
          } else if (clone3.__isRegExp(parent2)) {
            child = new RegExp(parent2.source, __getRegExpFlags(parent2));
            if (parent2.lastIndex)
              child.lastIndex = parent2.lastIndex;
          } else if (clone3.__isDate(parent2)) {
            child = new Date(parent2.getTime());
          } else if (useBuffer && import_buffer.Buffer.isBuffer(parent2)) {
            if (import_buffer.Buffer.allocUnsafe) {
              child = import_buffer.Buffer.allocUnsafe(parent2.length);
            } else {
              child = new import_buffer.Buffer(parent2.length);
            }
            parent2.copy(child);
            return child;
          } else if (_instanceof(parent2, Error)) {
            child = Object.create(parent2);
          } else {
            if (typeof prototype == "undefined") {
              proto = Object.getPrototypeOf(parent2);
              child = Object.create(proto);
            } else {
              child = Object.create(prototype);
              proto = prototype;
            }
          }
          if (circular) {
            var index = allParents.indexOf(parent2);
            if (index != -1) {
              return allChildren[index];
            }
            allParents.push(parent2);
            allChildren.push(child);
          }
          if (_instanceof(parent2, nativeMap)) {
            parent2.forEach(function(value, key) {
              var keyChild = _clone(key, depth2 - 1);
              var valueChild = _clone(value, depth2 - 1);
              child.set(keyChild, valueChild);
            });
          }
          if (_instanceof(parent2, nativeSet)) {
            parent2.forEach(function(value) {
              var entryChild = _clone(value, depth2 - 1);
              child.add(entryChild);
            });
          }
          for (var i in parent2) {
            var attrs;
            if (proto) {
              attrs = Object.getOwnPropertyDescriptor(proto, i);
            }
            if (attrs && attrs.set == null) {
              continue;
            }
            child[i] = _clone(parent2[i], depth2 - 1);
          }
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(parent2);
            for (var i = 0; i < symbols.length; i++) {
              var symbol = symbols[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
              if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                continue;
              }
              child[symbol] = _clone(parent2[symbol], depth2 - 1);
              if (!descriptor.enumerable) {
                Object.defineProperty(child, symbol, {
                  enumerable: false
                });
              }
            }
          }
          if (includeNonEnumerable) {
            var allPropertyNames = Object.getOwnPropertyNames(parent2);
            for (var i = 0; i < allPropertyNames.length; i++) {
              var propertyName = allPropertyNames[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
              if (descriptor && descriptor.enumerable) {
                continue;
              }
              child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
              Object.defineProperty(child, propertyName, {
                enumerable: false
              });
            }
          }
          return child;
        }
        return _clone(parent, depth);
      }
      clone3.clonePrototype = function clonePrototype(parent) {
        if (parent === null)
          return null;
        var c = function() {
        };
        c.prototype = parent;
        return new c();
      };
      function __objToStr(o) {
        return Object.prototype.toString.call(o);
      }
      clone3.__objToStr = __objToStr;
      function __isDate(o) {
        return typeof o === "object" && __objToStr(o) === "[object Date]";
      }
      clone3.__isDate = __isDate;
      function __isArray(o) {
        return typeof o === "object" && __objToStr(o) === "[object Array]";
      }
      clone3.__isArray = __isArray;
      function __isRegExp(o) {
        return typeof o === "object" && __objToStr(o) === "[object RegExp]";
      }
      clone3.__isRegExp = __isRegExp;
      function __getRegExpFlags(re) {
        var flags = "";
        if (re.global)
          flags += "g";
        if (re.ignoreCase)
          flags += "i";
        if (re.multiline)
          flags += "m";
        return flags;
      }
      clone3.__getRegExpFlags = __getRegExpFlags;
      return clone3;
    }();
    if (typeof module2 === "object" && module2.exports) {
      module2.exports = clone2;
    }
  }
});

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module2) {
    "use strict";
    init_shim();
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return Array.isArray(val);
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return toString.call(val) === "[object FormData]";
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return toString.call(val) === "[object URLSearchParams]";
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module2.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    function encode2(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module2.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode2(key) + "=" + encode2(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module2.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    module2.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/axios/lib/core/enhanceError.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      };
      return error;
    };
  }
});

// node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/axios/lib/core/createError.js"(exports, module2) {
    "use strict";
    init_shim();
    var enhanceError = require_enhanceError();
    module2.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module2) {
    "use strict";
    init_shim();
    var createError = require_createError();
    module2.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError(
          "Request failed with status code " + response.status,
          response.config,
          null,
          response.request,
          response
        ));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module2) {
    "use strict";
    init_shim();
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module2.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module2.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/axios/lib/cancel/Cancel.js"(exports, module2) {
    "use strict";
    init_shim();
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module2.exports = Cancel;
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    module2.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || defaults.transitional;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(
            timeoutErrorMessage,
            config,
            transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
            request
          ));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module2) {
    init_shim();
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module2) {
    init_shim();
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module2) {
    init_shim();
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof import_process.default !== "undefined" && "env" in import_process.default) {
        r = import_process.default.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = (flag, argv = import_process.default.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    init_shim();
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = import_process.default;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (import_process.default.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module2) {
    init_shim();
    var tty = require("tty");
    var util = require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(import_process.default.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = import_process.default.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(import_process.default.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return import_process.default.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        import_process.default.env.DEBUG = namespaces;
      } else {
        delete import_process.default.env.DEBUG;
      }
    }
    function load() {
      return import_process.default.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module2) {
    init_shim();
    if (typeof import_process.default === "undefined" || import_process.default.type === "renderer" || import_process.default.browser === true || import_process.default.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "node_modules/follow-redirects/debug.js"(exports, module2) {
    init_shim();
    var debug;
    module2.exports = function() {
      if (!debug) {
        try {
          debug = require_src()("follow-redirects");
        } catch (error) {
        }
        if (typeof debug !== "function") {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/follow-redirects/index.js"(exports, module2) {
    init_shim();
    var url = require("url");
    var URL = url.URL;
    var http = require("http");
    var https = require("https");
    var Writable = require("stream").Writable;
    var assert = require("assert");
    var debug = require_debug();
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = /* @__PURE__ */ Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var InvalidUrlError = createErrorType(
      "ERR_INVALID_URL",
      "Invalid URL",
      TypeError
    );
    var RedirectionError = createErrorType(
      "ERR_FR_REDIRECTION_FAILURE",
      "Redirected request failed"
    );
    var TooManyRedirectsError = createErrorType(
      "ERR_FR_TOO_MANY_REDIRECTS",
      "Maximum number of redirects exceeded"
    );
    var MaxBodyLengthExceededError = createErrorType(
      "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
      "Request body larger than maxBodyLength limit"
    );
    var WriteAfterEndError = createErrorType(
      "ERR_STREAM_WRITE_AFTER_END",
      "write after end"
    );
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self2 = this;
      this._onNativeResponse = function(response) {
        self2._processResponse(response);
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      abortRequest(this._currentRequest);
      this.emit("abort");
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!isString(data) && !isBuffer(data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (isFunction(data)) {
        callback = data;
        data = encoding = null;
      } else if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self2 = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self2._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self2 = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
        }
        self2._timeout = setTimeout(function() {
          self2.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
          self2._timeout = null;
        }
        self2.removeListener("abort", clearTimer);
        self2.removeListener("error", clearTimer);
        self2.removeListener("response", clearTimer);
        if (callback) {
          self2.removeListener("timeout", callback);
        }
        if (!self2.socket) {
          self2._currentRequest.removeListener("socket", startTimer);
        }
      }
      if (callback) {
        this.on("timeout", callback);
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once("socket", startTimer);
      }
      this.on("socket", destroyOnTimeout);
      this.on("abort", clearTimer);
      this.on("error", clearTimer);
      this.on("response", clearTimer);
      return this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit("error", new TypeError("Unsupported protocol " + protocol));
        return;
      }
      if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      request._redirectable = this;
      for (var event of events) {
        request.on(event, eventHandlers[event]);
      }
      this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : this._options.path;
      if (this._isRedirect) {
        var i = 0;
        var self2 = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          if (request === self2._currentRequest) {
            if (error) {
              self2.emit("error", error);
            } else if (i < buffers.length) {
              var buffer = buffers[i++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self2._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
        return;
      }
      abortRequest(this._currentRequest);
      response.destroy();
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new TooManyRedirectsError());
        return;
      }
      var requestHeaders;
      var beforeRedirect = this._options.beforeRedirect;
      if (beforeRedirect) {
        requestHeaders = Object.assign({
          Host: response.req.getHeader("host")
        }, this._options.headers);
      }
      var method = this._options.method;
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
      var currentUrlParts = url.parse(this._currentUrl);
      var currentHost = currentHostHeader || currentUrlParts.host;
      var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, { host: currentHost }));
      var redirectUrl;
      try {
        redirectUrl = url.resolve(currentUrl, location);
      } catch (cause) {
        this.emit("error", new RedirectionError({ cause }));
        return;
      }
      debug("redirecting to", redirectUrl);
      this._isRedirect = true;
      var redirectUrlParts = url.parse(redirectUrl);
      Object.assign(this._options, redirectUrlParts);
      if (redirectUrlParts.protocol !== currentUrlParts.protocol && redirectUrlParts.protocol !== "https:" || redirectUrlParts.host !== currentHost && !isSubdomain(redirectUrlParts.host, currentHost)) {
        removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
      }
      if (isFunction(beforeRedirect)) {
        var responseDetails = {
          headers: response.headers,
          statusCode
        };
        var requestDetails = {
          url: currentUrl,
          method,
          headers: requestHeaders
        };
        try {
          beforeRedirect(this._options, responseDetails, requestDetails);
        } catch (err) {
          this.emit("error", err);
          return;
        }
        this._sanitizeOptions(this._options);
      }
      try {
        this._performRequest();
      } catch (cause) {
        this.emit("error", new RedirectionError({ cause }));
      }
    };
    function wrap(protocols) {
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (isString(input)) {
            var parsed;
            try {
              parsed = urlToOptions(new URL(input));
            } catch (err) {
              parsed = url.parse(input);
            }
            if (!isString(parsed.protocol)) {
              throw new InvalidUrlError({ input });
            }
            input = parsed;
          } else if (URL && input instanceof URL) {
            input = urlToOptions(input);
          } else {
            callback = options;
            options = input;
            input = { protocol };
          }
          if (isFunction(options)) {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          if (!isString(options.host) && !isString(options.hostname)) {
            options.hostname = "::1";
          }
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
          return new RedirectableRequest(options, callback);
        }
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true }
        });
      });
      return exports2;
    }
    function noop() {
    }
    function urlToOptions(urlObject) {
      var options = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href
      };
      if (urlObject.port !== "") {
        options.port = Number(urlObject.port);
      }
      return options;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
    }
    function createErrorType(code, message, baseClass) {
      function CustomError(properties) {
        Error.captureStackTrace(this, this.constructor);
        Object.assign(this, properties || {});
        this.code = code;
        this.message = this.cause ? message + ": " + this.cause.message : message;
      }
      CustomError.prototype = new (baseClass || Error)();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = "Error [" + code + "]";
      return CustomError;
    }
    function abortRequest(request) {
      for (var event of events) {
        request.removeListener(event, eventHandlers[event]);
      }
      request.on("error", noop);
      request.abort();
    }
    function isSubdomain(subdomain, domain) {
      assert(isString(subdomain) && isString(domain));
      var dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }
    function isString(value) {
      return typeof value === "string" || value instanceof String;
    }
    function isFunction(value) {
      return typeof value === "function";
    }
    function isBuffer(value) {
      return typeof value === "object" && "length" in value;
    }
    module2.exports = wrap({ http, https });
    module2.exports.wrap = wrap;
  }
});

// node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/axios/lib/env/data.js"(exports, module2) {
    init_shim();
    module2.exports = {
      "version": "0.26.0"
    };
  }
});

// node_modules/axios/lib/adapters/http.js
var require_http = __commonJS({
  "node_modules/axios/lib/adapters/http.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var settle = require_settle();
    var buildFullPath = require_buildFullPath();
    var buildURL = require_buildURL();
    var http = require("http");
    var https = require("https");
    var httpFollow = require_follow_redirects().http;
    var httpsFollow = require_follow_redirects().https;
    var url = require("url");
    var zlib = require("zlib");
    var VERSION = require_data().version;
    var createError = require_createError();
    var enhanceError = require_enhanceError();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    var isHttps = /https:?/;
    function setProxy(options, proxy, location) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.port = proxy.port;
      options.path = location;
      if (proxy.auth) {
        var base64 = import_buffer.Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options.headers["Proxy-Authorization"] = "Basic " + base64;
      }
      options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
      };
    }
    module2.exports = function httpAdapter(config) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        var resolve = function resolve2(value) {
          done();
          resolvePromise(value);
        };
        var rejected = false;
        var reject = function reject2(value) {
          done();
          rejected = true;
          rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        var headerNames = {};
        Object.keys(headers).forEach(function storeLowerName(name) {
          headerNames[name.toLowerCase()] = name;
        });
        if ("user-agent" in headerNames) {
          if (!headers[headerNames["user-agent"]]) {
            delete headers[headerNames["user-agent"]];
          }
        } else {
          headers["User-Agent"] = "axios/" + VERSION;
        }
        if (data && !utils.isStream(data)) {
          if (import_buffer.Buffer.isBuffer(data)) {
          } else if (utils.isArrayBuffer(data)) {
            data = import_buffer.Buffer.from(new Uint8Array(data));
          } else if (utils.isString(data)) {
            data = import_buffer.Buffer.from(data, "utf-8");
          } else {
            return reject(createError(
              "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
              config
            ));
          }
          if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
            return reject(createError("Request body larger than maxBodyLength limit", config));
          }
          if (!headerNames["content-length"]) {
            headers["Content-Length"] = data.length;
          }
        }
        var auth = void 0;
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password || "";
          auth = username + ":" + password;
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || "http:";
        if (!auth && parsed.auth) {
          var urlAuth = parsed.auth.split(":");
          var urlUsername = urlAuth[0] || "";
          var urlPassword = urlAuth[1] || "";
          auth = urlUsername + ":" + urlPassword;
        }
        if (auth && headerNames.authorization) {
          delete headers[headerNames.authorization];
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        try {
          buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, "");
        } catch (err) {
          var customErr = new Error(err.message);
          customErr.config = config;
          customErr.url = config.url;
          customErr.exists = true;
          reject(customErr);
        }
        var options = {
          path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
          method: config.method.toUpperCase(),
          headers,
          agent,
          agents: { http: config.httpAgent, https: config.httpsAgent },
          auth
        };
        if (config.socketPath) {
          options.socketPath = config.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
          var proxyEnv = protocol.slice(0, -1) + "_proxy";
          var proxyUrl = import_process.default.env[proxyEnv] || import_process.default.env[proxyEnv.toUpperCase()];
          if (proxyUrl) {
            var parsedProxyUrl = url.parse(proxyUrl);
            var noProxyEnv = import_process.default.env.no_proxy || import_process.default.env.NO_PROXY;
            var shouldProxy = true;
            if (noProxyEnv) {
              var noProxy = noProxyEnv.split(",").map(function trim(s) {
                return s.trim();
              });
              shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                if (!proxyElement) {
                  return false;
                }
                if (proxyElement === "*") {
                  return true;
                }
                if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                  return true;
                }
                return parsed.hostname === proxyElement;
              });
            }
            if (shouldProxy) {
              proxy = {
                host: parsedProxyUrl.hostname,
                port: parsedProxyUrl.port,
                protocol: parsedProxyUrl.protocol
              };
              if (parsedProxyUrl.auth) {
                var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                proxy.auth = {
                  username: proxyUrlAuth[0],
                  password: proxyUrlAuth[1]
                };
              }
            }
          }
        }
        if (proxy) {
          options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
          setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsProxy ? https : http;
        } else {
          if (config.maxRedirects) {
            options.maxRedirects = config.maxRedirects;
          }
          transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
          options.maxBodyLength = config.maxBodyLength;
        }
        if (config.insecureHTTPParser) {
          options.insecureHTTPParser = config.insecureHTTPParser;
        }
        var req = transport.request(options, function handleResponse(res) {
          if (req.aborted)
            return;
          var stream = res;
          var lastRequest = res.req || req;
          if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
            switch (res.headers["content-encoding"]) {
              case "gzip":
              case "compress":
              case "deflate":
                stream = stream.pipe(zlib.createUnzip());
                delete res.headers["content-encoding"];
                break;
            }
          }
          var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config,
            request: lastRequest
          };
          if (config.responseType === "stream") {
            response.data = stream;
            settle(resolve, reject, response);
          } else {
            var responseBuffer = [];
            var totalResponseBytes = 0;
            stream.on("data", function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              totalResponseBytes += chunk.length;
              if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                rejected = true;
                stream.destroy();
                reject(createError(
                  "maxContentLength size of " + config.maxContentLength + " exceeded",
                  config,
                  null,
                  lastRequest
                ));
              }
            });
            stream.on("aborted", function handlerStreamAborted() {
              if (rejected) {
                return;
              }
              stream.destroy();
              reject(createError("error request aborted", config, "ERR_REQUEST_ABORTED", lastRequest));
            });
            stream.on("error", function handleStreamError(err) {
              if (req.aborted)
                return;
              reject(enhanceError(err, config, null, lastRequest));
            });
            stream.on("end", function handleStreamEnd() {
              try {
                var responseData = responseBuffer.length === 1 ? responseBuffer[0] : import_buffer.Buffer.concat(responseBuffer);
                if (config.responseType !== "arraybuffer") {
                  responseData = responseData.toString(config.responseEncoding);
                  if (!config.responseEncoding || config.responseEncoding === "utf8") {
                    responseData = utils.stripBOM(responseData);
                  }
                }
                response.data = responseData;
              } catch (err) {
                reject(enhanceError(err, config, err.code, response.request, response));
              }
              settle(resolve, reject, response);
            });
          }
        });
        req.on("error", function handleRequestError(err) {
          if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS")
            return;
          reject(enhanceError(err, config, null, req));
        });
        req.on("socket", function handleRequestSocket(socket) {
          socket.setKeepAlive(true, 1e3 * 60);
        });
        if (config.timeout) {
          var timeout = parseInt(config.timeout, 10);
          if (isNaN(timeout)) {
            reject(createError(
              "error trying to parse `config.timeout` to int",
              config,
              "ERR_PARSE_TIMEOUT",
              req
            ));
            return;
          }
          req.setTimeout(timeout, function handleRequestTimeout() {
            req.abort();
            var timeoutErrorMessage = "";
            if (config.timeoutErrorMessage) {
              timeoutErrorMessage = config.timeoutErrorMessage;
            } else {
              timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
            }
            var transitional = config.transitional || defaults.transitional;
            reject(createError(
              timeoutErrorMessage,
              config,
              transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
              req
            ));
          });
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (req.aborted)
              return;
            req.abort();
            reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (utils.isStream(data)) {
          data.on("error", function handleStreamError(err) {
            reject(enhanceError(err, config, null, req));
          }).pipe(req);
        } else {
          req.end(data);
        }
      });
    };
  }
});

// node_modules/axios/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var enhanceError = require_enhanceError();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof import_process.default !== "undefined" && Object.prototype.toString.call(import_process.default) === "[object process]") {
        adapter = require_http();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw enhanceError(e, this, "E_JSON_PARSE");
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module2.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var defaults = require_defaults();
    module2.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new Cancel("canceled");
      }
    }
    module2.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
      );
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );
      utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(
          config,
          response.data,
          response.headers,
          config.transformResponse
        );
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    module2.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module2) {
    "use strict";
    init_shim();
    var VERSION = require_data().version;
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, " has been removed" + (version ? " in " + version : "")));
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version + " and will be removed in the near future"
            )
          );
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new TypeError("options must be an object");
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError("option " + opt + " must be " + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error("Unknown option " + opt);
        }
      }
    }
    module2.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module2.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module2) {
    "use strict";
    init_shim();
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module2.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    module2.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios4 = createInstance(defaults);
    axios4.Axios = Axios;
    axios4.Cancel = require_Cancel();
    axios4.CancelToken = require_CancelToken();
    axios4.isCancel = require_isCancel();
    axios4.VERSION = require_data().version;
    axios4.all = function all(promises) {
      return Promise.all(promises);
    };
    axios4.spread = require_spread();
    axios4.isAxiosError = require_isAxiosError();
    module2.exports = axios4;
    module2.exports.default = axios4;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module2) {
    init_shim();
    module2.exports = require_axios();
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ActionEngine: () => ActionEngine,
  BooleanRenderer: () => BooleanRenderer,
  BoxRenderer: () => BoxRenderer,
  ButtonRenderer: () => ButtonRenderer,
  CaseRenderer: () => CaseRenderer,
  ConfigChangeView: () => ConfigChangeView,
  ConfigJSONView: () => ConfigJSONView,
  ConfigView: () => ConfigView,
  CurrencyPlugin: () => CurrencyPlugin,
  DefaultErrorView: () => DefaultErrorView,
  DefaultResultView: () => DefaultResultView,
  DefaultStateView: () => DefaultStateView,
  DefaultStepView: () => DefaultStepView,
  DefaultSuccessView: () => DefaultSuccessView,
  DefaultSummaryView: () => DefaultSummaryView,
  Dialog: () => Dialog,
  FileUploader: () => FileUploader,
  FlatRenderer: () => FlatRenderer,
  HtmlRenderer: () => HtmlRenderer,
  IGNORE_FIELDS: () => IGNORE_FIELDS,
  IconButton: () => IconButton,
  IconSpacer: () => IconSpacer,
  ImportFile: () => ImportFile,
  ImportLine: () => ImportLine,
  ImportStateView: () => ImportStateView,
  LanguagePlugin: () => LanguagePlugin,
  Localize: () => Localize,
  MenuState: () => MenuState,
  MessageRenderer: () => MessageRenderer,
  Money: () => Money,
  Note: () => Note,
  NumberRenderer: () => NumberRenderer,
  ProcessList: () => ProcessList,
  ProcessStatusIcon: () => ProcessStatusIcon,
  ProcessView: () => ProcessView,
  QuestionMark: () => QuestionMark,
  QuestionMarkData: () => QuestionMarkData,
  QuestionMarkInline: () => QuestionMarkInline,
  RISP: () => RISP,
  RISPProvider: () => RISPProvider,
  RadioRenderer: () => RadioRenderer,
  RenderingEngine: () => RenderingEngine,
  RuleColumnEdit: () => RuleColumnEdit,
  RuleEditor: () => RuleEditor,
  RuleLineEdit: () => RuleLineEdit,
  SchemePlugin: () => SchemePlugin,
  StepList: () => StepList,
  SubPanel: () => SubPanel,
  TabNav: () => TabNav,
  TabPanel: () => TabPanel,
  TagChip: () => TagChip,
  TagGroup: () => TagGroup,
  TextFileLineRenderer: () => TextFileLineRenderer,
  TextRenderer: () => TextRenderer,
  Title: () => Title,
  ToolPlugin: () => ToolPlugin,
  UiPlugin: () => UiPlugin,
  VisualResultRule: () => VisualResultRule,
  VisualRule: () => VisualRule,
  VisualRuleLine: () => VisualRuleLine,
  YesNoRenderer: () => YesNoRenderer,
  debugActionHandler: () => debugActionHandler,
  downloadUrl: () => downloadUrl,
  isMainMenu: () => isMainMenu,
  patchActionHandler: () => patchActionHandler,
  postActionHandler: () => postActionHandler,
  useAxios: () => useAxios,
  useNavigation: () => useNavigation
});
module.exports = __toCommonJS(src_exports);
init_shim();

// src/bookkeeper/index.ts
init_shim();

// src/bookkeeper/Dialog.tsx
init_shim();
var import_react = __toESM(require("react"));
var import_material = require("@mui/material");
var import_tasenor_common = require("@dataplug/tasenor-common");
var import_react_i18next = require("react-i18next");
var Dialog = (props) => {
  const cursor = (0, import_tasenor_common.haveCursor)();
  const { isVisible, okOnly, fullScreen, isValid, title, onClose, onConfirm, children, wider, noActions } = props;
  const className = props.className || "Dialog";
  const keyEscape = () => {
    if (!isVisible) {
      return;
    }
    onClose();
    cursor.removeModal(className);
    return { preventDefault: true };
  };
  const keyEnter = () => {
    if (!isVisible) {
      return;
    }
    if (isValid && !isValid()) {
      return;
    }
    onClose();
    onConfirm && onConfirm();
    cursor.removeModal(className);
    return { preventDefault: true };
  };
  (0, import_react.useEffect)(() => {
    if (isVisible) {
      cursor.addModal(className, {
        keyEscape: () => keyEscape(),
        keyEnter: () => keyEnter()
      });
    }
  }, [isVisible]);
  const muiProps = {
    className,
    fullWidth: wider || fullScreen,
    maxWidth: void 0
  };
  const paperProps = {};
  if (wider) {
    muiProps.maxWidth = "sm";
  }
  if (fullScreen) {
    muiProps.maxWidth = "xl";
    paperProps.sx = { height: "90vh" };
  }
  return /* @__PURE__ */ import_react.default.createElement(import_material.Dialog, { ...muiProps, PaperProps: paperProps, open: isVisible, onClose: () => {
    cursor.removeModal(className);
    onClose();
  } }, /* @__PURE__ */ import_react.default.createElement(import_material.DialogTitle, null, title), /* @__PURE__ */ import_react.default.createElement(import_material.DialogContent, { dividers: true }, children), noActions ? "" : /* @__PURE__ */ import_react.default.createElement(import_material.DialogActions, null, !okOnly && /* @__PURE__ */ import_react.default.createElement(import_material.Button, { id: "Cancel", variant: "outlined", onClick: () => keyEscape() }, /* @__PURE__ */ import_react.default.createElement(import_react_i18next.Trans, null, "Cancel")), !okOnly && /* @__PURE__ */ import_react.default.createElement(import_material.Button, { id: "OK", variant: "outlined", onClick: () => keyEnter(), disabled: isValid && !isValid(), color: "primary" }, /* @__PURE__ */ import_react.default.createElement(import_react_i18next.Trans, null, "Confirm")), okOnly && /* @__PURE__ */ import_react.default.createElement(import_material.Button, { id: "OK", variant: "outlined", color: "primary", onClick: () => keyEscape() }, /* @__PURE__ */ import_react.default.createElement(import_react_i18next.Trans, null, "Close"))));
};

// src/bookkeeper/Hooks.tsx
init_shim();
var import_react_router_dom = require("react-router-dom");
var import_tasenor_common2 = require("@dataplug/tasenor-common");
var mainMenuSet = /* @__PURE__ */ new Set(["", "admin", "dashboard", "txs", "account", "report", "tools", "data", "settings", "classop"]);
var isMainMenu = (name) => typeof name === "string" && mainMenuSet.has(name);
var MenuState = class {
  constructor(loc, history) {
    this.db = "";
    this.main = "";
    this.periodId = null;
    this.accountId = null;
    this.side = "";
    this.attrs = {};
    this.indirectPath = false;
    this.history = history;
    if (loc) {
      if (loc.search.startsWith("?path=")) {
        this.indirectPath = true;
        const search = loc.search.substr(1).split("&").map((s) => s.split("=")).reduce((prev, cur) => ({ [cur[0]]: cur[1], ...prev }), {});
        const [, db, main, periodId, accountId, side] = search.path.split("/");
        this.parse({ db, main, periodId, accountId, side, ...search });
        delete this.attrs.path;
        delete this.attrs.indirect;
      } else {
        const [, db, main, periodId, accountId, side] = loc.pathname.split("/");
        const search = loc.search.length ? loc.search.substr(1).split("&").map((s) => s.split("=")).reduce((prev, cur) => ({ [cur[0]]: cur[1], ...prev }), {}) : {};
        this.parse({ db, main, periodId, accountId, side, ...search });
      }
    }
  }
  parse(params) {
    const { db, main, periodId, accountId, side } = params;
    Object.keys(params).forEach((key) => {
      switch (key) {
        case "db":
          this.db = (0, import_tasenor_common2.isDatabaseName)(db) ? db : "";
          break;
        case "main":
          this.main = isMainMenu(main) ? main : "";
          break;
        case "periodId":
          this.periodId = periodId === "" || periodId === null ? null : parseInt(periodId);
          break;
        case "accountId":
          this.accountId = accountId === "" || accountId === null ? null : parseInt(accountId);
          break;
        case "side":
          this.side = side || "";
          break;
        default:
          if (params[key] !== null) {
            this.attrs[key] = params[key] || "";
          } else {
            delete this.attrs[key];
          }
      }
    });
  }
  go(to) {
    this.parse(to);
    this.history.push(this.url);
  }
  get(variable) {
    switch (variable) {
      case "db":
      case "main":
        return this[variable] === "_" ? "" : this[variable];
      case "periodId":
      case "accountId":
      case "side":
        return this[variable];
      default:
        return this.attrs[variable];
    }
  }
  get url() {
    let url = `/${this.db || "_"}/${this.main || "_"}/${this.periodId || ""}/${this.accountId || ""}/${this.side}`;
    url = url.replace(/\/+$/, "");
    if (this.attrs.indirect === "yes") {
      delete this.attrs.indirect;
      this.indirectPath = true;
    }
    const attrs = Object.keys(this.attrs).map((k) => `${k}=${encodeURIComponent(this.attrs[k])}`);
    if (this.indirectPath) {
      return `?path=${url}&${attrs.join("&")}`;
    } else {
      if (attrs.length) {
        url += `?${attrs.join("&")}`;
      }
      return url;
    }
  }
};
var useNavigation = () => {
  const loc = (0, import_react_router_dom.useLocation)();
  const his = (0, import_react_router_dom.useHistory)();
  return new MenuState(loc, his);
};

// src/bookkeeper/IconButton.tsx
init_shim();
var import_react2 = __toESM(require("react"));
var import_react_i18next2 = require("react-i18next");
var import_material2 = require("@mui/material");
var import_icons_material = require("@mui/icons-material");
var import_tasenor_common3 = require("@dataplug/tasenor-common");
var ICONS = {
  "add-entry": import_icons_material.PlaylistAdd,
  "add-tx": import_icons_material.Add,
  "calendar-plus": import_icons_material.Event,
  "credit-card": import_icons_material.CreditCard,
  "delete-entry": import_icons_material.DeleteSweep,
  "delete-tx": import_icons_material.Delete,
  "hide-all": import_icons_material.VisibilityOff,
  "shopping-cart": import_icons_material.LocalGroceryStore,
  "show-all": import_icons_material.Visibility,
  "sort-up": import_icons_material.Sort,
  "user-plus": import_icons_material.PersonAdd,
  "zoom-in": import_icons_material.ZoomIn,
  "zoom-out": import_icons_material.ZoomOut,
  build: import_icons_material.Build,
  compact: import_icons_material.FormatIndentDecrease,
  database: import_icons_material.Storage,
  download: import_icons_material.CloudDownload,
  less: import_icons_material.ExpandLess,
  lock: import_icons_material.Lock,
  load: import_icons_material.CloudDownloadTwoTone,
  money: import_icons_material.AttachMoney,
  more: import_icons_material.ExpandMore,
  new: import_icons_material.AddCircleOutline,
  paperclip: import_icons_material.AttachFile,
  plugin: import_icons_material.Extension,
  print: import_icons_material.Print,
  profit: import_icons_material.ShowChartTwoTone,
  quarter1: import_icons_material.Filter1,
  quarter2: import_icons_material.Filter2,
  quarter3: import_icons_material.Filter3,
  quarter4: import_icons_material.Filter4,
  refresh: import_icons_material.Refresh,
  save: import_icons_material.CloudUploadTwoTone,
  sales: import_icons_material.AddShoppingCart,
  savings: import_icons_material.AccountBalance,
  settings: import_icons_material.Settings,
  star: import_icons_material.StarRate,
  summarize: import_icons_material.Functions,
  tag: import_icons_material.LocalOffer,
  trash: import_icons_material.Delete,
  unknown: import_icons_material.HelpOutline,
  unlock: import_icons_material.LockOpen,
  upload: import_icons_material.CloudUpload,
  view: import_icons_material.Pageview
};
var IconButton = (props) => {
  const cursor = (0, import_tasenor_common3.haveCursor)();
  const { t } = (0, import_react_i18next2.useTranslation)();
  const { disabled, title, pressKey, onClick, icon, shortcut, toggle, id } = props;
  let color = "primary";
  let className = "IconButton";
  if (toggle !== void 0) {
    color = toggle ? "secondary" : void 0;
    className += toggle ? " toggle-on" : "toggle-off";
  }
  const Icon = icon in ICONS ? ICONS[icon] : ICONS.unknown;
  const handleClick = (e) => {
    if (!disabled) {
      if (pressKey) {
        cursor.handle(pressKey);
      }
      if (onClick) {
        onClick(e);
      }
    }
  };
  return /* @__PURE__ */ import_react2.default.createElement(import_material2.IconButton, { id, className, color, title: t("icon-" + title) + (shortcut ? ` (Ctrl + ${shortcut})` : ""), disabled, onClick: (e) => handleClick(e) }, /* @__PURE__ */ import_react2.default.createElement(Icon, { style: { fontSize: 30 } }));
};

// src/bookkeeper/IconSpacer.tsx
init_shim();
var import_material3 = require("@mui/material");
var import_react3 = __toESM(require("react"));
var IconSpacer = () => {
  return /* @__PURE__ */ import_react3.default.createElement(import_material3.Box, { sx: {
    display: "inline-block",
    height: "2rem",
    marginLeft: "1.5rem",
    marginRight: "1.5rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: (theme) => theme.palette.divider,
    transform: "translateY(0.5rem)"
  } });
};

// src/bookkeeper/Localize.tsx
init_shim();
var import_react_i18next3 = require("react-i18next");
var import_tasenor_common4 = require("@dataplug/tasenor-common");
var Localize = (props) => {
  const catalog = (0, import_tasenor_common4.haveCatalog)();
  const { t } = (0, import_react_i18next3.useTranslation)();
  const localize = (text) => {
    let match;
    do {
      match = /(\{(\d\d\d\d-\d\d-\d\d)\})/.exec(text);
      if (match) {
        text = text.replace(match[1], catalog.date2str(match[2]));
      } else {
        match = /(\{(.*?)\})/.exec(text);
        if (match) {
          text = text.replace(match[1], t(match[2]));
        }
      }
    } while (match);
    return text;
  };
  if (props.date) {
    return catalog.date2str(props.date);
  }
  const what = props.children;
  if (what === void 0) {
    return "";
  }
  if (typeof what === "string") {
    return localize(what);
  }
  return "No localization available for " + typeof what;
};

// src/bookkeeper/Money.tsx
init_shim();
var import_react4 = __toESM(require("react"));
var import_tasenor_common5 = require("@dataplug/tasenor-common");
var Money = (props) => {
  const catalog = (0, import_tasenor_common5.haveCatalog)();
  const str = catalog.money2str(props.cents, props.currency, props.signed);
  return /* @__PURE__ */ import_react4.default.createElement("span", { className: "Money", style: { whiteSpace: "nowrap" }, dangerouslySetInnerHTML: { __html: str } });
};

// src/bookkeeper/Note.tsx
init_shim();
var import_react5 = __toESM(require("react"));
var import_material4 = require("@mui/material");
var Note = (props) => {
  const { children, className, showIf } = props;
  if (showIf !== void 0 && !showIf) {
    return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null);
  }
  return /* @__PURE__ */ import_react5.default.createElement(import_material4.Typography, { className: className || "Note", color: "error", align: "center", variant: "h6" }, children);
};

// src/bookkeeper/RuleEditor/index.ts
init_shim();

// src/bookkeeper/RuleEditor/RuleColumnEdit.tsx
init_shim();
var import_react6 = __toESM(require("react"));
var import_material5 = require("@mui/material");
var import_mobx_react = require("mobx-react");
var import_Rtt = __toESM(require("@mui/icons-material/Rtt"));
var import_RemoveCircleOutline = __toESM(require("@mui/icons-material/RemoveCircleOutline"));
var import_AddCircleOutline = __toESM(require("@mui/icons-material/AddCircleOutline"));
var import_clone = __toESM(require_clone());
var import_TextFields = __toESM(require("@mui/icons-material/TextFields"));
var import_TextFormat = __toESM(require("@mui/icons-material/TextFormat"));
var RuleColumnEdit = (0, import_mobx_react.observer)((props) => {
  const { name, value, filters, onSetFilter, options } = props;
  const [mode, setMode] = (0, import_react6.useState)(null);
  const [text, setText] = (0, import_react6.useState)(value);
  const [toggles, setToggles] = (0, import_react6.useState)([]);
  const hasBeenUsed = filters.filter((f) => f.field === name).length > 0;
  const isNumeric = options.numericFields.filter((f) => f === name).length > 0;
  const isText = !isNumeric;
  const isGreaterThan = filters.filter((f) => f.op === "isGreaterThan").length > 0;
  const isLessThan = filters.filter((f) => f.op === "isLessThan").length > 0;
  const updateFilter = (view) => {
    const rules = (0, import_clone.default)(filters).filter((f) => f.field !== view.field);
    rules.push(view);
    onSetFilter(rules);
  };
  let IconRow = /* @__PURE__ */ import_react6.default.createElement(import_material5.TableRow, { selected: hasBeenUsed }, /* @__PURE__ */ import_react6.default.createElement(import_material5.TableCell, { variant: "head" }, /* @__PURE__ */ import_react6.default.createElement("b", null, name)), /* @__PURE__ */ import_react6.default.createElement(import_material5.TableCell, null, value), /* @__PURE__ */ import_react6.default.createElement(import_material5.TableCell, { align: "right" }, isText && /* @__PURE__ */ import_react6.default.createElement(
    import_material5.IconButton,
    {
      color: "primary",
      size: "medium",
      title: "Match the text in this column",
      disabled: mode === "textMatch",
      onClick: () => setMode("textMatch")
    },
    /* @__PURE__ */ import_react6.default.createElement(import_Rtt.default, null)
  ), isNumeric && /* @__PURE__ */ import_react6.default.createElement(
    import_material5.IconButton,
    {
      color: "primary",
      size: "medium",
      title: "Require that this field is negative",
      disabled: isLessThan,
      onClick: () => updateFilter({ op: "isLessThan", field: name, value: 0 })
    },
    /* @__PURE__ */ import_react6.default.createElement(import_RemoveCircleOutline.default, null)
  ), isNumeric && /* @__PURE__ */ import_react6.default.createElement(
    import_material5.IconButton,
    {
      color: "primary",
      size: "medium",
      title: "Require that this field is positive",
      disabled: isGreaterThan,
      onClick: () => updateFilter({ op: "isGreaterThan", field: name, value: 0 })
    },
    /* @__PURE__ */ import_react6.default.createElement(import_AddCircleOutline.default, null)
  )));
  let EditRow = null;
  if (mode === "textMatch") {
    const info = (toggles.includes("whole") ? "Match if the full text in `{field}` column is the text below ({case})" : "Match if the text is found from `{field}` column ({case})").replace("{field}", name).replace("{case}", toggles.includes("case") ? "case sensitive" : "ignore case");
    IconRow = /* @__PURE__ */ import_react6.default.createElement(import_material5.TableRow, null, /* @__PURE__ */ import_react6.default.createElement(import_material5.TableCell, { colSpan: 2 }, info), /* @__PURE__ */ import_react6.default.createElement(import_material5.TableCell, null, /* @__PURE__ */ import_react6.default.createElement(import_material5.ToggleButtonGroup, { value: toggles, onChange: (_, val) => setToggles(val) }, /* @__PURE__ */ import_react6.default.createElement(import_material5.ToggleButton, { title: "Case sensitive match", value: "case" }, /* @__PURE__ */ import_react6.default.createElement(import_TextFields.default, null)), /* @__PURE__ */ import_react6.default.createElement(import_material5.ToggleButton, { title: "Match complete field value", value: "whole" }, /* @__PURE__ */ import_react6.default.createElement(import_TextFormat.default, null)))));
    EditRow = /* @__PURE__ */ import_react6.default.createElement(import_material5.TableRow, null, /* @__PURE__ */ import_react6.default.createElement(import_material5.TableCell, { colSpan: 3 }, /* @__PURE__ */ import_react6.default.createElement(
      import_material5.TextField,
      {
        fullWidth: true,
        autoFocus: true,
        onKeyUp: (event) => {
          if (event.key === "Enter") {
            setMode(null);
            const op = `case${toggles.includes("case") ? "Insensitive" : "Sensitive"}${toggles.includes("whole") ? "Full" : ""}Match`;
            updateFilter({ op, field: name, text });
          }
          if (event.key === "Escape") {
            setMode(null);
          }
        },
        label: "The text to match",
        value: text,
        onChange: (e) => setText(e.target.value)
      }
    )));
  }
  return EditRow ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, IconRow, EditRow) : IconRow;
});

// src/bookkeeper/RuleEditor/RuleEditor.tsx
init_shim();
var import_react14 = __toESM(require("react"));
var import_tasenor_common7 = require("@dataplug/tasenor-common");
var import_material13 = require("@mui/material");

// src/bookkeeper/TagGroups.tsx
init_shim();
var import_react8 = __toESM(require("react"));
var import_mobx_react2 = require("mobx-react");
var import_material7 = require("@mui/material");

// src/bookkeeper/TagChip.tsx
init_shim();
var import_react7 = __toESM(require("react"));
var import_icons_material2 = require("@mui/icons-material");
var import_material6 = require("@mui/material");
var TagChip = (props) => {
  const { disabled, onClick, tag: { name, url } } = props;
  return /* @__PURE__ */ import_react7.default.createElement(
    import_material6.Chip,
    {
      avatar: /* @__PURE__ */ import_react7.default.createElement(import_material6.Avatar, { src: url }),
      label: name,
      deleteIcon: disabled ? /* @__PURE__ */ import_react7.default.createElement(import_icons_material2.RadioButtonUnchecked, null) : /* @__PURE__ */ import_react7.default.createElement(import_icons_material2.RadioButtonChecked, null),
      variant: "outlined",
      color: "primary",
      clickable: true,
      onDelete: () => 1,
      onClick: () => onClick && onClick()
    }
  );
};

// src/bookkeeper/TagGroups.tsx
var import_react_i18next4 = require("react-i18next");
var TagGroup = (0, import_mobx_react2.observer)((props) => {
  const { tags, types, selected, options } = props;
  const tagGroups = {};
  const [selectedTags, setSelectedTags] = (0, import_react8.useState)(selected);
  const typeSet = types ? new Set(types) : new Set(Object.values(tags).map((tag) => tag.type));
  const optionSet = options ? new Set(options) : /* @__PURE__ */ new Set();
  let found = false;
  Object.values(tags).forEach((tag) => {
    if (tag.type && (!types || typeSet.has(tag.type)) && (!options || optionSet.has(tag.tag))) {
      tagGroups[tag.type] = tagGroups[tag.type] || [];
      tagGroups[tag.type].push(tag);
      found = true;
    }
  });
  const onClick = (clicked) => {
    let newTags;
    const tag = clicked.tag;
    if (tag === null) {
      return;
    }
    if (props.single) {
      if (selectedTags.includes(tag)) {
        newTags = [];
      } else {
        newTags = [tag];
      }
    } else {
      if (selectedTags.includes(tag)) {
        newTags = selectedTags.filter((t) => t !== tag);
      } else {
        newTags = selectedTags.concat([tag]);
      }
    }
    props.onChange(newTags);
    setSelectedTags(newTags);
  };
  if (!found) {
    return /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement(import_react_i18next4.Trans, null, "No suitable tags available."), options && options.length > 0 && /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement(import_react_i18next4.Trans, null, "Tried to look for the following tags:"), " ", options.join(", ")), types && types.length > 0 && /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement(import_react_i18next4.Trans, null, "Tried to look for the following tag types:"), " ", types.join(", ")));
  }
  return /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, [...typeSet].map((type) => type && tagGroups[type] && /* @__PURE__ */ import_react8.default.createElement(import_material7.Box, { key: type }, /* @__PURE__ */ import_react8.default.createElement(import_material7.Typography, { variant: "caption" }, type), /* @__PURE__ */ import_react8.default.createElement(import_material7.Grid, { container: true, spacing: 1 }, tagGroups[type].map((tag) => tag.tag !== null && /* @__PURE__ */ import_react8.default.createElement(import_material7.Grid, { item: true, key: tag.tag }, /* @__PURE__ */ import_react8.default.createElement(TagChip, { disabled: !selectedTags.includes(tag.tag), tag, onClick: () => onClick(tag) })))))));
});

// src/bookkeeper/AccountSelector.tsx
init_shim();
var import_react9 = __toESM(require("react"));
var import_StarOutline = __toESM(require("@mui/icons-material/StarOutline"));
var import_material8 = require("@mui/material");
var import_tasenor_common6 = require("@dataplug/tasenor-common");
var import_mobx_react3 = require("mobx-react");
var AccountSelector = (0, import_mobx_react3.observer)((props) => {
  const { value, onChange, label } = props;
  const filter = (0, import_tasenor_common6.filter2function)(props.filter);
  let accounts = [];
  const preferred = [];
  if (props.preferred) {
    const preferredSet = new Set(props.preferred);
    props.accounts.filter((a) => filter(a)).forEach((a) => {
      if (preferredSet.has(a.number)) {
        preferred.push(a);
      } else {
        accounts.push(a);
      }
    });
  } else {
    accounts = props.accounts.filter((a) => filter(a));
  }
  return /* @__PURE__ */ import_react9.default.createElement(
    import_material8.TextField,
    {
      select: true,
      fullWidth: true,
      label,
      value,
      onChange: (e) => onChange(e.target.value)
    },
    /* @__PURE__ */ import_react9.default.createElement(import_material8.MenuItem, { value: "" }, "\xA0"),
    preferred.map((account, idx) => /* @__PURE__ */ import_react9.default.createElement(import_material8.MenuItem, { value: account.number, key: account.id, divider: idx === preferred.length - 1 }, account.number, " ", account.name, " ", /* @__PURE__ */ import_react9.default.createElement(import_StarOutline.default, { fontSize: "small", sx: { color: "rgba(0,0,0,0.2)" } }), " ")),
    accounts.map((account) => /* @__PURE__ */ import_react9.default.createElement(import_material8.MenuItem, { value: account.number, key: account.id }, account.number, " ", account.name))
  );
});

// src/bookkeeper/RuleEditor/RuleEditor.tsx
var import_react_i18next8 = require("react-i18next");
var import_mobx_react5 = require("mobx-react");

// src/bookkeeper/RuleEditor/RuleLineEdit.tsx
init_shim();
var import_react10 = __toESM(require("react"));
var import_material9 = require("@mui/material");
var import_react_i18next5 = require("react-i18next");
var import_mobx_react4 = require("mobx-react");
var RuleLineEdit = (0, import_mobx_react4.observer)((props) => {
  const { line, options } = props;
  const { columns } = line;
  const { t } = (0, import_react_i18next5.useTranslation)();
  const [more, setMore] = (0, import_react10.useState)(false);
  const insignificantFields = new Set(options.insignificantFields || []);
  return /* @__PURE__ */ import_react10.default.createElement(import_material9.TableContainer, null, /* @__PURE__ */ import_react10.default.createElement(import_material9.Table, { size: "small" }, /* @__PURE__ */ import_react10.default.createElement(import_material9.TableBody, null, Object.keys(columns).filter((key) => !key.startsWith("_")).map((key) => insignificantFields.has(key) && !more ? /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, { key }) : /* @__PURE__ */ import_react10.default.createElement(
    RuleColumnEdit,
    {
      key,
      name: key,
      options,
      value: columns[key],
      filters: props.filters,
      onSetFilter: props.onSetFilter
    }
  )), insignificantFields.size > 0 && /* @__PURE__ */ import_react10.default.createElement(import_material9.TableRow, null, /* @__PURE__ */ import_react10.default.createElement(import_material9.TableCell, { colSpan: 3 }, more && /* @__PURE__ */ import_react10.default.createElement(import_react_i18next5.Trans, null, "Show Less"), more && /* @__PURE__ */ import_react10.default.createElement(IconButton, { id: "less", icon: "less", title: t("Show Less"), onClick: () => setMore(false) }), !more && /* @__PURE__ */ import_react10.default.createElement(import_react_i18next5.Trans, null, "Show More"), !more && /* @__PURE__ */ import_react10.default.createElement(IconButton, { id: "more", icon: "more", title: t("Show More"), onClick: () => setMore(true) }))))));
});

// src/bookkeeper/RuleEditor/VisualRule.tsx
init_shim();
var import_react13 = __toESM(require("react"));
var import_material12 = require("@mui/material");
var import_react_i18next7 = require("react-i18next");

// src/bookkeeper/RuleEditor/VisualRuleLine.tsx
init_shim();
var import_react11 = __toESM(require("react"));
var import_material10 = require("@mui/material");
var import_DeleteForever = __toESM(require("@mui/icons-material/DeleteForever"));
var import_react_i18next6 = require("react-i18next");
var VisualRuleLine = (props) => {
  const { t } = (0, import_react_i18next6.useTranslation)();
  const { op, field, text, value, onDelete } = props;
  let leftLabel = "undefined";
  let opChar = "?";
  const opTitle = t(`rule-op-${op}`);
  let rightLabel = "undefined";
  const sx = {};
  switch (op) {
    case "setLiteral":
      leftLabel = `${field}`;
      opChar = "=";
      rightLabel = `${JSON.stringify(value)}`;
      sx.fontFamily = "monospace";
      break;
    case "copyField":
      leftLabel = `${field}`;
      opChar = "\u27FB";
      rightLabel = `${value}`;
      break;
    case "copyInverseField":
      leftLabel = `${field}`;
      opChar = "\u27FB";
      rightLabel = `- ${value}`;
      break;
    case "isGreaterThan":
      leftLabel = `${field}`;
      opChar = /* @__PURE__ */ import_react11.default.createElement(import_react11.default.Fragment, null, ">");
      rightLabel = `${value}`;
      break;
    case "isLessThan":
      leftLabel = `${field}`;
      opChar = /* @__PURE__ */ import_react11.default.createElement(import_react11.default.Fragment, null, "<");
      rightLabel = `${value}`;
      break;
    case "caseSensitiveMatch":
      leftLabel = `${field}`;
      opChar = "=";
      rightLabel = `${text}`;
      break;
    case "caseInsensitiveMatch":
      leftLabel = `${field}`;
      opChar = "\u2248";
      rightLabel = `${text}`;
      break;
    case "caseInsensitiveFullMatch":
      leftLabel = `${field}`;
      opChar = "\u23F5\u2248\u23F4";
      rightLabel = `${text}`;
      break;
    case "caseSensitiveFullMatch":
      leftLabel = `${field}`;
      opChar = "\u23F5=\u23F4";
      rightLabel = `${text}`;
      break;
  }
  const left = /* @__PURE__ */ import_react11.default.createElement(import_material10.Chip, { label: leftLabel, color: leftLabel === "undefined" ? "error" : "primary", variant: "outlined" });
  const center = /* @__PURE__ */ import_react11.default.createElement(import_material10.Chip, { label: opChar, sx: { fontSize: 24 }, color: opChar === "?" ? "error" : void 0, title: opTitle, variant: "filled" });
  const right = /* @__PURE__ */ import_react11.default.createElement(import_material10.Chip, { sx, label: rightLabel, color: rightLabel === "undefined" ? "error" : "secondary", variant: "outlined" });
  const del = onDelete ? /* @__PURE__ */ import_react11.default.createElement(import_material10.IconButton, { onClick: onDelete, color: "error" }, /* @__PURE__ */ import_react11.default.createElement(import_DeleteForever.default, null)) : /* @__PURE__ */ import_react11.default.createElement(import_react11.default.Fragment, null);
  return /* @__PURE__ */ import_react11.default.createElement(import_react11.default.Fragment, null, /* @__PURE__ */ import_react11.default.createElement(import_material10.Box, { sx: { display: "flex", justifyContent: "flex-start", gap: 2 } }, left, center, right, del));
};

// src/bookkeeper/RuleEditor/VisualResultRule.tsx
init_shim();
var import_react12 = __toESM(require("react"));
var import_material11 = require("@mui/material");
var VisualResultRule = (props) => {
  const { view } = props;
  return /* @__PURE__ */ import_react12.default.createElement(import_material11.Box, null, /* @__PURE__ */ import_react12.default.createElement(VisualRuleLine, { field: "reason", op: view.reason.op, value: view.reason.value }), /* @__PURE__ */ import_react12.default.createElement(VisualRuleLine, { field: "type", op: view.type.op, value: view.type.value }), /* @__PURE__ */ import_react12.default.createElement(VisualRuleLine, { field: "asset", op: view.asset.op, value: view.asset.value }), /* @__PURE__ */ import_react12.default.createElement(VisualRuleLine, { field: "amount", op: view.amount.op, value: view.amount.value }), view.tags && /* @__PURE__ */ import_react12.default.createElement(VisualRuleLine, { field: "tags", op: view.tags.op, value: view.tags.value }), view.data && Object.keys(view.data).length > 0 && Object.keys(view.data).map((key) => view.data && key in view.data && /* @__PURE__ */ import_react12.default.createElement(VisualRuleLine, { key, field: `data.${key}`, op: view.data[key].op, value: view.data[key].value })));
};

// src/bookkeeper/RuleEditor/VisualRule.tsx
var VisualRule = (props) => {
  const { rule, onSetFilter } = props;
  const onDelete = (idx) => {
    const remaining = rule.filter.filter((f, i) => i !== idx);
    onSetFilter(remaining);
  };
  return /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, rule.filter.length > 0 && /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, /* @__PURE__ */ import_react13.default.createElement(import_material12.Typography, { variant: "h5" }, "Filter"), rule.filter.map((filter, idx) => /* @__PURE__ */ import_react13.default.createElement(VisualRuleLine, { key: idx, onDelete: () => onDelete(idx), op: filter.op, field: filter.field, text: filter.text, value: filter.value }))), rule.result.length > 0 && /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, /* @__PURE__ */ import_react13.default.createElement(import_material12.Typography, { variant: "h5" }, /* @__PURE__ */ import_react13.default.createElement(import_react_i18next7.Trans, null, "Result")), /* @__PURE__ */ import_react13.default.createElement(import_material12.Stack, { spacing: 2 }, rule.result.map((result, idx) => /* @__PURE__ */ import_react13.default.createElement(VisualResultRule, { key: idx, view: result })))));
};

// src/bookkeeper/RuleEditor/RuleEditor.tsx
var Item = (0, import_material13.styled)(import_material13.Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary
}));
var RuleEditor = (0, import_mobx_react5.observer)((props) => {
  const { store, lines, cashAccount, values, onChange, onContinue, onCreateRule, options } = props;
  const allTags = store.db ? store.dbsByName[store.db].tagsByTag : {};
  const [tags, setTags] = (0, import_react14.useState)(values && values.tags ? values.tags : []);
  const [account, setAccount] = (0, import_react14.useState)(values && values.account ? values.account : "");
  const [text, setText] = (0, import_react14.useState)(values && values.text ? values.text : lines && lines.length ? lines[0].columns._textField : "");
  const [rule, setRule] = (0, import_react14.useState)({
    name: "New Rule",
    filter: "null",
    view: {
      filter: [],
      result: []
    },
    result: [],
    examples: lines
  });
  const [mode, setMode] = (0, import_react14.useState)(null);
  const [autonaming, setAutonaming] = (0, import_react14.useState)(true);
  const { t } = (0, import_react_i18next8.useTranslation)();
  if (!lines || lines.length < 1)
    return /* @__PURE__ */ import_react14.default.createElement(import_react14.default.Fragment, null);
  const transfers = ({ text: text2, account: account2, tags: tags2 }) => {
    const _totalAmountField = parseFloat(lines[0].columns._totalAmountField);
    const transfers2 = [];
    if (cashAccount) {
      transfers2.push({
        reason: _totalAmountField < 0 ? "expense" : "income",
        type: "account",
        asset: cashAccount,
        amount: _totalAmountField,
        data: {
          text: text2
        }
      });
    }
    if (account2) {
      transfers2.push({
        reason: _totalAmountField < 0 ? "expense" : "income",
        type: "account",
        asset: account2,
        amount: -_totalAmountField,
        data: {
          text: text2
        }
      });
    }
    if (tags2.length && (0, import_tasenor_common7.isValue)(tags2)) {
      if ((0, import_tasenor_common7.isValues)(transfers2[0]))
        transfers2[0].tags = tags2;
      if ((0, import_tasenor_common7.isValues)(transfers2[1]))
        transfers2[1].tags = tags2;
    }
    return transfers2;
  };
  const resultViews = ({ account: account2, tags: tags2 }) => {
    const _totalAmountField = parseFloat(lines[0].columns._totalAmountField);
    const results = [];
    if (!options.totalAmountField) {
      throw new Error(`Cannot use rule editor since options has no 'totalAmountField' in ${JSON.stringify(options)}`);
    } else if (!options.textField) {
      throw new Error(`Cannot use rule editor since options has no 'textField' in ${JSON.stringify(options)}`);
    } else {
      if (cashAccount && options.totalAmountField) {
        results.push(
          {
            reason: { op: "setLiteral", value: _totalAmountField < 0 ? "expense" : "income" },
            type: { op: "setLiteral", value: "account" },
            asset: { op: "setLiteral", value: cashAccount },
            amount: { op: "copyField", value: options.totalAmountField },
            data: {
              text: { op: "copyField", value: options.textField }
            }
          }
        );
      }
    }
    if (account2) {
      results.push(
        {
          reason: { op: "setLiteral", value: _totalAmountField < 0 ? "expense" : "income" },
          type: { op: "setLiteral", value: "account" },
          asset: { op: "setLiteral", value: account2 },
          amount: { op: "copyInverseField", value: options.totalAmountField },
          data: {
            text: { op: "copyField", value: options.textField }
          }
        }
      );
    }
    if (tags2.length) {
      if (results[0])
        results[0].tags = { op: "setLiteral", value: JSON.stringify(tags2) };
      if (results[1])
        results[1].tags = { op: "setLiteral", value: JSON.stringify(tags2) };
    }
    return results;
  };
  const editorOuput = {
    mode,
    account,
    tags,
    text,
    segment: lines[0].segmentId,
    transfers: transfers({ text, account, tags }),
    rule
  };
  return /* @__PURE__ */ import_react14.default.createElement(import_material13.Box, { sx: { flexGrow: 1 } }, /* @__PURE__ */ import_react14.default.createElement(import_material13.Grid, { container: true, spacing: 2 }, /* @__PURE__ */ import_react14.default.createElement(import_material13.Grid, { item: true, xs: 12 }, "We have found lines in the imported file that does not match anything we know already. Please help to determine what to do with this."), /* @__PURE__ */ import_react14.default.createElement(import_material13.Grid, { item: true, xs: 12 }, /* @__PURE__ */ import_react14.default.createElement(Item, null, lines.map((line, idx) => /* @__PURE__ */ import_react14.default.createElement(import_material13.Typography, { title: t("Line number #{number}").replace("{number}", `${line.line}`), key: idx, sx: { fontFamily: "monospace" } }, line.text.replace(/\t/g, " \u23B5 "))))), /* @__PURE__ */ import_react14.default.createElement(import_material13.Grid, { item: true, xs: 7 }, /* @__PURE__ */ import_react14.default.createElement(Item, null, /* @__PURE__ */ import_react14.default.createElement(import_material13.Typography, { variant: "h5" }, "Quick Once-Off Selection"), /* @__PURE__ */ import_react14.default.createElement(
    AccountSelector,
    {
      label: "Select Account",
      value: account,
      accounts: store.accounts,
      onChange: (num) => {
        setAccount(num);
        setMode("once-off");
        const resView = resultViews({ account, tags });
        const result = (0, import_tasenor_common7.filterView2results)(resView);
        const ruleView = { ...rule.view || { filter: [] }, result: resView };
        const newRule = { ...rule, result, view: ruleView };
        setRule(newRule);
        onChange({ ...editorOuput, rule: newRule, transfers: transfers({ text, tags, account: num }), account: num });
      }
    }
  ), /* @__PURE__ */ import_react14.default.createElement(
    import_material13.TextField,
    {
      fullWidth: true,
      label: "Describe this transaction",
      value: text,
      onChange: (e) => {
        setText(e.target.value);
        setMode("once-off");
        onChange({ ...editorOuput, transfers: transfers({ text: e.target.value, tags, account }), text: e.target.value });
      },
      sx: { pb: 1, pt: 1 }
    }
  ), /* @__PURE__ */ import_react14.default.createElement(
    TagGroup,
    {
      tags: allTags,
      single: false,
      options: Object.keys(allTags),
      onChange: (selected) => {
        setTags(selected);
        setMode("once-off");
        const resView = resultViews({ account, tags });
        const result = (0, import_tasenor_common7.filterView2results)(resView);
        const ruleView = { ...rule.view || { filter: [] }, result: resView };
        const newRule = { ...rule, result, view: ruleView };
        setRule(newRule);
        onChange({ ...editorOuput, rule: newRule, transfers: transfers({ text, tags: selected, account }), tags: selected });
      },
      selected: tags
    }
  ), /* @__PURE__ */ import_react14.default.createElement(import_material13.Button, { variant: "outlined", disabled: !text || !account, onClick: () => onContinue() }, "Continue"))), /* @__PURE__ */ import_react14.default.createElement(import_material13.Grid, { item: true, xs: 5 }, /* @__PURE__ */ import_react14.default.createElement(Item, null, /* @__PURE__ */ import_react14.default.createElement(import_material13.Typography, { variant: "h5" }, "Construct a Permanent Rule"), /* @__PURE__ */ import_react14.default.createElement(
    import_material13.TextField,
    {
      fullWidth: true,
      label: "Name of the rule",
      value: rule.name,
      onChange: (e) => {
        setAutonaming(e.target.value.length === 0);
        setMode("new-rule");
        const newRule = { ...rule, name: e.target.value };
        setRule(newRule);
        onChange({ ...editorOuput, rule: newRule });
      },
      sx: { mt: 2 }
    }
  ), lines.map((line, idx) => /* @__PURE__ */ import_react14.default.createElement(import_material13.Stack, { spacing: 1, key: idx }, /* @__PURE__ */ import_react14.default.createElement(
    RuleLineEdit,
    {
      line,
      filters: rule.view ? rule.view.filter : [],
      options,
      onSetFilter: (filters) => {
        const filter = (0, import_tasenor_common7.filterView2rule)(filters);
        const name = autonaming ? (0, import_tasenor_common7.filterView2name)(filters) : rule.name;
        setMode("new-rule");
        const resView = resultViews({ account, tags });
        const result = (0, import_tasenor_common7.filterView2results)(resView);
        const newRule = { ...rule, name, result, filter, view: { filter: filters, result: resView } };
        setRule(newRule);
        onChange({ ...editorOuput, rule: newRule });
      }
    }
  ), idx < lines.length - 1 && /* @__PURE__ */ import_react14.default.createElement(import_material13.Divider, { variant: "middle" }))), /* @__PURE__ */ import_react14.default.createElement(import_material13.Button, { variant: "outlined", disabled: !(rule.view && rule.view.filter.length), onClick: () => onCreateRule() }, "Create Rule"))), /* @__PURE__ */ import_react14.default.createElement(import_material13.Grid, { item: true, xs: 7 }, /* @__PURE__ */ import_react14.default.createElement(Item, null, /* @__PURE__ */ import_react14.default.createElement(import_material13.Typography, { variant: "h5" }, "Resulting Transfers"), "TODO: DISPLAY TRANSFERS HERE (Substitute values from sample lines)")), /* @__PURE__ */ import_react14.default.createElement(import_material13.Grid, { item: true, xs: 5 }, /* @__PURE__ */ import_react14.default.createElement(Item, null, /* @__PURE__ */ import_react14.default.createElement(import_material13.Typography, { variant: "h5" }, "Current Rule"), rule && rule.view && /* @__PURE__ */ import_react14.default.createElement(
    VisualRule,
    {
      rule: rule.view,
      onSetFilter: (filters) => {
        const filter = (0, import_tasenor_common7.filterView2rule)(filters);
        const name = autonaming ? (0, import_tasenor_common7.filterView2name)(filters) : rule.name;
        const ruleView = { ...rule.view || { result: [] }, filter: filters };
        const newRule = { ...rule, name, filter, view: ruleView };
        setRule(newRule);
        onChange({ ...editorOuput, rule: newRule });
      }
    }
  ))), /* @__PURE__ */ import_react14.default.createElement(import_material13.Grid, { item: true, xs: 7 }, /* @__PURE__ */ import_react14.default.createElement(Item, null, /* @__PURE__ */ import_react14.default.createElement(import_material13.Typography, { variant: "h5" }, "Resulting Transactions"), "TODO: DISPLAY TRANSACTION HERE"))));
});

// src/bookkeeper/SubPanel.tsx
init_shim();
var import_react15 = __toESM(require("react"));
var import_material14 = require("@mui/material");
var SubPanel = (props) => {
  return /* @__PURE__ */ import_react15.default.createElement(import_material14.Card, { className: props.className || "SubPanel", variant: "outlined", style: { margin: "1rem" } }, /* @__PURE__ */ import_react15.default.createElement(import_material14.CardContent, null, /* @__PURE__ */ import_react15.default.createElement(import_material14.Typography, { variant: "body1", component: "div" }, props.children)));
};

// src/bookkeeper/TabNav.tsx
init_shim();
var import_material15 = require("@mui/material");
var import_react16 = __toESM(require("react"));
var TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return /* @__PURE__ */ import_react16.default.createElement(
    "div",
    {
      role: "tabpanel",
      hidden: value !== index,
      id: `tabpanel-${index}`,
      "aria-labelledby": `tab-${index}`,
      ...other
    },
    value === index && /* @__PURE__ */ import_react16.default.createElement(import_material15.Box, { sx: { p: 3 } }, children)
  );
};
function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`
  };
}
var TabNav = (props) => {
  const { menu, labels, children } = props;
  const nav = useNavigation();
  const indices = Object.keys(labels);
  const onChange = (event, idx) => {
    nav.go({ [menu]: indices[idx] });
  };
  const current = Math.max(0, indices.indexOf(`${nav.get(menu)}`));
  return /* @__PURE__ */ import_react16.default.createElement(import_material15.Paper, null, /* @__PURE__ */ import_react16.default.createElement(import_material15.Box, { sx: { borderBottom: 1, borderColor: "divider" } }, /* @__PURE__ */ import_react16.default.createElement(import_material15.Tabs, { value: current, onChange: (event, value) => onChange(event, value) }, Object.values(labels).map((label, idx) => /* @__PURE__ */ import_react16.default.createElement(import_material15.Tab, { key: idx, label, ...a11yProps(idx) })))), children.map(
    (child, idx) => /* @__PURE__ */ import_react16.default.createElement(TabPanel, { key: idx, value: current, index: idx }, child)
  ));
};

// src/bookkeeper/Title.tsx
init_shim();
var import_react17 = __toESM(require("react"));
var import_material16 = require("@mui/material");
var Title = ({ children, className }) => {
  return /* @__PURE__ */ import_react17.default.createElement(
    "div",
    {
      className: className ? `${className} Title` : "Title",
      style: { paddingLeft: "2rem", marginBottom: "1rem", borderBottom: "1px solid rgba(0,0,0,0.1)" }
    },
    /* @__PURE__ */ import_react17.default.createElement(import_material16.Typography, { className: "text", variant: "h5" }, children)
  );
};

// src/elements/index.ts
init_shim();

// src/elements/BooleanElement.tsx
init_shim();
var import_react18 = __toESM(require("react"));
var import_react_i18next9 = require("react-i18next");
var import_material17 = require("@mui/material");
var import_tasenor_common8 = require("@dataplug/tasenor-common");
var BooleanRenderer = (props) => {
  const { element } = props;
  const { t } = (0, import_react_i18next9.useTranslation)();
  const label = "label" in element ? element.label || "" : (0, import_tasenor_common8.isNamedElement)(element) ? t(`label-${element.name}`) : "";
  const [value, setValue2] = import_react18.default.useState((0, import_tasenor_common8.isNamedElement)(element) ? props.values[element.name] : null);
  if (!(0, import_tasenor_common8.isBooleanElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  return /* @__PURE__ */ import_react18.default.createElement(
    import_material17.FormControlLabel,
    {
      control: /* @__PURE__ */ import_react18.default.createElement(
        import_material17.Checkbox,
        {
          checked: !!value,
          onChange: (e) => {
            setValue2(e.target.checked);
            element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: !!e.target.checked }, props);
          },
          name: element.name,
          indeterminate: value === void 0 || value === null
        }
      ),
      label
    }
  );
};

// src/elements/BoxElement.tsx
init_shim();
var import_react25 = __toESM(require("react"));
var import_material21 = require("@mui/material");
var import_tasenor_common12 = require("@dataplug/tasenor-common");

// src/risp/index.ts
init_shim();

// src/risp/ActionEngine.ts
init_shim();
var import_mobx = require("mobx");
var import_axios = __toESM(require_axios2());
var import_set_value = __toESM(require("set-value"));
var import_get_value = __toESM(require("get-value"));
var import_tasenor_common9 = require("@dataplug/tasenor-common");
_global.ActionEngineHandlers = {};
var ActionEngine = class {
  static register(name, handler) {
    const old = ActionEngineHandlers[name] || null;
    ActionEngineHandlers[name] = handler;
    return old;
  }
  static async fail(message) {
    return {
      success: false,
      message
    };
  }
  static async success(result) {
    return {
      success: true,
      result
    };
  }
  static async handle(action, props) {
    if (!action) {
      throw new Error("Action engine called without action.");
    }
    const runAction = async (action2, props2) => {
      if (!ActionEngineHandlers[action2.type]) {
        throw new Error(`There is no action handler for action '${JSON.stringify(action2)}'.`);
      }
      let ret;
      await (0, import_mobx.runInAction)(async () => {
        ret = await ActionEngineHandlers[action2.type](action2, props2);
      });
      return ret;
    };
    if (Array.isArray(action)) {
      const messages = [];
      const results = [];
      for (let i = 0; i < action.length; i++) {
        const result = await runAction(action[i], props);
        if (result.success) {
          results.push(result.result);
        } else {
          messages.push(result.message);
        }
      }
      return messages.length ? { success: false, message: messages.join("\n") } : { success: true, result: results };
    } else {
      return runAction(action, props);
    }
  }
};
var debugActionHandler = async (action, props) => {
  const { element, values } = props;
  if ((0, import_tasenor_common9.isActiveElement)(element)) {
    console.log("Action:", action);
    console.log("Element:", element);
    console.log("Values:", values);
  }
  return { success: true, result: void 0 };
};
async function axiosRequst(method, action, props) {
  const { element, setup, values } = props;
  if ((0, import_tasenor_common9.isActiveElement)(element)) {
    if (!setup.baseUrl) {
      throw new Error(`Cannot use ${method} action when setup does not define 'baseUrl'.`);
    }
    const { objectWrapLevel } = action;
    let requestValues;
    if (objectWrapLevel) {
      requestValues = {};
      Object.keys(values).forEach((k) => {
        const v = values[k];
        const parts = k.split(".");
        let k1, k2;
        if (parts.length === 1) {
          requestValues[k] = v;
          return;
        } else if (objectWrapLevel >= parts.length) {
          k1 = parts.slice(0, parts.length - 1).join(".");
          k2 = parts[parts.length - 1];
        } else {
          k1 = parts.slice(0, objectWrapLevel).join(".");
          k2 = parts.slice(objectWrapLevel).join(".");
        }
        const old = (0, import_get_value.default)(requestValues, k1) || {};
        old[k2] = v;
        (0, import_set_value.default)(requestValues, k1, old);
      });
    } else {
      requestValues = values;
    }
    const url = `${setup.baseUrl.replace(/\/$/, "")}/${action.url.replace(/^\//, "")}`;
    const call = {
      method,
      url,
      data: requestValues,
      headers: {}
    };
    if (setup.token) {
      call.headers = {
        Authorization: `Bearer ${setup.token}`
      };
    }
    let error;
    const result = await (0, import_axios.default)(call).catch((err) => error = err);
    if (error) {
      if (setup.errorMessage && action.errorMessage) {
        setup.errorMessage(action.errorMessage);
      }
      return { success: false, message: `PATCH ${url} failed: ${error}.` };
    } else {
      if (setup.successMessage && action.successMessage) {
        setup.successMessage(action.successMessage);
      }
      return { success: true, result: result.data };
    }
  }
  return { success: true, result: void 0 };
}
var patchActionHandler = async (action, props) => {
  return axiosRequst("PATCH", action, props);
};
var postActionHandler = async (action, props) => {
  return axiosRequst("POST", action, props);
};

// src/risp/RISP.tsx
init_shim();
var import_react20 = __toESM(require("react"));
var import_mobx_react6 = require("mobx-react");

// src/risp/RenderingEngine.tsx
init_shim();
var import_react19 = __toESM(require("react"));
var import_material18 = require("@mui/material");
_global.RenderingEngineRenderers = {};
var RenderingEngine = class {
  static register(name, renderer) {
    const old = RenderingEngineRenderers[name] || null;
    RenderingEngineRenderers[name] = renderer;
    return old;
  }
  static render(props) {
    const { element } = props;
    if (!RenderingEngineRenderers[element.type]) {
      console.error(`There is no registered renderer for type '${element.type}'.`);
      return /* @__PURE__ */ import_react19.default.createElement(import_material18.Typography, { color: "error" }, JSON.stringify(element));
    }
    return RenderingEngineRenderers[element.type](props);
  }
};

// src/risp/RISP.tsx
var import_mobx2 = require("mobx");
var import_tasenor_common10 = require("@dataplug/tasenor-common");
var RISP = (0, import_mobx_react6.observer)((rispProps) => {
  const { values, element } = rispProps;
  const prepare = (element2) => {
    if ((0, import_tasenor_common10.isNamedElement)(element2)) {
      if (values[element2.name] === void 0 && element2.defaultValue !== void 0) {
        values[element2.name] = element2.defaultValue;
      }
    }
    element2.triggerHandler = async (trigger, props) => {
      if ((0, import_tasenor_common10.isNamedElement)(element2) && "value" in trigger) {
        (0, import_mobx2.runInAction)(() => props.values[element2.name] = trigger.value);
      }
      if ((0, import_tasenor_common10.isActiveElement)(element2) && element2.actions[trigger.type]) {
        const result = await ActionEngine.handle(element2.actions[trigger.type], props);
        if (result.success && rispProps.onActionSuccess) {
          rispProps.onActionSuccess(result.result, trigger.type, props);
        }
        return result;
      }
      return ActionEngine.success(void 0);
    };
    if ((0, import_tasenor_common10.isContainerElement)(element2)) {
      for (const e of element2.elements) {
        prepare(e);
      }
    }
    if ((0, import_tasenor_common10.isCaseElement)(element2)) {
      for (const e of Object.values(element2.cases)) {
        prepare(e);
      }
    }
  };
  prepare(element);
  const ret = RenderingEngine.render(rispProps);
  if (ret === null) {
    return /* @__PURE__ */ import_react20.default.createElement(import_react20.default.Fragment, null);
  }
  return ret;
});

// src/risp/RISPProvider.tsx
init_shim();

// src/risp/CurrencySelectorElement.tsx
init_shim();
var import_react_i18next10 = require("react-i18next");
var import_material19 = require("@mui/material");
var import_react21 = __toESM(require("react"));
var CurrencySelectorRenderer = (props) => {
  const { t } = (0, import_react_i18next10.useTranslation)();
  const { element, setup, values } = props;
  const label = element.label ? element.label : t(`label-${element.name}`);
  const value = values[element.name] || "Not Selected";
  const [, setValue2] = import_react21.default.useState(value);
  const options = setup.store.catalog.getCurrencies();
  return /* @__PURE__ */ import_react21.default.createElement(
    import_material19.TextField,
    {
      select: true,
      label,
      value,
      onChange: (e) => {
        const newValue = e.target.value === "Not Selected" ? null : e.target.value;
        element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: newValue }, props);
        values[element.name] = newValue;
        setValue2(e.target.value);
      }
    },
    /* @__PURE__ */ import_react21.default.createElement(import_material19.MenuItem, { value: "Not Selected", key: "Not Selected" }, /* @__PURE__ */ import_react21.default.createElement(import_react_i18next10.Trans, null, "Select")),
    options.map((currency) => /* @__PURE__ */ import_react21.default.createElement(import_material19.MenuItem, { value: currency, key: currency }, currency))
  );
};

// src/risp/AccountElement.tsx
init_shim();
var import_react_i18next11 = require("react-i18next");
var import_react22 = __toESM(require("react"));
var AccountRenderer = (props) => {
  const { t } = (0, import_react_i18next11.useTranslation)();
  const { element, setup, values } = props;
  const label = element.label ? element.label : t(`label-${element.name}`);
  const value = values[element.name];
  const [, setValue2] = import_react22.default.useState(value);
  return /* @__PURE__ */ import_react22.default.createElement(
    AccountSelector,
    {
      label,
      value: value && setup.store.database && setup.store.database.getAccountByNumber(`${value}`) ? value : "",
      onChange: (e) => {
        element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: e || null }, props);
        values[element.name] = e || null;
        setValue2(e || null);
      },
      preferred: element.preferred,
      filter: element.filter,
      accounts: setup.store.accounts
    }
  );
};

// src/risp/TagSelectorElement.tsx
init_shim();
var import_react23 = __toESM(require("react"));
var import_tasenor_common11 = require("@dataplug/tasenor-common");
var import_material20 = require("@mui/material");
var import_react_i18next12 = require("react-i18next");
var TagsSelectorRenderer = (props) => {
  const { t } = (0, import_react_i18next12.useTranslation)();
  const { element, setup, values } = props;
  const [selected, setSelected] = import_react23.default.useState((0, import_tasenor_common11.isNamedElement)(element) ? values[element.name] || [] : []);
  const label = "label" in element ? element.label : (0, import_tasenor_common11.isNamedElement)(element) && element.name ? t(`label-${element.name}`) : "";
  let Selector = /* @__PURE__ */ import_react23.default.createElement(import_react23.default.Fragment, null);
  const tags = setup.store.db ? setup.store.dbsByName[setup.store.db].tagsByTag : {};
  const onChange = (selected2) => {
    setSelected(selected2);
    const newValue = element.single ? selected2[0] : selected2;
    element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: newValue }, props);
  };
  if ("types" in element) {
    Selector = /* @__PURE__ */ import_react23.default.createElement(
      TagGroup,
      {
        tags,
        single: !!element.single,
        types: element.types,
        onChange,
        selected
      }
    );
  } else if ("options" in element) {
    Selector = /* @__PURE__ */ import_react23.default.createElement(
      TagGroup,
      {
        tags,
        single: !!element.single,
        options: element.options,
        onChange,
        selected
      }
    );
  } else if (element.all) {
    Selector = /* @__PURE__ */ import_react23.default.createElement(
      TagGroup,
      {
        tags,
        single: !!element.single,
        options: Object.keys(tags),
        onChange,
        selected
      }
    );
  } else {
    throw new Error(`Unable to figure out how to render selector ${JSON.stringify(element)}.`);
  }
  return /* @__PURE__ */ import_react23.default.createElement(import_material20.FormGroup, null, /* @__PURE__ */ import_react23.default.createElement(import_material20.FormLabel, null, label), Selector);
};

// src/risp/RuleEditorElement.tsx
init_shim();
var import_react24 = __toESM(require("react"));
var RuleEditorRenderer = (props) => {
  const { element, setup, values } = props;
  const { lines, cashAccount, options, config } = element;
  return /* @__PURE__ */ import_react24.default.createElement(
    RuleEditor,
    {
      store: setup.store,
      config,
      lines,
      options,
      cashAccount,
      values: values[element.name],
      onChange: (newValue) => {
        element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: newValue }, props);
      },
      onContinue: () => {
        element.triggerHandler && element.triggerHandler({ type: "onContinue" }, props);
      },
      onCreateRule: () => {
        element.triggerHandler && element.triggerHandler({ type: "onCreateRule" }, props);
      }
    }
  );
};

// src/risp/SaveSettings.ts
init_shim();
var saveSettingActionHandler = async (action, props) => {
  const { values, setup } = props;
  const settings = {};
  if (action.plugin) {
    for (const [k, v] of Object.entries(values)) {
      settings[`${action.plugin}.${k}`] = v;
    }
  } else {
    Object.assign(settings, values);
  }
  await setup.store.updateSettings(action.backend ? null : setup.store.db, settings);
  return { success: true, result: void 0 };
};

// src/risp/RISPProvider.tsx
var onBlurHook;
var onFocusHook;
var RISPProvider = (props) => {
  const { onBlur, onFocus, children } = props;
  onBlurHook = onBlur;
  onFocusHook = onFocus;
  RenderingEngine.register("account", AccountRenderer);
  RenderingEngine.register("boolean", BooleanRenderer);
  RenderingEngine.register("box", BoxRenderer);
  RenderingEngine.register("button", ButtonRenderer);
  RenderingEngine.register("case", CaseRenderer);
  RenderingEngine.register("currency", CurrencySelectorRenderer);
  RenderingEngine.register("flat", FlatRenderer);
  RenderingEngine.register("html", HtmlRenderer);
  RenderingEngine.register("message", MessageRenderer);
  RenderingEngine.register("number", NumberRenderer);
  RenderingEngine.register("radio", RadioRenderer);
  RenderingEngine.register("ruleEditor", RuleEditorRenderer);
  RenderingEngine.register("tags", TagsSelectorRenderer);
  RenderingEngine.register("text", TextRenderer);
  RenderingEngine.register("textFileLine", TextFileLineRenderer);
  RenderingEngine.register("yesno", YesNoRenderer);
  ActionEngine.register("debug", debugActionHandler);
  ActionEngine.register("patch", patchActionHandler);
  ActionEngine.register("post", postActionHandler);
  ActionEngine.register("saveSettings", saveSettingActionHandler);
  if (props.onInit) {
    props.onInit();
  }
  return children;
};
RISPProvider.onBlur = () => {
  if (onBlurHook)
    onBlurHook();
};
RISPProvider.onFocus = () => {
  if (onFocusHook)
    onFocusHook();
};

// src/elements/BoxElement.tsx
var BoxRenderer = (props) => {
  const { element } = props;
  if (!(0, import_tasenor_common12.isBoxElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  return /* @__PURE__ */ import_react25.default.createElement(import_material21.Card, { variant: "outlined" }, "title" in element && /* @__PURE__ */ import_react25.default.createElement(import_material21.CardHeader, { title: element.title }), /* @__PURE__ */ import_react25.default.createElement(import_material21.CardContent, null, element.elements.map(
    (element2, idx) => /* @__PURE__ */ import_react25.default.createElement(import_material21.Box, { key: idx, sx: { mt: idx > 0 ? 1.5 : 0 } }, RenderingEngine.render({ values: props.values, setup: props.setup, element: element2 }))
  )));
};

// src/elements/ButtonElement.tsx
init_shim();
var import_react26 = __toESM(require("react"));
var import_react_i18next13 = require("react-i18next");
var import_material22 = require("@mui/material");
var import_tasenor_common13 = require("@dataplug/tasenor-common");
var ButtonRenderer = (props) => {
  const { t } = (0, import_react_i18next13.useTranslation)();
  const { element, values } = props;
  if (!(0, import_tasenor_common13.isButtonElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  const label = t(`label-${element.label}`);
  const requirements = element.requires ? typeof element.requires === "string" ? [element.requires] : element.requires : [];
  const allGood = requirements.filter((r) => !values[r]).length === 0;
  return /* @__PURE__ */ import_react26.default.createElement(
    import_material22.Button,
    {
      variant: "outlined",
      disabled: !allGood,
      onClick: () => {
        element.triggerHandler && element.triggerHandler({ type: "onClick" }, props);
      }
    },
    label
  );
};

// src/elements/CaseElement.tsx
init_shim();
var import_tasenor_common14 = require("@dataplug/tasenor-common");
var import_react27 = __toESM(require("react"));
var CaseRenderer = (props) => {
  const { element, values } = props;
  if (!(0, import_tasenor_common14.isCaseElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  const { cases, condition } = element;
  const noValue = values[condition] === void 0 || values[condition] === null;
  const defaultValue = element.defaultValue === void 0 ? void 0 : element.defaultValue;
  const selectedCase = noValue ? defaultValue : values[condition];
  const rendering = {};
  for (const [value, element2] of Object.entries(cases)) {
    rendering[value] = RenderingEngine.render({ values: props.values, setup: props.setup, element: element2 });
  }
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, Object.entries(rendering).map(
    ([value, jsx]) => /* @__PURE__ */ import_react27.default.createElement("div", { key: value, style: { display: `${value}` === `${selectedCase}` ? "block" : "none" } }, jsx)
  ));
};

// src/elements/FlatElement.tsx
init_shim();
var import_react28 = __toESM(require("react"));
var import_material23 = require("@mui/material");
var import_tasenor_common15 = require("@dataplug/tasenor-common");
var FlatRenderer = (props) => {
  const { element } = props;
  if (!(0, import_tasenor_common15.isFlatElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  return /* @__PURE__ */ import_react28.default.createElement(import_react28.default.Fragment, null, element.elements.map(
    (element2, idx) => /* @__PURE__ */ import_react28.default.createElement(import_material23.Box, { key: idx, sx: { mt: idx > 0 ? 1.5 : 0 } }, RenderingEngine.render({ values: props.values, setup: props.setup, element: element2 }))
  ));
};

// src/elements/HtmlElement.tsx
init_shim();
var import_react29 = __toESM(require("react"));
var import_material24 = require("@mui/material");
var import_tasenor_common16 = require("@dataplug/tasenor-common");
var HtmlRenderer = (props) => {
  const { element } = props;
  if (!(0, import_tasenor_common16.isHtmlElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  const { html } = element;
  return /* @__PURE__ */ import_react29.default.createElement(import_material24.Typography, { dangerouslySetInnerHTML: { __html: html } });
};

// src/elements/MessageElement.tsx
init_shim();
var import_react30 = __toESM(require("react"));
var import_material25 = require("@mui/material");
var import_tasenor_common17 = require("@dataplug/tasenor-common");
var MessageRenderer = (props) => {
  const { element } = props;
  if (!(0, import_tasenor_common17.isMessageElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  const { severity, text } = element;
  return /* @__PURE__ */ import_react30.default.createElement(import_material25.Alert, { severity }, text);
};

// src/elements/NumberElement.tsx
init_shim();
var import_react31 = __toESM(require("react"));
var import_react_i18next14 = require("react-i18next");
var import_material26 = require("@mui/material");
var import_tasenor_common18 = require("@dataplug/tasenor-common");
var NumberRenderer = (props) => {
  const { element } = props;
  const { t } = (0, import_react_i18next14.useTranslation)();
  const label = (0, import_tasenor_common18.isNumberElement)(element) && element.label ? element.label : (0, import_tasenor_common18.isNamedElement)(element) && element.name ? t(`label-${element.name}`) : "";
  const [value, setValue2] = import_react31.default.useState((0, import_tasenor_common18.isNamedElement)(element) ? props.values[element.name] || null : null);
  if (!(0, import_tasenor_common18.isNumberElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  if (props.values[element.name] !== value) {
    setValue2(props.values[element.name]);
  }
  return /* @__PURE__ */ import_react31.default.createElement(
    import_material26.TextField,
    {
      label,
      value,
      type: "number",
      error: false,
      autoFocus: true,
      InputProps: {
        endAdornment: /* @__PURE__ */ import_react31.default.createElement(import_material26.InputAdornment, { position: "end" }, element.unit || "")
      },
      onChange: (e) => {
        const value2 = e.target.value === "" ? null : parseFloat(e.target.value);
        setValue2(value2);
        element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: value2 }, props);
      },
      onFocus: () => RISPProvider.onFocus(),
      onBlur: () => RISPProvider.onBlur(),
      onKeyPress: () => null,
      onKeyUp: () => null,
      onKeyDown: () => null
    }
  );
};

// src/elements/RadioElement.tsx
init_shim();
var import_react32 = __toESM(require("react"));
var import_react_i18next15 = require("react-i18next");
var import_material27 = require("@mui/material");
var import_tasenor_common19 = require("@dataplug/tasenor-common");
var RadioRenderer = (props) => {
  const { element } = props;
  const { t } = (0, import_react_i18next15.useTranslation)();
  const label = (0, import_tasenor_common19.isRadioElement)(element) && element.label ? element.label : (0, import_tasenor_common19.isNamedElement)(element) && element.name ? t(`label-${element.name}`) : "";
  const [value, setValue2] = import_react32.default.useState((0, import_tasenor_common19.isNamedElement)(element) ? props.values[element.name] || "" : "");
  if (!(0, import_tasenor_common19.isRadioElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  return /* @__PURE__ */ import_react32.default.createElement(import_material27.FormControl, { component: "fieldset" }, /* @__PURE__ */ import_react32.default.createElement(import_material27.FormLabel, { component: "legend" }, label), /* @__PURE__ */ import_react32.default.createElement(import_material27.RadioGroup, null, Object.entries(element.options).map(
    ([k, v]) => /* @__PURE__ */ import_react32.default.createElement(
      import_material27.FormControlLabel,
      {
        key: k,
        value: v,
        control: /* @__PURE__ */ import_react32.default.createElement(import_material27.Radio, null),
        label: k,
        checked: value === v,
        onChange: () => {
          setValue2(v);
          element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: v }, props);
        }
      }
    )
  )));
};

// src/elements/TextElement.tsx
init_shim();
var import_react33 = __toESM(require("react"));
var import_react_i18next16 = require("react-i18next");
var import_material28 = require("@mui/material");
var import_tasenor_common20 = require("@dataplug/tasenor-common");
var TextRenderer = (props) => {
  const { element } = props;
  const { t } = (0, import_react_i18next16.useTranslation)();
  const label = (0, import_tasenor_common20.isTextElement)(element) && element.label ? element.label : (0, import_tasenor_common20.isNamedElement)(element) && element.name ? t(`label-${element.name}`) : "";
  const [value, setValue2] = import_react33.default.useState((0, import_tasenor_common20.isNamedElement)(element) ? props.values[element.name] || "" : "");
  if (!(0, import_tasenor_common20.isTextElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  if (props.values[element.name] !== value) {
    setValue2(props.values[element.name]);
  }
  return /* @__PURE__ */ import_react33.default.createElement(
    import_material28.TextField,
    {
      label,
      name: element.name,
      value: value || "",
      error: false,
      autoFocus: true,
      fullWidth: true,
      onChange: (e) => {
        setValue2(e.target.value);
        element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: e.target.value }, props);
      },
      onFocus: () => RISPProvider.onFocus(),
      onBlur: () => RISPProvider.onBlur(),
      onKeyPress: () => null,
      onKeyUp: () => null,
      onKeyDown: () => null
    }
  );
};

// src/elements/TextFileLineElement.tsx
init_shim();
var import_react51 = __toESM(require("react"));
var import_material40 = require("@mui/material");
var import_react_i18next26 = require("react-i18next");
var import_tasenor_common24 = require("@dataplug/tasenor-common");

// src/process/index.ts
init_shim();

// src/process/ConfigChangeView.tsx
init_shim();
var import_tasenor_common21 = require("@dataplug/tasenor-common");
var import_react35 = __toESM(require("react"));
var import_react_i18next18 = require("react-i18next");

// src/process/ConfigView.tsx
init_shim();
var import_react34 = __toESM(require("react"));
var import_material29 = require("@mui/material");
var import_react_i18next17 = require("react-i18next");
var IGNORE_FIELDS = /^(answers|rules)$/;
var ConfigView = (props) => {
  const COLUMNS = props.columns || 4;
  const ignore = props.ignore || /^$/;
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const render = (obj) => {
    let keys, perColumn, idx, column;
    switch (typeof obj) {
      case "undefined":
        return /* @__PURE__ */ import_react34.default.createElement(import_react34.default.Fragment, null, "\u2014");
      case "object":
        if (obj === null) {
          return /* @__PURE__ */ import_react34.default.createElement(import_react34.default.Fragment, null, "\u2014");
        }
        if (obj instanceof Array) {
          const values = Object.values(obj);
          return /* @__PURE__ */ import_react34.default.createElement(import_react34.default.Fragment, null, values.map(
            (v, i) => /* @__PURE__ */ import_react34.default.createElement(import_react34.default.Fragment, { key: `array${i}` }, render(v), i < values.length - 1 ? ", " : "")
          ));
        }
        keys = Object.keys(obj).filter((k) => !IGNORE_FIELDS.test(k) && !ignore.test(k)).sort();
        perColumn = Math.ceil(keys.length / COLUMNS);
        idx = 0;
        column = [];
        for (let c = 0; c < COLUMNS; c++) {
          const row = [];
          for (let r = 0; r < perColumn; r++) {
            if (idx < keys.length) {
              row.push(/* @__PURE__ */ import_react34.default.createElement(import_react34.default.Fragment, { key: idx }, /* @__PURE__ */ import_react34.default.createElement("div", null, /* @__PURE__ */ import_react34.default.createElement("strong", null, capitalize(keys[idx]))), /* @__PURE__ */ import_react34.default.createElement("div", null, render(obj[keys[idx]]))));
            }
            idx++;
          }
          column.push(/* @__PURE__ */ import_react34.default.createElement(import_material29.Grid, { key: `column${c}`, item: true }, row));
        }
        return /* @__PURE__ */ import_react34.default.createElement(import_material29.Box, { sx: { flexGrow: 1 } }, /* @__PURE__ */ import_react34.default.createElement(import_material29.Grid, { container: true, justifyContent: "space-evenly", spacing: 4 }, column));
      case "string":
        return /* @__PURE__ */ import_react34.default.createElement(import_react34.default.Fragment, null, obj === "" ? /* @__PURE__ */ import_react34.default.createElement("br", null) : obj);
      case "boolean":
        return obj ? /* @__PURE__ */ import_react34.default.createElement(import_react_i18next17.Trans, null, "Yes") : /* @__PURE__ */ import_react34.default.createElement(import_react_i18next17.Trans, null, "No");
      default:
        return /* @__PURE__ */ import_react34.default.createElement(import_react34.default.Fragment, null, JSON.stringify(obj));
    }
  };
  return /* @__PURE__ */ import_react34.default.createElement(import_react34.default.Fragment, null, props.title && /* @__PURE__ */ import_react34.default.createElement(import_material29.Typography, { variant: "subtitle1" }, /* @__PURE__ */ import_react34.default.createElement(import_react_i18next17.Trans, null, props.title)), render(props.config));
};

// src/process/ConfigChangeView.tsx
var ConfigChangeView = (props) => {
  const { t } = (0, import_react_i18next18.useTranslation)();
  if (!props.step.directions || props.step.directions.type !== "ui") {
    return /* @__PURE__ */ import_react35.default.createElement(import_react35.default.Fragment, null);
  }
  if (!props.step.action || !props.step.action.configure) {
    return /* @__PURE__ */ import_react35.default.createElement(import_react35.default.Fragment, null);
  }
  const names = [...(0, import_tasenor_common21.elementNames)(props.step.directions.element)].sort();
  const changes = {};
  for (let name of names) {
    if (name.startsWith("configure.")) {
      name = name.substr(10);
      changes[name] = props.step.action.configure[name];
    }
  }
  return /* @__PURE__ */ import_react35.default.createElement(ConfigView, { ignore: /^_/, title: t("Configured the Following"), config: changes });
};

// src/process/ConfigJSONView.tsx
init_shim();
var import_react36 = __toESM(require("react"));
var import_material30 = require("@mui/material");
var import_react_i18next19 = require("react-i18next");
var ConfigJSONView = (props) => {
  const config = {};
  Object.keys(props.config).forEach((key) => {
    if (!IGNORE_FIELDS.test(key)) {
      config[key] = props.config[key];
    }
  });
  return /* @__PURE__ */ import_react36.default.createElement(import_react36.default.Fragment, null, props.title && /* @__PURE__ */ import_react36.default.createElement(import_material30.Typography, { variant: "subtitle1" }, /* @__PURE__ */ import_react36.default.createElement(import_react_i18next19.Trans, null, props.title)), /* @__PURE__ */ import_react36.default.createElement(import_material30.Box, { sx: { fontFamily: "monospace" } }, /* @__PURE__ */ import_react36.default.createElement("pre", null, JSON.stringify(config, null, 2))));
};

// src/process/DefaultErrorView.tsx
init_shim();
var import_material31 = require("@mui/material");
var import_react37 = __toESM(require("react"));
var import_react_i18next20 = require("react-i18next");
var DefaultErrorView = (props) => {
  const { palette } = (0, import_material31.useTheme)();
  return /* @__PURE__ */ import_react37.default.createElement(import_material31.Card, { style: { backgroundColor: "rgba(0,0,0,0.05)" } }, /* @__PURE__ */ import_react37.default.createElement(import_material31.CardHeader, { style: { color: palette.error.main }, title: /* @__PURE__ */ import_react37.default.createElement(import_react_i18next20.Trans, null, "Error") }), /* @__PURE__ */ import_react37.default.createElement(import_material31.CardContent, { sx: { fontFamily: "monospace" } }, /* @__PURE__ */ import_react37.default.createElement(import_material31.Typography, null, props.error.split("\n").map((line, idx) => /* @__PURE__ */ import_react37.default.createElement(import_react37.default.Fragment, { key: idx }, line, /* @__PURE__ */ import_react37.default.createElement("br", null))))));
};

// src/process/DefaultResultView.tsx
init_shim();
var import_react38 = __toESM(require("react"));
var DefaultResultView = (props) => {
  if (props.result === null) {
    return /* @__PURE__ */ import_react38.default.createElement(import_react38.default.Fragment, null);
  }
  return /* @__PURE__ */ import_react38.default.createElement("pre", null, JSON.stringify(props.result, null, 2));
};

// src/process/DefaultStateView.tsx
init_shim();
var import_react39 = __toESM(require("react"));
var DefaultStateView = (props) => {
  if (props.state === null) {
    return /* @__PURE__ */ import_react39.default.createElement(import_react39.default.Fragment, null);
  }
  const ResultView = props.resultView;
  return /* @__PURE__ */ import_react39.default.createElement(import_react39.default.Fragment, null, /* @__PURE__ */ import_react39.default.createElement("pre", null, JSON.stringify(props.state, null, 2)), props.state.result && /* @__PURE__ */ import_react39.default.createElement(ResultView, { config: props.config, result: props.state.result }));
};

// src/process/DefaultStepView.tsx
init_shim();
var import_react41 = __toESM(require("react"));

// src/process/DefaultSummaryView.tsx
init_shim();
var import_material32 = require("@mui/material");
var import_react40 = __toESM(require("react"));
var import_react_i18next21 = require("react-i18next");
var import_icons_material3 = require("@mui/icons-material");
var DefaultSummaryView = (props) => {
  const { step } = props;
  const { t } = (0, import_react_i18next21.useTranslation)();
  const [showConfig, setShowConfig] = (0, import_react40.useState)(false);
  const started = new Date(step.started).getTime();
  const finished = new Date(step.finished).getTime();
  const UsedConfigView = props.configView || ConfigView;
  return /* @__PURE__ */ import_react40.default.createElement(import_react40.default.Fragment, null, /* @__PURE__ */ import_react40.default.createElement(import_material32.Typography, { variant: "body2" }, /* @__PURE__ */ import_react40.default.createElement(import_react40.default.Fragment, null, /* @__PURE__ */ import_react40.default.createElement(import_react_i18next21.Trans, null, /* @__PURE__ */ import_react40.default.createElement("strong", null, "Process ID")), ": ", step.processId, "\xA0", /* @__PURE__ */ import_react40.default.createElement(import_react_i18next21.Trans, null, /* @__PURE__ */ import_react40.default.createElement("strong", null, "Step")), ": ", step.number + 1, "\xA0", /* @__PURE__ */ import_react40.default.createElement(import_react_i18next21.Trans, null, /* @__PURE__ */ import_react40.default.createElement("strong", null, "Handler")), ": ", step.handler, "\xA0", /* @__PURE__ */ import_react40.default.createElement(import_react_i18next21.Trans, null, /* @__PURE__ */ import_react40.default.createElement("strong", null, "Started")), ": ", step.started, "\xA0", /* @__PURE__ */ import_react40.default.createElement(import_react_i18next21.Trans, null, /* @__PURE__ */ import_react40.default.createElement("strong", null, "Duration")), ": ", finished ? `${finished - started}ms ` : "\u2014 ", /* @__PURE__ */ import_react40.default.createElement(
    import_material32.ToggleButton,
    {
      size: "small",
      value: "showConfig",
      selected: showConfig,
      title: showConfig ? t("Hide configuration") : t("Show configuration"),
      onClick: () => setShowConfig(!showConfig)
    },
    /* @__PURE__ */ import_react40.default.createElement(import_icons_material3.Settings, null)
  ))), showConfig && /* @__PURE__ */ import_react40.default.createElement(import_material32.Card, { style: { marginBottom: "0.5em" } }, /* @__PURE__ */ import_react40.default.createElement(import_material32.CardContent, null, /* @__PURE__ */ import_react40.default.createElement(UsedConfigView, { title: t("Configuration"), config: props.process.config }))));
};

// src/process/DefaultStepView.tsx
var DefaultStepView = (props) => {
  const { step } = props;
  if (!step) {
    return /* @__PURE__ */ import_react41.default.createElement(import_react41.default.Fragment, null);
  }
  const SummaryView = props.summaryView || DefaultSummaryView;
  const StateView = props.stateView || DefaultStateView;
  const ResultView = props.resultView || DefaultResultView;
  const configView = props.configView || ConfigView;
  return /* @__PURE__ */ import_react41.default.createElement("div", null, /* @__PURE__ */ import_react41.default.createElement(SummaryView, { step, process: props.process, configView }), step.state && /* @__PURE__ */ import_react41.default.createElement(StateView, { config: props.process.config, state: step.state, resultView: ResultView }));
};

// src/process/DefaultSuccessView.tsx
init_shim();
var import_material33 = require("@mui/material");
var import_colors = require("@mui/material/colors");
var import_react42 = __toESM(require("react"));
var import_react_i18next22 = require("react-i18next");
var DefaultSuccessView = (props) => {
  return /* @__PURE__ */ import_react42.default.createElement(import_material33.Card, null, /* @__PURE__ */ import_react42.default.createElement(import_material33.CardContent, null, /* @__PURE__ */ import_react42.default.createElement(ProcessStatusIcon, { status: "SUCCEEDED" }), /* @__PURE__ */ import_react42.default.createElement(import_material33.Typography, { sx: { color: import_colors.green[900] } }, /* @__PURE__ */ import_react42.default.createElement(import_react_i18next22.Trans, null, "Process Was Successfully Completed!"))));
};

// src/process/ImportFile.tsx
init_shim();
var import_icons_material4 = require("@mui/icons-material");
var import_material34 = require("@mui/material");
var import_react43 = __toESM(require("react"));
var ImportLine = (props) => {
  const { segmentId, lineNumber, color, text, columns } = props;
  const ResultView = props.resultView;
  const hasColumns = Object.keys(columns).length > 0;
  const [open, setOpen] = (0, import_react43.useState)(false);
  if (text.trim() === "") {
    return /* @__PURE__ */ import_react43.default.createElement(import_react43.default.Fragment, null);
  }
  return /* @__PURE__ */ import_react43.default.createElement(import_react43.default.Fragment, null, /* @__PURE__ */ import_react43.default.createElement(import_material34.TableRow, { onClick: () => setOpen(!open) }, /* @__PURE__ */ import_react43.default.createElement(import_material34.TableCell, null, lineNumber), /* @__PURE__ */ import_react43.default.createElement(import_material34.TableCell, { style: { backgroundColor: color } }), /* @__PURE__ */ import_react43.default.createElement(import_material34.TableCell, null, /* @__PURE__ */ import_react43.default.createElement(import_material34.Typography, { sx: { fontFamily: "Monospace", overflow: "hidden", textOverflow: "hidden", fontSize: "80%" } }, text)), /* @__PURE__ */ import_react43.default.createElement(import_material34.TableCell, null, hasColumns && !open && /* @__PURE__ */ import_react43.default.createElement(import_material34.IconButton, { size: "small", onClick: () => setOpen(true) }, /* @__PURE__ */ import_react43.default.createElement(import_icons_material4.ExpandMore, null)), hasColumns && open && /* @__PURE__ */ import_react43.default.createElement(import_material34.IconButton, { size: "small", onClick: () => setOpen(false) }, /* @__PURE__ */ import_react43.default.createElement(import_icons_material4.ExpandLess, null)))), open && hasColumns && /* @__PURE__ */ import_react43.default.createElement(import_material34.TableRow, null, /* @__PURE__ */ import_react43.default.createElement(import_material34.TableCell, null), /* @__PURE__ */ import_react43.default.createElement(import_material34.TableCell, null), /* @__PURE__ */ import_react43.default.createElement(import_material34.TableCell, null, segmentId && /* @__PURE__ */ import_react43.default.createElement(import_material34.Link, { href: `#segment-${segmentId}` }, /* @__PURE__ */ import_react43.default.createElement(import_material34.Typography, { style: { color: "white", backgroundColor: color } }, "Segment ID: ", segmentId)), /* @__PURE__ */ import_react43.default.createElement(ConfigView, { ignore: /^_/, config: columns })), /* @__PURE__ */ import_react43.default.createElement(import_material34.TableCell, null)), props.result && /* @__PURE__ */ import_react43.default.createElement(import_material34.TableRow, null, /* @__PURE__ */ import_react43.default.createElement(import_material34.TableCell, null), /* @__PURE__ */ import_react43.default.createElement(import_material34.TableCell, null), /* @__PURE__ */ import_react43.default.createElement(import_material34.TableCell, { id: props.result ? `segment-${segmentId}` : void 0 }, /* @__PURE__ */ import_react43.default.createElement(ResultView, { config: props.config, result: props.result })), /* @__PURE__ */ import_react43.default.createElement(import_material34.TableCell, null)));
};
var ImportFile = (props) => {
  const [expanded, setExpanded] = import_react43.default.useState(false);
  const { palette } = (0, import_material34.useTheme)();
  const colors = [
    palette.primary.dark,
    palette.secondary.light,
    palette.primary.main,
    palette.secondary.dark,
    palette.primary.light,
    palette.secondary.main
  ];
  const segmentIds = /* @__PURE__ */ new Set();
  const segementNumbers = {};
  return /* @__PURE__ */ import_react43.default.createElement(import_material34.Accordion, { expanded, onChange: () => setExpanded(!expanded), TransitionProps: { timeout: 50 } }, /* @__PURE__ */ import_react43.default.createElement(import_material34.AccordionSummary, { expandIcon: /* @__PURE__ */ import_react43.default.createElement(import_icons_material4.ExpandMore, null), id: `File ${props.name}` }, /* @__PURE__ */ import_react43.default.createElement(import_material34.Typography, { variant: "subtitle1" }, /* @__PURE__ */ import_react43.default.createElement("strong", null, props.name))), /* @__PURE__ */ import_react43.default.createElement(import_material34.AccordionDetails, null, /* @__PURE__ */ import_react43.default.createElement(import_material34.TableContainer, { component: import_material34.Paper, sx: { width: "60vw" } }, /* @__PURE__ */ import_react43.default.createElement(import_material34.Table, { size: "small" }, /* @__PURE__ */ import_react43.default.createElement(import_material34.TableBody, null, props.lines.map((line, idx) => {
    let color;
    if (line.segmentId) {
      if (segementNumbers[line.segmentId] === void 0) {
        segementNumbers[line.segmentId] = segmentIds.size;
        segmentIds.add(line.segmentId);
      }
      color = colors[segementNumbers[line.segmentId] % colors.length];
    }
    const isLast = idx === props.lines.length - 1 || line.segmentId !== props.lines[idx + 1].segmentId;
    return /* @__PURE__ */ import_react43.default.createElement(
      ImportLine,
      {
        key: line.line,
        config: props.config,
        segmentId: line.segmentId,
        result: isLast && line.segmentId && props.result ? props.result[line.segmentId] : void 0,
        resultView: props.resultView,
        lineNumber: line.line + 1,
        columns: line.columns,
        color,
        text: line.text
      }
    );
  }))))));
};

// src/process/ImportStateView.tsx
init_shim();
var import_react44 = __toESM(require("react"));
var import_tasenor_common22 = require("@dataplug/tasenor-common");
var ImportStateView = (props) => {
  if (props.state === null) {
    return /* @__PURE__ */ import_react44.default.createElement(import_react44.default.Fragment, null);
  }
  if (!(0, import_tasenor_common22.isImportState)(props.state)) {
    return /* @__PURE__ */ import_react44.default.createElement(import_react44.default.Fragment, null);
  }
  const state = props.state;
  const result = state.result ? state.result : void 0;
  return /* @__PURE__ */ import_react44.default.createElement("div", null, Object.entries(state.files).map(([name, file]) => /* @__PURE__ */ import_react44.default.createElement(
    ImportFile,
    {
      key: name,
      name,
      config: props.config,
      resultView: props.resultView,
      result,
      lines: file.lines
    }
  )));
};

// src/process/ProcessList.tsx
init_shim();
var import_material37 = require("@mui/material");
var import_react48 = __toESM(require("react"));
var import_react_i18next24 = require("react-i18next");

// src/misc/index.ts
init_shim();

// src/misc/downloader.ts
init_shim();
var downloadUrl = (url, token, fileName) => {
  const headers = token ? { Authorization: "Bearer " + token } : {};
  fetch(url, {
    method: "GET",
    headers: new Headers(headers)
  }).then((response) => {
    const disposition = response.headers.get("Content-Disposition");
    if (disposition && !fileName) {
      const match = /^.*?filename="(.*)"$/.exec(disposition);
      if (match) {
        fileName = match[1];
      }
    }
    return response.blob();
  }).then((blob) => {
    const url2 = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url2;
    a.target = "_blank";
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
};

// src/misc/FileUploader.tsx
init_shim();
var import_react45 = __toESM(require("react"));
var import_axios2 = __toESM(require_axios2());
var import_base64_arraybuffer = require("base64-arraybuffer");
var import_material35 = require("@mui/material");
var import_react_i18next23 = require("react-i18next");
var import_icons_material5 = require("@mui/icons-material");
var FileUploader = (props) => {
  const [uploading, setUploading] = (0, import_react45.useState)(false);
  let uploads = [];
  const readFileFromInput = async (file) => {
    return new Promise(function(resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(file);
    });
  };
  const collectUploadedFile = (binary, file) => {
    uploads.push({
      name: file.name,
      type: file.type,
      encoding: "base64",
      data: (0, import_base64_arraybuffer.encode)(binary)
    });
  };
  const onUpload = async () => {
    if (props.onUpload) {
      props.onUpload(uploads);
    } else {
      if (!props.uploadUrl) {
        throw new Error("Upload URL is compulsory if no onUpload() callback defined.");
      }
      setUploading(true);
      await import_axios2.default.post(props.uploadUrl, { files: uploads }).then((resp) => {
        setUploading(false);
        props.onSuccess && props.onSuccess(resp);
      }).catch((err) => {
        setUploading(false);
        if (props.onError) {
          props.onError(err);
        } else {
          console.error(err);
        }
      });
    }
  };
  const onFileChange = async (event) => {
    uploads = [];
    if (event.target.files) {
      for (const file of Array.from(event.target.files)) {
        const binary = await readFileFromInput(file).catch(function(reason) {
          console.log(`Error during upload ${reason}`);
          return null;
        });
        if (binary) {
          collectUploadedFile(binary, file);
        }
        event.target.value = "";
      }
    }
    onUpload();
  };
  const noIcon = props.icon !== void 0 && !props.icon;
  const noText = props.text !== void 0 && !props.text;
  const text = props.text || /* @__PURE__ */ import_react45.default.createElement(import_react_i18next23.Trans, null, "Upload");
  const iconSx = props.iconSize ? { width: props.iconSize, height: props.iconSize } : {};
  const icon = noIcon ? void 0 : props.icon || /* @__PURE__ */ import_react45.default.createElement(import_icons_material5.UploadFile, { sx: iconSx });
  return /* @__PURE__ */ import_react45.default.createElement(import_react45.default.Fragment, null, /* @__PURE__ */ import_react45.default.createElement("input", { id: "file-uploader-input", disabled: !!props.disabled, type: "file", multiple: !!props.multiple, hidden: true, onChange: (e) => onFileChange(e) }), /* @__PURE__ */ import_react45.default.createElement("label", { htmlFor: "file-uploader-input" }, noText && /* @__PURE__ */ import_react45.default.createElement(import_material35.Button, { component: "span", disabled: uploading || !!props.disabled, color: props.color }, icon), !noText && /* @__PURE__ */ import_react45.default.createElement(import_material35.Button, { component: "span", disabled: uploading || !!props.disabled, startIcon: icon, color: props.color, variant: props.variant }, text)));
};

// src/misc/useAxios.ts
init_shim();
var import_react46 = require("react");
var import_axios3 = __toESM(require_axios2());
function useAxios(props) {
  const { token, url, receiver } = props;
  (0, import_react46.useEffect)(() => {
    if (url === null) {
      receiver(null);
      return;
    }
    let gone = false;
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    (0, import_axios3.default)({ method: "GET", url, headers }).then((resp) => !gone && receiver(resp.data)).catch((err) => console.error("Axios:", err));
    return () => {
      gone = true;
    };
  }, [token, url]);
}

// src/process/ProcessStatusIcon.tsx
init_shim();
var import_react47 = __toESM(require("react"));
var import_icons_material6 = require("@mui/icons-material");
var import_material36 = require("@mui/material");
var import_colors2 = require("@mui/material/colors");
var ProcessStatusIcon = (props) => {
  const colors = {
    red: import_colors2.red[700],
    blue: import_colors2.blue[900],
    green: import_colors2.green[800]
  };
  switch (props.status) {
    case "FAILED":
      return /* @__PURE__ */ import_react47.default.createElement(import_material36.Typography, { title: props.status, style: { color: colors.red } }, /* @__PURE__ */ import_react47.default.createElement(import_icons_material6.ErrorOutline, null));
    case "WAITING":
      return /* @__PURE__ */ import_react47.default.createElement(import_material36.Typography, { title: props.status, style: { color: colors.blue } }, /* @__PURE__ */ import_react47.default.createElement(import_icons_material6.Timer, null));
    case "SUCCEEDED":
      return /* @__PURE__ */ import_react47.default.createElement(import_material36.Typography, { title: props.status, style: { color: colors.green } }, /* @__PURE__ */ import_react47.default.createElement(import_icons_material6.CheckCircleOutline, null));
    case "CRASHED":
      return /* @__PURE__ */ import_react47.default.createElement(import_material36.Typography, { title: props.status, style: { color: colors.red } }, /* @__PURE__ */ import_react47.default.createElement(import_icons_material6.Warning, null));
    case "INCOMPLETE":
      return /* @__PURE__ */ import_react47.default.createElement(import_material36.Typography, { title: props.status, style: { color: colors.blue } }, /* @__PURE__ */ import_react47.default.createElement(import_icons_material6.HourglassEmpty, null));
  }
  return /* @__PURE__ */ import_react47.default.createElement(import_material36.Typography, { title: props.status, style: { color: colors.red } }, /* @__PURE__ */ import_react47.default.createElement(import_icons_material6.Help, null));
};

// src/process/ProcessList.tsx
var ProcessList = (props) => {
  const [processes, setProcesses] = (0, import_react48.useState)([]);
  useAxios({ url: `${props.api}`, token: props.token, receiver: setProcesses });
  return /* @__PURE__ */ import_react48.default.createElement(import_material37.TableContainer, null, /* @__PURE__ */ import_react48.default.createElement(import_material37.Table, { className: "ProcessTable", size: "small" }, /* @__PURE__ */ import_react48.default.createElement(import_material37.TableHead, null, /* @__PURE__ */ import_react48.default.createElement(import_material37.TableRow, null, /* @__PURE__ */ import_react48.default.createElement(import_material37.TableCell, { variant: "head", align: "left" }, /* @__PURE__ */ import_react48.default.createElement(import_react_i18next24.Trans, null, "#")), /* @__PURE__ */ import_react48.default.createElement(import_material37.TableCell, { variant: "head", align: "left" }, /* @__PURE__ */ import_react48.default.createElement(import_react_i18next24.Trans, null, "Date")), /* @__PURE__ */ import_react48.default.createElement(import_material37.TableCell, { variant: "head", align: "left" }, /* @__PURE__ */ import_react48.default.createElement(import_react_i18next24.Trans, null, "Process Name")), /* @__PURE__ */ import_react48.default.createElement(import_material37.TableCell, { variant: "head", align: "left" }, /* @__PURE__ */ import_react48.default.createElement(import_react_i18next24.Trans, null, "Status")))), /* @__PURE__ */ import_react48.default.createElement(import_material37.TableBody, null, processes.map((process2) => /* @__PURE__ */ import_react48.default.createElement(import_material37.TableRow, { key: process2.id, onClick: () => {
    props.onClick && props.onClick(process2.id);
  } }, /* @__PURE__ */ import_react48.default.createElement(import_material37.TableCell, null, process2.id), /* @__PURE__ */ import_react48.default.createElement(import_material37.TableCell, null, `${process2.created}`), /* @__PURE__ */ import_react48.default.createElement(import_material37.TableCell, null, process2.name), /* @__PURE__ */ import_react48.default.createElement(import_material37.TableCell, null, /* @__PURE__ */ import_react48.default.createElement(ProcessStatusIcon, { status: process2.status })))))));
};

// src/process/ProcessView.tsx
init_shim();
var import_material39 = require("@mui/material");
var import_react50 = __toESM(require("react"));
var import_react_i18next25 = require("react-i18next");

// src/process/StepList.tsx
init_shim();
var import_material38 = require("@mui/material");
var import_react49 = __toESM(require("react"));
var StepList = (props) => {
  return /* @__PURE__ */ import_react49.default.createElement(import_material38.Stepper, { activeStep: props.currentStep || 0 }, props.operations.map((label, idx) => /* @__PURE__ */ import_react49.default.createElement(import_material38.Step, { key: idx }, /* @__PURE__ */ import_react49.default.createElement(import_material38.StepLabel, { onClick: () => props.onChangeStep(idx) }, label))));
};

// src/process/ProcessView.tsx
var import_tasenor_common23 = require("@dataplug/tasenor-common");
var import_icons_material7 = require("@mui/icons-material");
var actionStepLabel = (action) => {
  if (action === null) {
    return "";
  }
  if ((0, import_tasenor_common23.isImportOpAction)(action)) {
    return action.op;
  }
  if ((0, import_tasenor_common23.isImportConfigureAction)(action)) {
    return "configuring";
  }
  if ((0, import_tasenor_common23.isImportAnswerAction)(action)) {
    return "answer";
  }
  return JSON.stringify(action);
};
var ProcessView = (props) => {
  const { summaryView, stateView, resultView, configView } = props;
  const theme = (0, import_material39.useTheme)();
  const { t } = (0, import_react_i18next25.useTranslation)();
  const [process2, setProcess] = (0, import_react50.useState)(null);
  const [step, setStep] = (0, import_react50.useState)(null);
  let currentStep;
  if (props.step !== void 0 && props.step !== null) {
    currentStep = props.step;
  }
  if (process2 && (currentStep === null || currentStep === void 0)) {
    currentStep = process2.currentStep !== void 0 ? process2.currentStep : 0;
  }
  useAxios({
    url: `${props.api}/${props.id}${currentStep !== void 0 ? `?step=${currentStep}` : ""}`,
    token: props.token,
    receiver: setProcess
  });
  useAxios({
    url: currentStep === void 0 ? null : `${props.api}/${props.id}/step/${currentStep}`,
    token: props.token,
    receiver: setStep
  });
  if (!process2)
    return /* @__PURE__ */ import_react50.default.createElement(import_react50.default.Fragment, null);
  const canChangeStep = process2.currentStep !== void 0 && process2.currentStep !== null && process2.steps && process2.steps.length > 1;
  const hasSteps = process2.currentStep !== void 0 && process2.steps.length > 0;
  const lastStep = currentStep !== void 0 && process2.steps.length > 0 && currentStep === process2.steps.length - 1;
  const directions = currentStep !== void 0 && process2.steps[currentStep] ? process2.steps[currentStep].directions || {} : {};
  const needAnswers = hasSteps && process2.status === "WAITING" && !process2.error && currentStep === process2.steps.length - 1 && directions.type === "ui";
  const wasConfigured = !!(currentStep !== void 0 && currentStep > 0 && process2.steps[currentStep - 1] && process2.steps[currentStep - 1].directions && directions.type === "ui");
  const onChangeStep = (n) => {
    props.onChangeStep && props.onChangeStep(n);
  };
  const onBack = () => {
    props.onBack && props.onBack();
  };
  const onActionSuccess = (result, trigger, actionProps) => {
    if (props.onActionSuccess) {
      props.onActionSuccess(result, trigger, actionProps);
    }
  };
  const StepView = props.stepView || DefaultStepView;
  const ErrorView = props.errorView || DefaultErrorView;
  const SuccessView = props.successView || DefaultSuccessView;
  const operations = ["start"].concat(
    process2.steps.filter((step2) => step2.action).map((step2) => actionStepLabel(step2.action))
  ).map((label) => t(`step-${label}`));
  const values = {};
  Object.keys(process2.config).forEach((key) => {
    values[`configure.${key}`] = process2.config[key];
  });
  return /* @__PURE__ */ import_react50.default.createElement(import_material39.TableContainer, null, /* @__PURE__ */ import_react50.default.createElement(import_material39.Table, { className: "ProcessTable", size: "small" }, /* @__PURE__ */ import_react50.default.createElement(import_material39.TableHead, null, /* @__PURE__ */ import_react50.default.createElement(import_material39.TableRow, { style: { backgroundColor: theme.palette.secondary.main } }, /* @__PURE__ */ import_react50.default.createElement(import_material39.TableCell, { variant: "head", style: { color: theme.palette.secondary.contrastText } }, /* @__PURE__ */ import_react50.default.createElement(import_material39.IconButton, { onClick: () => onBack() }, /* @__PURE__ */ import_react50.default.createElement(import_icons_material7.ArrowBackOutlined, { style: { color: theme.palette.secondary.contrastText } })), "# ", process2.id), /* @__PURE__ */ import_react50.default.createElement(import_material39.TableCell, { variant: "head", style: { color: theme.palette.secondary.contrastText }, align: "left" }), /* @__PURE__ */ import_react50.default.createElement(import_material39.TableCell, { variant: "head", style: { color: theme.palette.secondary.contrastText }, align: "left" }, `${process2.created}`), /* @__PURE__ */ import_react50.default.createElement(import_material39.TableCell, { variant: "head", style: { color: theme.palette.secondary.contrastText }, align: "left" }, process2.name), /* @__PURE__ */ import_react50.default.createElement(import_material39.TableCell, { variant: "head", style: { backgroundColor: "white" }, align: "right" }, /* @__PURE__ */ import_react50.default.createElement(ProcessStatusIcon, { status: process2.status })))), /* @__PURE__ */ import_react50.default.createElement(import_material39.TableBody, null, /* @__PURE__ */ import_react50.default.createElement(import_material39.TableRow, null, /* @__PURE__ */ import_react50.default.createElement(import_material39.TableCell, { colSpan: 2 }, /* @__PURE__ */ import_react50.default.createElement(import_material39.Typography, null, /* @__PURE__ */ import_react50.default.createElement(
    import_material39.Fab,
    {
      disabled: !canChangeStep || currentStep === 0,
      color: "secondary",
      "aria-label": "previous",
      onClick: () => onChangeStep(currentStep !== void 0 ? currentStep - 1 : 0)
    },
    /* @__PURE__ */ import_react50.default.createElement(import_icons_material7.NavigateBefore, null)
  ), /* @__PURE__ */ import_react50.default.createElement(
    import_material39.Fab,
    {
      disabled: true,
      style: { fontSize: "140%", color: "black", fontWeight: "bold" }
    },
    canChangeStep ? (currentStep || 0) + 1 : /* @__PURE__ */ import_react50.default.createElement(import_react50.default.Fragment, null, "\u2014")
  ), /* @__PURE__ */ import_react50.default.createElement(
    import_material39.Fab,
    {
      disabled: !canChangeStep || currentStep === process2.steps.length - 1,
      color: "secondary",
      "aria-label": "next",
      onClick: () => onChangeStep(currentStep !== void 0 ? currentStep + 1 : 0)
    },
    /* @__PURE__ */ import_react50.default.createElement(import_icons_material7.NavigateNext, null)
  ))), /* @__PURE__ */ import_react50.default.createElement(import_material39.TableCell, { colSpan: 3 }, /* @__PURE__ */ import_react50.default.createElement(StepList, { onChangeStep: (step2) => onChangeStep(step2), operations, currentStep: currentStep || 0 }))), /* @__PURE__ */ import_react50.default.createElement(import_material39.TableRow, null, /* @__PURE__ */ import_react50.default.createElement(import_material39.TableCell, { colSpan: 5, align: "left", style: { verticalAlign: "top" } }, lastStep && process2.status === "SUCCEEDED" && step !== null && /* @__PURE__ */ import_react50.default.createElement(SuccessView, { step, process: process2 }), lastStep && process2.error && /* @__PURE__ */ import_react50.default.createElement(ErrorView, { error: process2.error }), wasConfigured && /* @__PURE__ */ import_react50.default.createElement(ConfigChangeView, { step: process2.steps[(currentStep || 0) - 1] }), needAnswers && /* @__PURE__ */ import_react50.default.createElement(import_react50.default.Fragment, null, /* @__PURE__ */ import_react50.default.createElement(import_material39.Typography, { variant: "subtitle1" }, /* @__PURE__ */ import_react50.default.createElement(import_react_i18next25.Trans, null, "Additional information needed")), (0, import_tasenor_common23.isTasenorElement)(directions.element) && /* @__PURE__ */ import_react50.default.createElement(
    RISP,
    {
      key: "directions",
      element: directions.element,
      values,
      setup: props.setup,
      onActionSuccess
    }
  ) || /* @__PURE__ */ import_react50.default.createElement(import_react50.default.Fragment, null, "INVALID RISP ELEMENT")))), hasSteps && /* @__PURE__ */ import_react50.default.createElement(import_material39.TableRow, null, /* @__PURE__ */ import_react50.default.createElement(import_material39.TableCell, { colSpan: 5, align: "left" }, /* @__PURE__ */ import_react50.default.createElement(
    StepView,
    {
      api: `${props.api}/${props.id}/step`,
      token: props.token,
      step,
      process: process2,
      summaryView,
      stateView,
      resultView,
      configView
    }
  ))))));
};

// src/elements/TextFileLineElement.tsx
var TextFileLineRenderer = (props) => {
  const { element } = props;
  if (!(0, import_tasenor_common24.isTextFileLineElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  const { line } = element;
  const text = line.text.replace(/\t/g, " \u23B5 ");
  return /* @__PURE__ */ import_react51.default.createElement(import_material40.Box, null, /* @__PURE__ */ import_react51.default.createElement(import_material40.Typography, { variant: "caption" }, /* @__PURE__ */ import_react51.default.createElement(import_react_i18next26.Trans, null, "Line:"), " ", line.line), /* @__PURE__ */ import_react51.default.createElement(import_material40.Typography, { sx: { fontFamily: "monospace" } }, text), line.columns && Object.keys(line.columns).length > 0 && /* @__PURE__ */ import_react51.default.createElement(import_react51.default.Fragment, null, /* @__PURE__ */ import_react51.default.createElement(import_material40.Typography, { variant: "caption" }, /* @__PURE__ */ import_react51.default.createElement(import_react_i18next26.Trans, null, "Values:")), /* @__PURE__ */ import_react51.default.createElement(ConfigView, { ignore: /^_/, config: line.columns })));
};

// src/elements/YesNoElement.tsx
init_shim();
var import_react52 = __toESM(require("react"));
var import_react_i18next27 = require("react-i18next");
var import_material41 = require("@mui/material");
var import_tasenor_common25 = require("@dataplug/tasenor-common");
var YesNoRenderer = (props) => {
  const { element } = props;
  const { t } = (0, import_react_i18next27.useTranslation)();
  const label = "label" in element ? element.label || "" : (0, import_tasenor_common25.isNamedElement)(element) ? t(`label-${element.name}`) : "";
  const [value, setValue2] = import_react52.default.useState((0, import_tasenor_common25.isNamedElement)(element) ? props.values[element.name] : null);
  if (!(0, import_tasenor_common25.isYesNoElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  const yes = t("Yes");
  const no = t("No");
  return /* @__PURE__ */ import_react52.default.createElement(import_material41.FormControl, { component: "fieldset" }, /* @__PURE__ */ import_react52.default.createElement(import_material41.FormLabel, { component: "legend" }, label), /* @__PURE__ */ import_react52.default.createElement(import_material41.RadioGroup, null, /* @__PURE__ */ import_react52.default.createElement(import_material41.Grid, null, /* @__PURE__ */ import_react52.default.createElement(
    import_material41.FormControlLabel,
    {
      value: "yes",
      label: yes,
      checked: value === true,
      control: /* @__PURE__ */ import_react52.default.createElement(import_material41.Radio, null),
      onChange: () => {
        setValue2(true);
        element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: true }, props);
      }
    }
  ), /* @__PURE__ */ import_react52.default.createElement(
    import_material41.FormControlLabel,
    {
      value: "no",
      label: no,
      checked: value === false,
      control: /* @__PURE__ */ import_react52.default.createElement(import_material41.Radio, null),
      onChange: () => {
        setValue2(false);
        element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: false }, props);
      }
    }
  ))));
};

// src/images/index.ts
init_shim();

// src/images/QuestionMark.tsx
init_shim();
var import_react53 = __toESM(require("react"));
var QuestionMarkData = "iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAyVBMVEX/////pQAAAAD/qAD/qwD/rQCdoaVIUFe1t7mdYQC8eABYMAD/pwBhZ2yxcAD/qgDumgAWAACRWADgkQDp6ek9Rk7xnADolgBMJwCsrrGsbADQhgDNhAB+gYT19fUjAADBwsOnqq3c3N14RwCQWABjOAAoAACUmJzQ0NG+wMEAFychLjnEfQAADiEuDADbjQAAABgwOkNudHkAAA43FAAWJTFXXmRuQACEiY1EIAA+GgCFUwA1PkZ9SwAKHiwzEABTLgBIJQBhYmPFYktPAAAG+ElEQVR4nO2daVPbPBCAyUpK4uDEgVzkdq4mUHMWEo7ylvb//6hXhjCFlmCvEh3u7POt7YxHTyzt6li5e3sEQRAEQRAEQRAEQeyY+iIsFkf5NaNR+3gxHthu1E4YF/NXjW8guT6aTR4ODz3J9GEyO/oS/+VNed5e2G6jMmF+KR32vU5UywkuCQL2ShDIPwte7Va81QHAMh/abi2W49sTuD6stKSZ9PFzm/ClLBetyuEZfJ1n5mUORg2487qx20azP2CMB73DA7gKbTc+Be0GTCLGP3lvG18nb3buoe/2mxz3YRbxIPW7++td8qYHp23bGhtZNKCT48p6a0nR24e5bZUPWdwclMSWes/4vLVy0LHegGgnfs/w6gwc66t9qOzO79mxdnYytm31mwWscjv1k/iiBH3bYq/0oct37BfDcvsXddtuMYObp52/wDWiAnnbejIFgif0+EmCJixtC4Z6eugrfjA7sbvIakNNUw99RXhgczC2oapZUOaNCOxNVU0IysF4bk0xNCIo00bNkuJY+xi0rDiAniFBqdi1EW5OPJ1p4g94CYwLlmf6Ev0HiIfvhgWLYKyLrhXvb40KDqCF3ojZFjC6mvpuchC+wHomh+Loi9FB+IJYGVwvQtV4H40xlzLKD8b7aAzrNAwJjk3H0VeEqalNo2LJkJUujQguwEKYeUGYyRiXkaVXGI/EsgHBsb1XKBXBwJ5GwdYojAkeR9oF62AlU6zxuzfaDW+nwRYNfDnj3mK6IPRnfWgq23F2Xqp0Op1SNydUzxj1d9Pje7VOykRtegAXhXK/f1X4D2ASqR00slJBs+FSKc74co1+8bYSod5ugKfWW3WvMEClUfwcGn/Nt+pLqCkMaa456RePFDqpeIDwo4eFEOEVg5Xeo9OyQidl95uWBHXooh/HOnp3MxQiKRtunmkt8J2eRVqXUAqTbn732VSyP0H3+pbWUJOfYnsVn37+k+NfItdq2CghDf1awlT51sP+ZkLr5Bv9i4sfxc+fuBhiu6nWdIFeOPm906RnondE+FDjVkZ7hsxf4ixMeubFOXJmw5OfqQ520Pgp4l4BO7T5vUZD7P5F8JhcnoaeQ/C7Y32GUMU1Js1iDm+os5ciA43fTYwzMgFh97X4gb5Is0BuYLDDFDWU6ATENa7ysQsLPgwTn4n91eKur01wb/QgUJGdpWjLVQebD6saDW/3S92m4DxIt5fk95L3xerohK91bRHeLv8DgLtHr5LGlHWSz/sK6Gkp87Sfdo+PR/PljTS9n3iVXpVvNE2xGm8rrMaeEma6u2Mcjubl2PR69dv07RtJDut1hWoAvUuLDxmH7Xn5qzT9sfI6UWtt6qdoywBK6H2aVDlWE/XY9FKans1i00AkhtKTKX5bi03t31OQpvmr2BQSDG8mCodYhk4QU1FfhJ/++8mjgmCKBacr1GGqcgzJZ/pP13bDAipK56xN8wV8arThXOmAhz+aLW5Tpq9aXNw0nwyVKFzn1M5Iucm6L3UGpyvFc/I02z4OsMUdG3HmwB2hRIrQU610CDpfbbc+BbfQUq1V8atWL8+kZDlUv+YWQAaS/fcj9UoVMbN+iy2RwanKVHsN9y5stz+R+jYXFYPI/Vy/gEi9XIzVHFo0bUDORNXHIGtZvKCXkvk219xYFTQexuyGPjS3EGy69vWBv7k6UJxqr9+g84lw+WOLmls5Bo1tkKrS+LlFza2Mos6PwcbTFnXhvPtxSZxLbCdYcj8PLn9uIWj5Ln4q+mdbVIWL1anzU7WiUsHtC35uY9WmO6icLb0i8/yV7fYn8w1/tvSKDKLO53k5lVG/7i1jjPNz7Xi9pNpFfW77my3puFC948Zr9r+7k4b8nVofZf7K/ZnoM4pxlJ+DiTuGO2CutncvplkIMc9g6xif8XPXl1kIMTGjJ4VXKBe7GTkflHzr4kdh0M1IiIlRue8tl0pZGYKSPrpeLRZ0fqn0BnycCbIlGA6xnZSdZ0pwr4yti/WrWRqDeyqX+Nzf9H1H+AWZDMV+Bla7b8FGUhZlplptDSDvMjH39wzfU0emezNfLNklxX3cMHSpZjQd2CtuOm9Q6OES98lIv5eFSqB3ILMhK7m/8/ueATbQVDKx7/QG9BW3TsbS/d4x8oqb7u9A7J7RBLeXzzz7VyhwjB4Ew8C9LJSNviU/i0oYoqMMnMG8o1jAEtpuMkEQBEEQBEEQBKGBRRGN7SYj+TXcxzHL2p53ufT8PzinR+eXn7SA/gIbGToHGZKh+5AhGboPGZKh+5AhGboPGZKh+5AhGboPGZKh+5AhGboPGZKh+5AhGboPGZKh+5AhGboPGf4Lhhx1s4tlzvDXzMPRyZrhcR6N7SYTBEEQBEEQBEEQBEEQBEH84/wP4MSZbpqNJlsAAAAASUVORK5CYII=";
var QuestionMarkInline = `data:image/png;base64,${QuestionMarkData}`;
var QuestionMark = () => /* @__PURE__ */ import_react53.default.createElement("img", { alt: "Question mark", src: QuestionMarkInline });

// src/plugins/index.ts
init_shim();

// src/plugins/CurrencyPlugin.tsx
init_shim();

// src/plugins/UiPlugin.tsx
init_shim();
var import_react54 = __toESM(require("react"));
var UiPlugin = class extends import_react54.Component {
  constructor() {
    super({});
    this.id = null;
    this.code = null;
    this.title = null;
    this.version = null;
    this.releaseDate = null;
    this.use = null;
    this.type = null;
    this.description = null;
    this.languages = {};
    this.languages = {};
  }
  init(catalog) {
  }
  static create(Class, catalog, store) {
    const plugin = new Class();
    plugin.code = Class.code;
    plugin.title = Class.title;
    plugin.version = Class.version;
    plugin.releaseDate = Class.releaseDate;
    plugin.use = Class.use;
    plugin.type = Class.type;
    plugin.description = Class.description;
    plugin.store = store;
    plugin.settings = store.settings;
    plugin.catalog = catalog;
    return plugin;
  }
  t(str) {
    return this.catalog ? this.catalog.t(str) : str;
  }
  goto(url) {
    if (!this.catalog) {
      throw new Error("Cannot use goto() when there is no catalog connected in plugin.");
    }
    this.catalog.history.push(url);
  }
  getSettings() {
    return null;
  }
  getDefaults() {
    return null;
  }
  getSetting(name) {
    return this.settings ? this.settings.get(`${this.code}.${name}`) : void 0;
  }
  render() {
    return /* @__PURE__ */ import_react54.default.createElement(import_react54.default.Fragment, null);
  }
};

// src/plugins/CurrencyPlugin.tsx
var CurrencyPlugin = class extends UiPlugin {
  makeMoney(cents, divider, decimals, prefix, thousands, comma, postfix) {
    const [full, part] = Number(cents / divider).toFixed(decimals).split(".");
    let text = full.replace(/(\d+)(\d{9})$/, `$1${thousands}$2`);
    text = text.replace(/(\d+)(\d{6})$/, `$1${thousands}$2`);
    text = text.replace(/(\d+)(\d{3})$/, `$1${thousands}$2`);
    return prefix + text + comma + part + postfix;
  }
  getCurrencySymbol() {
    throw new Error(`Currency plugin ${this.code} does not implement getCurrencySymbol().`);
  }
  getCurrencyCode() {
    throw new Error(`Currency plugin ${this.code} does not implement getCurrencyCode().`);
  }
  money2str(cents) {
    throw new Error(`Currency plugin ${this.code} does not implement money2str().`);
  }
};

// src/plugins/LanguagePlugin.tsx
init_shim();
var LanguagePlugin = class extends UiPlugin {
  getLanguages() {
    throw new Error(`Plugin ${this.code} does not implement getLanguages().`);
  }
  flag(language) {
    return "gb";
  }
  date2str(date) {
    throw new Error(`A plugin ${this.code} does not implement date2str().`);
  }
  str2date(date, sample = null) {
    throw new Error(`A plugin ${this.code} does not implement str2date().`);
  }
};

// src/plugins/SchemePlugin.tsx
init_shim();
var SchemePlugin = class extends UiPlugin {
  getAccountingSchemes() {
  }
  getAccountData() {
    return [];
  }
};

// src/plugins/ToolPlugin.tsx
init_shim();
var import_react55 = __toESM(require("react"));
var ToolPlugin = class extends UiPlugin {
  toolMenu() {
    return [];
  }
  toolTitle(index) {
    return "";
  }
  toolTopPanel(index) {
    return /* @__PURE__ */ import_react55.default.createElement(import_react55.default.Fragment, null);
  }
  toolMainPanel(index) {
    return /* @__PURE__ */ import_react55.default.createElement(import_react55.default.Fragment, null);
  }
  async request(method, params = void 0) {
    const { db } = this.store;
    return this.store.request(`/db/${db}/tools/${this.code}`, method, params || null);
  }
  async GET(query = void 0) {
    return this.request("GET", query);
  }
  async DELETE(query = void 0) {
    return this.request("DELETE", query);
  }
  async POST(params) {
    return this.request("POST", params);
  }
  async PUT(params) {
    return this.request("PUT", params);
  }
  async PATCH(params) {
    return this.request("PATCH", params);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionEngine,
  BooleanRenderer,
  BoxRenderer,
  ButtonRenderer,
  CaseRenderer,
  ConfigChangeView,
  ConfigJSONView,
  ConfigView,
  CurrencyPlugin,
  DefaultErrorView,
  DefaultResultView,
  DefaultStateView,
  DefaultStepView,
  DefaultSuccessView,
  DefaultSummaryView,
  Dialog,
  FileUploader,
  FlatRenderer,
  HtmlRenderer,
  IGNORE_FIELDS,
  IconButton,
  IconSpacer,
  ImportFile,
  ImportLine,
  ImportStateView,
  LanguagePlugin,
  Localize,
  MenuState,
  MessageRenderer,
  Money,
  Note,
  NumberRenderer,
  ProcessList,
  ProcessStatusIcon,
  ProcessView,
  QuestionMark,
  QuestionMarkData,
  QuestionMarkInline,
  RISP,
  RISPProvider,
  RadioRenderer,
  RenderingEngine,
  RuleColumnEdit,
  RuleEditor,
  RuleLineEdit,
  SchemePlugin,
  StepList,
  SubPanel,
  TabNav,
  TabPanel,
  TagChip,
  TagGroup,
  TextFileLineRenderer,
  TextRenderer,
  Title,
  ToolPlugin,
  UiPlugin,
  VisualResultRule,
  VisualRule,
  VisualRuleLine,
  YesNoRenderer,
  debugActionHandler,
  downloadUrl,
  isMainMenu,
  patchActionHandler,
  postActionHandler,
  useAxios,
  useNavigation
});
