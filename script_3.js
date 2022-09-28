// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"data/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bp = void 0;
var bp = {
  SM: 0,
  MD: 768,
  LG: 1024,
  XL: 1280,
  MQ_SM: '(min-width: 0px)',
  MQ_MD: '(min-width: 768px)',
  MQ_LG: '(min-width: 1024px)',
  MQ_XL: '(min-width: 1280px)'
};
exports.bp = bp;
},{}],"../node_modules/@imdb/gungnir/utils/windowTarget.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function getSafeWindowTarget(scope) {
  if (scope === void 0) {
    scope = 'top';
  }

  var target = null;

  if (!target && scope === 'top') {
    var w = null;

    try {
      w = typeof window.top.location.search !== 'undefined' ? window.top : null;
    } catch (e) {}

    target = w;
  }

  if (!target && scope === 'parent') {
    var w = null;

    try {
      w = typeof window.parent.location.search !== 'undefined' ? window.parent : null;
    } catch (e) {}

    target = w;
  }

  if (!target) {
    target = window;
  }

  return target;
}

exports.default = getSafeWindowTarget;
},{}],"../node_modules/@imdb/gungnir/device/info.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDetectedPlatform = void 0;

var windowTarget_1 = require("../utils/windowTarget");

var MDOT_REGEX = /^http(s)?\:\/\/m\.(.*\.)?imdb\.com/;
var PLATFORM_VERSION_REGEX = /(Android|OS|Windows Phone) (\d+)[\._](\d+)[\._]?(\d+)?/;
var ANDROID_APP_API_REGEX = /Android (\d{2,})/;
var IOS_REGEX = /iP(hone|ad|od)/;
var SAFARI_REGEX = /Version\/[\d\.]+.*Safari/;
var IMDB_APP_STRING = 'IMDb-flg';
var WINDOWS_PHONE_STRING = 'Windows Phone';
var ANDROID_STRING = 'Android';
var TOUCH_STRING = 'ontouchstart';
var CHROME_STRING = 'Chrome/';
var TRANSITION_TRANSFORM_MOBILE_SUPPORT_REGEX = /(Chrome|Safari|MSIE|Firefox)/;
var TRANSITION_TRANSFORM_MOBILE_UNSUPPORTED_REGEX = /(SamsungBrowser|Galaxy Nexus Build|iPhone OS 8|iPhone OS 7)/;

var DeviceInfoModule = function () {
  function DeviceInfoModule() {
    this._isWindowsDevice = false;
    this._isIOSDevice = false;
    this._isAndroidDevice = false;
    this._isIMDbApp = false;
    this._isSafari = false;
    this._isMobileDevice = false;
    this._isMobileSite = false;
    this._hasTouch = false;
    this._mobilePlatformVersion = {
      major: 0,
      minor: 0,
      patch: 0,
      androidAPI: 0
    };
    this._chromeVersion = 0;
    this._canAutoplay = false;
    this._canTransitionTransform = false;
    this._siteVariant = '';
    var userAgent = window.navigator.userAgent;
    var url = window.location.href;
    this._isWindowsDevice = userAgent.indexOf(WINDOWS_PHONE_STRING) > -1;
    this._isIOSDevice = userAgent.search(IOS_REGEX) > -1;
    this._isAndroidDevice = userAgent.indexOf(ANDROID_STRING) > -1;
    this._isIMDbApp = userAgent.indexOf(IMDB_APP_STRING) > -1;
    this._isSafari = userAgent.search(SAFARI_REGEX) > -1;
    this._isMobileDevice = this._isWindowsDevice || this._isIOSDevice || this._isAndroidDevice;
    this._isMobileSite = url.search(MDOT_REGEX) > -1;
    this._hasTouch = typeof document[TOUCH_STRING] !== 'undefined';
    this._mobilePlatformVersion = getMobilePlatformVersion(userAgent, this.isIMDbApp, this.isAndroidDevice);
    this._chromeVersion = getChromeVersion(userAgent);
    this._canAutoplay = canAutoplay(this.mobilePlatformVersion, this.isIMDbApp, this.isAndroidDevice, this.isIOSDevice, this.isMobileDevice);
    this._canTransitionTransform = this.isDesktopSite || hasMobileTransitionTransformSupport(userAgent, this.isIMDbApp, this.isAndroidDevice, this.mobilePlatformVersion);
    this._siteVariant = getSiteVariant(this.isIMDbApp, this.isIOSDevice, this.isAndroidDevice, this.isMobileSite);
  }

  Object.defineProperty(DeviceInfoModule.prototype, "isWindowsDevice", {
    get: function () {
      return this._isWindowsDevice;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "isIOSDevice", {
    get: function () {
      return this._isIOSDevice;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "isAndroidDevice", {
    get: function () {
      return this._isAndroidDevice;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "isMobileDevice", {
    get: function () {
      return this._isMobileDevice;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "isIMDbApp", {
    get: function () {
      return this._isIMDbApp;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "isSafari", {
    get: function () {
      return this._isSafari;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "isDesktopSite", {
    get: function () {
      return !this.isMobileDevice;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "isMobileSite", {
    get: function () {
      return this._isMobileSite;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "hasTouch", {
    get: function () {
      return this._hasTouch;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "chromeVersion", {
    get: function () {
      return this._chromeVersion;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "mobilePlatformVersion", {
    get: function () {
      return this._mobilePlatformVersion;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "canAutoplay", {
    get: function () {
      return this._canAutoplay;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "canTransitionTransform", {
    get: function () {
      return this._canTransitionTransform;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DeviceInfoModule.prototype, "siteVariant", {
    get: function () {
      return this._siteVariant;
    },
    enumerable: false,
    configurable: true
  });
  return DeviceInfoModule;
}();

function getDetectedPlatform() {
  var userAgent = window.navigator.userAgent.toLowerCase();
  var safeWindow = windowTarget_1.default('top');
  var hasPlatformOverride = safeWindow.location.search.match(/platform=(\w+)/) || [];
  var detectedPlatform = DeviceInfo.PlatformType.unknown;

  switch (true) {
    case hasPlatformOverride !== null && hasPlatformOverride.length > 0:
      var detectedPlatformOverride = hasPlatformOverride[1];

      if (typeof DeviceInfo.PlatformType[detectedPlatformOverride] !== 'undefined') {
        detectedPlatform = DeviceInfo.PlatformType[detectedPlatformOverride];
      }

      break;

    case userAgent.indexOf('iphone') > -1:
      detectedPlatform = DeviceInfo.PlatformType.ios;
      break;

    case userAgent.indexOf('android') > -1:
      detectedPlatform = DeviceInfo.PlatformType.android;
      break;

    default:
      detectedPlatform = DeviceInfo.PlatformType.web;
      break;
  }

  return detectedPlatform;
}

exports.getDetectedPlatform = getDetectedPlatform;

function getSiteVariant(isIMDbApp, isIOSDevice, isAndroidDevice, isMobileSite) {
  var str = '';

  if (isIMDbApp) {
    str = 'app';

    if (isIOSDevice) {
      str += '-ios-ph';
    } else if (isAndroidDevice) {
      str += '-andr-ph';
    } else {
      str += '-unknown';
    }
  } else if (isMobileSite) {
    str = 'mobile';
  } else {
    str = 'web';
  }

  return str;
}

function getChromeVersion(userAgentString) {
  if (userAgentString.indexOf(CHROME_STRING) !== -1) {
    return parseInt(userAgentString.substr(userAgentString.indexOf(CHROME_STRING) + CHROME_STRING.length, 2), 10);
  } else {
    return 0;
  }
}

function getMobilePlatformVersion(userAgentString, isIMDbApp, isAndroidDevice) {
  var version = {
    major: 0,
    minor: 0,
    patch: 0,
    androidAPI: 0
  };
  var matches = userAgentString.match(PLATFORM_VERSION_REGEX);

  if (matches && matches.length > 0) {
    version.major = parseInt(matches[2], 10) || 0;
    version.minor = parseInt(matches[3], 10) || 0;
    version.patch = parseInt(matches[4], 10) || 0;
  }

  if (isIMDbApp && isAndroidDevice) {
    var matches = userAgentString.match(ANDROID_APP_API_REGEX);

    if (matches && matches.length > 0) {
      version.androidAPI = parseInt(matches[1], 10) || 0;
    } else {
      version.androidAPI = 0;
    }
  }

  return version;
}

function canAutoplay(version, isIMDbApp, isAndroid, isIOS, isMobileDevice) {
  if (isIMDbApp) {
    if (isAndroid) {
      if (version.androidAPI >= 17) {
        return true;
      } else if (version.major >= 4) {
        if (version.major === 4 && version.minor < 2) {
          return false;
        }

        return true;
      }

      return false;
    } else if (isIOS && version.major >= 4) {
      return true;
    } else {
      return false;
    }
  } else if (isMobileDevice) {
    return false;
  }

  return true;
}

function hasMobileTransitionTransformSupport(userAgentString, isIMDbApp, isAndroidDevice, mobilePlatformVersion) {
  var isUnsupportedIOSVersionApp = !isAndroidDevice && mobilePlatformVersion.major < 9;

  if (isIMDbApp) {
    if (isUnsupportedIOSVersionApp) {
      return false;
    }

    return true;
  }

  if (TRANSITION_TRANSFORM_MOBILE_UNSUPPORTED_REGEX.test(userAgentString)) {
    return false;
  } else if (TRANSITION_TRANSFORM_MOBILE_SUPPORT_REGEX.test(userAgentString)) {
    if (userAgentString.indexOf(CHROME_STRING) !== -1) {
      var chromeVersion = getChromeVersion(userAgentString);

      if (!Number.isNaN(chromeVersion) && chromeVersion < 46) {
        return false;
      }
    }

    return true;
  }

  return false;
}

var instance = new DeviceInfoModule();
Object.freeze(instance);
exports.default = instance;
},{"../utils/windowTarget":"../node_modules/@imdb/gungnir/utils/windowTarget.js"}],"js/colors.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgbToHue = exports.isDarkContrast = exports.hslToHex = exports.getHueFromImage = exports.getColorsFromContext = void 0;

var rgbToHue = function (r, g, b) {
  var R = r / 255;
  var G = g / 255;
  var B = b / 255;
  var max = Math.max(R, G, B);
  var min = Math.min(R, G, B);
  var hue = 0;

  if (max === R) {
    hue = (G - B) / (max - min);
  }

  if (max === G) {
    hue = 2.0 + (B - R) / (max - min);
  }

  if (max === B) {
    hue = 4.0 + (R - G) / (max - min);
  }

  hue *= 60;
  return hue < 0 ? hue + 360 : hue;
};

exports.rgbToHue = rgbToHue;

var getColorsFromContext = function (ctx, width, height) {
  var colors = {};
  var pixels, r, g, b, a;
  r = g = b = a = 0;
  pixels = ctx.getImageData(0, 0, width, height);

  for (var i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    a = data[i + 3]; // alpha

    if (a < 255 / 2) continue;
    var col = parseInt('' + rgbToHue(r, g, b));
    colors[col] = ++colors[col] || 0;
  }

  return colors;
};

exports.getColorsFromContext = getColorsFromContext;

var getHueFromImage = function (src) {
  return new Promise(function (resolve) {
    try {
      var img_1 = new Image();
      img_1.crossOrigin = "Anonymous";

      img_1.onload = function () {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = img_1.width;
        canvas.height = img_1.height;
        context === null || context === void 0 ? void 0 : context.clearRect(0, 0, canvas.width, canvas.height);
        context === null || context === void 0 ? void 0 : context.drawImage(img_1, 0, 0, img_1.width, img_1.height);
        var colors = getColorsFromContext(context, img_1.width, img_1.height);
        var sorted = Object.keys(colors).sort(function (a, b) {
          return colors[parseInt(b)] - colors[parseInt(a)];
        }).filter(function (i) {
          return !!i && !isNaN(parseInt(i));
        });
        resolve(parseInt(sorted[0]));
      };

      img_1.src = src;
    } catch (e) {
      resolve(0);
    }
  });
};

exports.getHueFromImage = getHueFromImage;

var hslToHex = function (h, s, l) {
  l /= 100;
  var a = s * Math.min(l, 1 - l) / 100;

  var f = function (n) {
    var k = (n + h / 30) % 12;
    var color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };

  return "#".concat(f(0)).concat(f(8)).concat(f(4));
};

exports.hslToHex = hslToHex;

var isDarkContrast = function (hexColor) {
  if (!hexColor) return false;
  var color = hexColor.charAt(0) === '#' ? hexColor.substring(1, 7) : hexColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR

  var g = parseInt(color.substring(2, 4), 16); // hexToG

  var b = parseInt(color.substring(4, 6), 16); // hexToB

  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map(function (col) {
    if (col <= 0.03928) {
      return col / 12.92;
    }

    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.279 ? true : false;
};

exports.isDarkContrast = isDarkContrast;
},{}],"js/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  isFirstImpression: true,
  normalizeClickthrough: true,
  handleBreakpoints: true,
  isDev: true,
  getFullscreenElement: true,
  getDateValue: true
};
exports.getDateValue = getDateValue;
exports.getFullscreenElement = void 0;
exports.handleBreakpoints = handleBreakpoints;
exports.isDev = isDev;
exports.isFirstImpression = isFirstImpression;
exports.normalizeClickthrough = normalizeClickthrough;

var _info = _interopRequireDefault(require("@imdb/gungnir/device/info"));

var _colors = require("./colors");

Object.keys(_colors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _colors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _colors[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFirstImpression(adId) {
  var _a;

  if (adId === void 0) {
    adId = "5dvw-000001";
  }

  if ("development" === 'development') return true;
  var ad_utils = window.ad_utils || window.top.ad_utils;
  var ad_id = ((_a = document.ad) === null || _a === void 0 ? void 0 : _a.cid) || adId;
  var fp = (ad_utils === null || ad_utils === void 0 ? void 0 : ad_utils.fp) || null;

  if (fp && (fp === null || fp === void 0 ? void 0 : fp.should_autoplay(ad_id))) {
    fp.log_autoplay(ad_id);
    return true;
  }

  {
    return false;
  }
}

function normalizeClickthrough(el) {
  var href = el.getAttribute('href');
  var refmarker = "";
  var rel = "";
  var target = "_blank";
  var internalLinkRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]imdb+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  var isIMDbLink = internalLinkRegex.test(href);
  var isInternalLink = isIMDbLink || href.startsWith("/") ? true : false;
  var link = href.replace(/\/$/, "");

  if (_info.default.isIMDbApp && isInternalLink) {
    if (isIMDbLink) {
      link = "imdb://" + link.split(".com")[1];
    }
  }

  var adjustedProps = {};
  var refParam = "/?ref_=";

  if (refmarker) {
    if (link.includes("?")) {
      refParam = "&ref_=";
    }
  }

  adjustedProps.href = isInternalLink && refmarker ? "".concat(link).concat(refParam).concat(refmarker) : link;

  if (!isInternalLink) {
    adjustedProps.target = target ? target : "_blank";

    if (target === "_blank") {
      adjustedProps.rel = rel || "noopener noreferrer";
    }
  } else if (isInternalLink) {
    adjustedProps.target = "_top";
  }

  el.setAttribute('href', adjustedProps.href);
  el.setAttribute('target', adjustedProps.target);
  el.setAttribute('rel', adjustedProps.rel); // el.addEventListener('click', () => {
  //   (window.parent as any).VWCustomScript.message(window.parent.document.getElementById('inline20'), MSG_VIDEO_PAUSE);
  //   (window.parent as any).VWCustomScript.message(window.parent.document.getElementById('inline40'), MSG_VIDEO_PAUSE);
  // })
}

function handleBreakpoints(breakpoints, cb) {
  var current;
  var initFired = false;
  breakpoints.sort(function (a, b) {
    return b.breakpoint - a.breakpoint;
  }).forEach(function (b, i, a) {
    var query = window.top.matchMedia("(min-width: ".concat(b.breakpoint, "px)"));
    var breakpoint = b.breakpoint;

    if (query.matches && !initFired) {
      cb(b);
      current = breakpoint;
      initFired = true;
    }

    query.addEventListener('change', function (event) {
      if (event.matches) {
        cb(b);
        current = breakpoint;
      } else {
        var nextBp = a[i + 1];

        if (breakpoint === current && nextBp) {
          current = nextBp.breakpoint;
          cb(nextBp);
        }
      }
    });
  });
}

function isDev() {
  var queryParameters = new Proxy(new URLSearchParams(window.location.search), {
    get: function (searchParams, prop) {
      return searchParams.get(prop);
    }
  });
  return parseInt(queryParameters.dev) === 1;
}

var getFullscreenElement = function () {
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || parent.document.fullscreenElement || parent.document.webkitFullscreenElement || parent.document.mozFullScreenElement || parent.document.msFullscreenElement;
};

exports.getFullscreenElement = getFullscreenElement;

function getDateValue(dateObject) {
  if (typeof dateObject !== 'object') return dateObject;
  var entries = Object.entries(dateObject);
  var lastIndex = entries.length - 1;
  var userDate = new Date();
  var returnValue = entries[0][1];

  for (var i = 0; i < entries.length; i++) {
    var currentDate = new Date(entries[i][0]);
    var currentValue = entries[i][1];

    if (i !== lastIndex) {
      var nextDate = new Date(entries[i + 1][0]);

      if (userDate > currentDate && userDate < nextDate) {
        returnValue = currentValue;
        break;
      }
    }

    if (i === lastIndex && userDate > currentDate) {
      returnValue = currentValue;
    }
  }

  return returnValue;
}
},{"@imdb/gungnir/device/info":"../node_modules/@imdb/gungnir/device/info.js","./colors":"js/colors.ts"}],"../node_modules/@amzn/imdb-gungnir/notifier/Notifier.js":[function(require,module,exports) {
"use strict";
/**
 * Format of observer objects. Since Observer is not a class, normalization of
 * observer objects is the responsibility of the developer subscribing to the Notifier.
 *
 * It's a simple set up: an object with properties for each event the observer is
 * interested in. These properties are functions that will receive any extra arguments
 * that are sent to `Notifier.notify()`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * # Notifier
 *
 * Class that tracks observers and calls them all with the same arguments when
 * asked.
 *
 * To use it, create the Notifier on the object that should notify others. Then,
 * have the other objects subscribe to the Notifier using its .subscribe() method.
 *
 * ---
 *
 * ### Example: Basic Usage
 *
 * ```js
 * import Notifier from '@imdb/gungnir/notifier';
 *
 * // our main object that does something it needs to tell other objects about
 * var obj1 = {
 *   notifier: new Notifier()
 * };
 *
 * // outer object simulates having some instance of some other class or something
 * var obj2 = {
 *   // this is the object that is relevant to the Notifier
 *   observer: {
 *     // this function will be called whenever the Notifier is told to notify its
 *     // observers with the notification `'myEvent'`
 *     myEvent: function() {
 *       // do something here
 *       alert(notification);
 *     }
 *   }
 * }
 *
 * obj1.notifier.subscribe(obj2.observer); // subscribe to hear notifications
 * obj1.notifier.notify('myEvent'); // calls obj2.observer.myEvent()
 * ```
 *
 * ---
 * ## Backstory
 *
 * This is a commonly used pub/sub system that allows for subscriptions and callbacks.
 *
 */
var Notifier = /** @class */ (function () {
    /**
     * @constructor
     * @param {Object[]} [observers=[]] - initial observer objects
     */
    function Notifier(observers) {
        var _this = this;
        if (observers === void 0) { observers = []; }
        this.observers = [];
        /**
         * Clears all observers.
         */
        this.clear = function () {
            for (var i = _this.observers.length - 1; i > 0; i--) {
                _this.observers.splice(i, 1);
            }
        };
        /**
         * Calls all the functions in observers that match the passed notification.
         * @param {string} notification - name of the "event" to trigger. More accurately,
         *   name of the functions to call within the observers.
         * @param {Array} [params] - array of arguments to pass to the observer function
         */
        this.notify = function (notification, params) {
            if (typeof notification !== 'string') {
                return;
            }
            _this.observers.forEach(function (observer) {
                _this.notifyObserver(observer, notification, params);
            });
        };
        /**
         * Calls the function in the passed observer that matches the passed notification.
         * @param {Observer} observer - the observer to trigger the notification for. Does
         *   not have to be in this Notifier's list.
         * @param {string} notification - name of the "event" to trigger. More accurately,
         *   name of the functions to call within the observers.
         * @param {Array} [params] - array of arguments to pass to the observer function
         */
        this.notifyObserver = function (observer, notification, params) {
            if (observer &&
                typeof observer === 'object' &&
                observer[notification] &&
                typeof observer[notification] === 'function') {
                observer[notification].apply(observer, params);
            }
        };
        /**
         * Adds an object as an observer to this notifier.
         * @param {Observer} observer - the new observer to add
         * @returns {boolean} - whether it was successfully added
         */
        this.subscribe = function (observer) {
            if (observer && typeof observer === 'object' && _this.observers.indexOf(observer) === -1) {
                _this.observers.push(observer);
                return true;
            }
            return false;
        };
        /**
         * Removes a _specific_ observer from this notifier's observer list.
         * @param {Observer} observer - observer to remove
         * @returns {boolean} - true if it was successfully removed. False probably
         *   means the observer was never subscribed in the first place.
         */
        this.unsubscribe = function (observer) {
            var observerIndex = _this.observers.indexOf(observer);
            if (observer && observerIndex !== -1) {
                _this.observers.splice(observerIndex, 1);
                return true;
            }
            return false;
        };
        /**
         * Get a `Set()` of all the notification keys on all observers of the notifier.
         * Helpful to know if a specific notification should be accounted for. If no observers have included a `stateChange`
         * notification, the notifier does not need to execute the code to calcuate a state change.
         *
         * @example
         * ```
         * import Notifier from './notifier';
         * const notifier = new Notifier();
         * notifier.subscribe({
         *    offsetChange : function() {},
         * });
         * notifier.subscribe({
         *    buttonClicked : function() {},
         * })
         *
         * ...
         * if( notifier.getAllObserverKeys().has('stateChange') ) {
         *    // do stateChange calculations
         * }
         * ```
         */
        this.getAllObserverKeys = function () {
            var allKeys = new Set();
            _this.observers.forEach(function (observer) {
                Object.keys(observer).forEach(function (name) {
                    allKeys.add(name);
                });
            });
            return allKeys;
        };
        if (!(observers instanceof Array)) {
            throw new TypeError("Notifiers should be instantiated with either an Array of observers or no argument at all. Received " + observers);
        }
        // initialize observers
        this.clear();
        observers.forEach(function (o) { return _this.subscribe(o); });
    }
    return Notifier;
}());
exports.default = Notifier;

},{}],"../node_modules/@amzn/imdb-creativestudio-video-player/ui/fullscreen/fullscreen.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoFullscreenButton = void 0;
var Notifier_1 = require("@amzn/imdb-gungnir/notifier/Notifier");
var VideoFullscreenButton = /** @class */ (function () {
    function VideoFullscreenButton(element, o) {
        var _this = this;
        this.element = element;
        this.notifier = new Notifier_1.default();
        this._enabled = true;
        this._status = 'normal';
        this.activate = function () {
            _this.element.removeEventListener('click', _this.onClick);
            _this.element.addEventListener('click', _this.onClick);
        };
        this.deactivate = function () {
            _this.element.removeEventListener('click', _this.onClick);
        };
        this.onClick = function () {
            var notification = _this.status === 'normal' ? 'onRequestFullScreen' : 'onRequestNormalScreen';
            _this.notify(notification);
        };
        this.updateEnabled = function () {
            if (_this.enabled) {
                _this.activate();
            }
            else {
                _this.deactivate();
            }
            _this.notify('onEnabledChange', _this.enabled);
        };
        this.notify = function (notification) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _this.notifier.notify(notification, args);
        };
        this.subscribe = function (o) {
            return _this.notifier.subscribe(o);
        };
        this.unsubscribe = function (o) {
            return _this.notifier.unsubscribe(o);
        };
        this.observer = o || {};
        this.notifier.subscribe(this.observer);
        this.activate();
    }
    Object.defineProperty(VideoFullscreenButton.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            var changed = value !== this._enabled;
            this._enabled = value;
            if (changed) {
                this.updateEnabled();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VideoFullscreenButton.prototype, "isFullScreen", {
        get: function () {
            return this.status === 'full';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VideoFullscreenButton.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (v) {
            var changed = v !== this.status;
            this._status = v;
            if (changed) {
                this.notify('onStatusChange', this.status);
            }
        },
        enumerable: false,
        configurable: true
    });
    return VideoFullscreenButton;
}());
exports.VideoFullscreenButton = VideoFullscreenButton;
exports.default = VideoFullscreenButton;

},{"@amzn/imdb-gungnir/notifier/Notifier":"../node_modules/@amzn/imdb-gungnir/notifier/Notifier.js"}],"../node_modules/@amzn/imdb-creativestudio-video-player/ui/slate/slate.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoSlateButton = void 0;
var Notifier_1 = require("@amzn/imdb-gungnir/notifier/Notifier");
var VideoSlateButton = /** @class */ (function () {
    function VideoSlateButton(element, o) {
        var _this = this;
        this.element = element;
        this.notifier = new Notifier_1.default();
        this._enabled = true;
        this._playbackStatus = 'notstarted';
        this.activate = function () {
            _this.deactivate();
            _this.element.addEventListener('click', _this.onClick);
        };
        this.deactivate = function () {
            _this.element.removeEventListener('click', _this.onClick);
        };
        this.onClick = function () {
            var notification = undefined;
            switch (_this.playbackStatus) {
                case 'completed':
                    notification = 'onRequestRestart';
                    break;
                case 'playing':
                    notification = 'onRequestPause';
                    break;
                case 'notstarted':
                case 'paused':
                    notification = 'onRequestPlay';
                    break;
            }
            if (notification) {
                _this.notify(notification);
            }
        };
        this.updateEnabled = function () {
            if (_this.enabled) {
                _this.activate();
            }
            else {
                _this.deactivate();
            }
            _this.notify('onEnabledChange', _this.enabled);
        };
        this.notify = function (notification) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _this.notifier.notify(notification, args);
        };
        this.subscribe = function (o) {
            return _this.notifier.subscribe(o);
        };
        this.unsubscribe = function (o) {
            return _this.notifier.unsubscribe(o);
        };
        this.observer = o || {};
        this.notifier.subscribe(this.observer);
        this.activate();
    }
    Object.defineProperty(VideoSlateButton.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            var changed = value !== this._enabled;
            this._enabled = value;
            if (changed) {
                this.updateEnabled();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VideoSlateButton.prototype, "playbackStatus", {
        get: function () {
            return this._playbackStatus;
        },
        set: function (v) {
            var changed = v !== this.playbackStatus;
            this._playbackStatus = v;
            if (changed) {
                this.notify('onPlaybackStatusChange', this.playbackStatus);
            }
        },
        enumerable: false,
        configurable: true
    });
    return VideoSlateButton;
}());
exports.VideoSlateButton = VideoSlateButton;
exports.default = VideoSlateButton;

},{"@amzn/imdb-gungnir/notifier/Notifier":"../node_modules/@amzn/imdb-gungnir/notifier/Notifier.js"}],"../node_modules/@amzn/imdb-gungnir/notifier/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Notifier_1 = require("./Notifier");
exports.default = Notifier_1.default;

},{"./Notifier":"../node_modules/@amzn/imdb-gungnir/notifier/Notifier.js"}],"../node_modules/@amzn/imdb-media-interoperability-plugin/constants.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODULE_NAME = void 0;
/**
 * @internal
 */
exports.MODULE_NAME = 'IMDbMediaInteroperabilityPlugin';

},{}],"../node_modules/@amzn/imdb-media-interoperability-plugin/errors.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingNativeWebBridgeError = exports.RequestPlaybackResponseError = exports.SetStatusError = void 0;
var constants_1 = require("./constants");
var SetStatusError = /** @class */ (function (_super) {
    __extends(SetStatusError, _super);
    function SetStatusError(setStatusFuncName, mediaKey, lastPermission) {
        var _this = _super.call(this) || this;
        _this.message = "setStatus(" + setStatusFuncName + ") failed [mediaKey: " + mediaKey + ", lastPermisson: " + lastPermission + "]";
        _this.name = constants_1.MODULE_NAME + "_SetStatusError";
        return _this;
    }
    return SetStatusError;
}(Error));
exports.SetStatusError = SetStatusError;
var RequestPlaybackResponseError = /** @class */ (function (_super) {
    __extends(RequestPlaybackResponseError, _super);
    function RequestPlaybackResponseError() {
        var _this = _super.call(this) || this;
        _this.message = "requestPlayback failed";
        _this.name = constants_1.MODULE_NAME + "_RequestPlaybackResponseError";
        return _this;
    }
    return RequestPlaybackResponseError;
}(Error));
exports.RequestPlaybackResponseError = RequestPlaybackResponseError;
var MissingNativeWebBridgeError = /** @class */ (function (_super) {
    __extends(MissingNativeWebBridgeError, _super);
    function MissingNativeWebBridgeError() {
        var _this = _super.call(this) || this;
        _this.message = "window.NativeWebBridge is undefined";
        _this.name = constants_1.MODULE_NAME + "_MissingNativeWebBridgeError";
        return _this;
    }
    return MissingNativeWebBridgeError;
}(Error));
exports.MissingNativeWebBridgeError = MissingNativeWebBridgeError;

},{"./constants":"../node_modules/@amzn/imdb-media-interoperability-plugin/constants.js"}],"../node_modules/@amzn/imdb-media-interoperability-plugin/InteroperableMedia.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteroperableMedia = void 0;
var notifier_1 = require("@amzn/imdb-gungnir/notifier");
var constants_1 = require("./constants");
var errors_1 = require("./errors");
var InteroperableMedia = /** @class */ (function () {
    function InteroperableMedia(element, observer) {
        var _this = this;
        this.element = element;
        this.notifier = new notifier_1.default();
        this.lastPermission = undefined;
        this.mediaKey = undefined;
        this.isSubscribed = false;
        this._isUserPaused = false;
        this._isFullscreen = false;
        this.pause = function (options) {
            if (options === void 0) { options = {}; }
            _this._isUserPaused = !!options.userInitiated;
            _this.setStatus('setMediaPaused');
        };
        this.play = function (options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.requestPlayback(options);
                    return [2 /*return*/];
                });
            });
        };
        this.setMediaPaused = function (options) {
            if (options === void 0) { options = {}; }
            _this._isUserPaused = !!options.userInitiated;
            _this.setStatus('setMediaPaused');
        };
        this.setMediaPlaying = function () {
            _this.setStatus('setMediaPlay');
        };
        this.setMediaEnded = function () {
            _this.setStatus('setMediaEnded');
        };
        this.setIsFullscreen = function (value) {
            _this._isFullscreen = value;
        };
        this.subscribe = function (observer) {
            return _this.notifier.subscribe(observer);
        };
        this.unsubscribe = function (observer) {
            return _this.notifier.unsubscribe(observer);
        };
        this.subscribeToNotifications = function (opts) {
            if (opts === void 0) { opts = {}; }
            var shouldRequestPlayback = !!opts.shouldRequestPlayback;
            if (!_this.isSubscribed) {
                _this.isSubscribed = window.NativeWebBridge.subscribe({
                    onMediaPermissionsChanged: _this.onMediaPermissionsChanged,
                });
                if (shouldRequestPlayback) {
                    _this.requestPlayback({
                        userInitiated: false,
                    });
                }
            }
        };
        this.onMediaPermissionsChanged = function (response) {
            var permission = response.permission, key = response.key;
            if (permission) {
                var safePermission = permission.toLowerCase();
                _this.lastPermission = safePermission;
                _this.mediaKey = key;
                _this.log("onMediaPermissionsChanged: " + safePermission);
                switch (safePermission) {
                    case 'granted':
                        _this.notify('onPlayPermissionGranted');
                        break;
                    case 'denied':
                        _this.notify('onPlayPermissionDenied');
                        break;
                    case 'pending':
                        _this.notify('onPlayPermissionPending');
                        break;
                }
            }
        };
        this.setStatus = function (setStatusFuncName) { return __awaiter(_this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, window.NativeWebBridge[setStatusFuncName]({
                                key: this.mediaKey,
                                permission: this.lastPermission,
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.log('SetStatusError', err_1);
                        if (!InteroperableMedia.SILENT_ON_ERROR) {
                            throw new errors_1.SetStatusError(setStatusFuncName, this.mediaKey, this.lastPermission);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.requestPlayback = function (opts) {
            if (opts === void 0) { opts = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var response, err_2;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.log('requestPlayback', opts);
                            if (opts.userInitiated) {
                                this._isUserPaused = false;
                            }
                            if (!this.isSubscribed) {
                                this.isSubscribed = window.NativeWebBridge.subscribe({
                                    onMediaPermissionsChanged: this.onMediaPermissionsChanged,
                                });
                            }
                            if (((_a = this.lastPermission) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'granted') {
                                this.notify('onPlayPermissionGranted');
                                return [2 /*return*/];
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, window.NativeWebBridge.requestPlayback({
                                    name: window.name,
                                    userInitiated: !!opts.userInitiated,
                                    videoFrame: this.getMediaFrame(),
                                })];
                        case 2:
                            response = _b.sent();
                            this.log('requestPlayback success');
                            this.onMediaPermissionsChanged(response);
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _b.sent();
                            this.log('RequestPlaybackResponseError', err_2);
                            if (!InteroperableMedia.SILENT_ON_ERROR) {
                                throw new errors_1.RequestPlaybackResponseError();
                            }
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        this.getMediaFrame = function () {
            var rect = _this.element.getBoundingClientRect();
            var details = {
                x: rect.left + parent.window.scrollX,
                y: rect.top + parent.window.scrollY,
                width: rect.width,
                height: rect.height,
            };
            if (_this._isFullscreen) {
                details.isFullscreen = true;
            }
            return details;
        };
        this.notify = function (notification) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _this.notifier.notify(notification, args);
        };
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (InteroperableMedia.LOGGING_ENABLED) {
                console.log("[" + constants_1.MODULE_NAME + "]", args);
            }
        };
        this.notifier.subscribe(observer);
        if (typeof window.NativeWebBridge === 'undefined') {
            this.log('NO NATIVE WEB BRIDGE');
            if (!InteroperableMedia.SILENT_ON_ERROR) {
                throw new errors_1.MissingNativeWebBridgeError();
            }
        }
    }
    Object.defineProperty(InteroperableMedia.prototype, "isFullscreen", {
        get: function () {
            return this._isFullscreen;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InteroperableMedia.prototype, "isUserPaused", {
        get: function () {
            return this._isUserPaused;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InteroperableMedia.prototype, "permissionStatus", {
        get: function () {
            return this.lastPermission;
        },
        enumerable: false,
        configurable: true
    });
    InteroperableMedia.LOGGING_ENABLED = false;
    InteroperableMedia.SILENT_ON_ERROR = false;
    return InteroperableMedia;
}());
exports.InteroperableMedia = InteroperableMedia;
exports.default = InteroperableMedia;

},{"@amzn/imdb-gungnir/notifier":"../node_modules/@amzn/imdb-gungnir/notifier/index.js","./constants":"../node_modules/@amzn/imdb-media-interoperability-plugin/constants.js","./errors":"../node_modules/@amzn/imdb-media-interoperability-plugin/errors.js"}],"../node_modules/@amzn/imdb-creativestudio-video-player/utils/fullscreen.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDocumentFullScreenEventHandler = exports.addDocumentFullScreenEventHandler = exports.requestNormalScreen = exports.requestFullscreen = exports.getFullscreenElement = exports.supportsFullscreen = void 0;
var supportsFullscreen = function (e) {
    return (document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        e.webkitSupportsFullscreen);
};
exports.supportsFullscreen = supportsFullscreen;
var getFullscreenElement = function () {
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
};
exports.getFullscreenElement = getFullscreenElement;
var requestFullscreen = function (element) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (element.requestFullscreen) {
            return [2 /*return*/, element.requestFullscreen()];
        }
        else if (element.webkitRequestFullscreen) {
            return [2 /*return*/, element.webkitRequestFullscreen()];
        }
        else if (element.msRequestFullscreen) {
            return [2 /*return*/, element.msRequestFullscreen()];
        }
        else if (element.mozRequestFullScreen) {
            return [2 /*return*/, element.mozRequestFullScreen()];
        }
        else if (element.webkitEnterFullscreen) {
            return [2 /*return*/, element.webkitEnterFullscreen()];
        }
        return [2 /*return*/];
    });
}); };
exports.requestFullscreen = requestFullscreen;
var requestNormalScreen = function (element) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (document.exitFullscreen) {
            return [2 /*return*/, document.exitFullscreen()];
        }
        else if (document.webkitExitFullscreen) {
            return [2 /*return*/, document.webkitExitFullscreen()];
        }
        else if (document.mozCancelFullScreen) {
            return [2 /*return*/, document.mozCancelFullScreen()];
        }
        else if (document.msExitFullscreen) {
            return [2 /*return*/, document.msExitFullscreen()];
        }
        else if (element.webkitExitFullscreen) {
            return [2 /*return*/, element.webkitExitFullscreen()];
        }
        return [2 /*return*/];
    });
}); };
exports.requestNormalScreen = requestNormalScreen;
var addDocumentFullScreenEventHandler = function (eventHandler) {
    if (typeof document.onfullscreenchange !== 'undefined') {
        document.addEventListener('fullscreenchange', eventHandler);
    }
    else if (typeof document.onwebkitfullscreenchange !== 'undefined') {
        document.addEventListener('webkitfullscreenchange', eventHandler);
    }
    else if (typeof document.onmozfullscreenchange !== 'undefined') {
        document.addEventListener('mozfullscreenchange', eventHandler);
    }
    else if (typeof document.onmsfullscreenchange !== 'undefined') {
        document.addEventListener('msfullscreenchange', eventHandler);
    }
};
exports.addDocumentFullScreenEventHandler = addDocumentFullScreenEventHandler;
var removeDocumentFullScreenEventHandler = function (eventHandler) {
    if (typeof document.onfullscreenchange !== 'undefined') {
        document.removeEventListener('fullscreenchange', eventHandler);
    }
    else if (typeof document.onwebkitfullscreenchange !== 'undefined') {
        document.removeEventListener('webkitfullscreenchange', eventHandler);
    }
    else if (typeof document.onmozfullscreenchange !== 'undefined') {
        document.removeEventListener('mozfullscreenchange', eventHandler);
    }
    else if (typeof document.onmsfullscreenchange !== 'undefined') {
        document.removeEventListener('msfullscreenchange', eventHandler);
    }
};
exports.removeDocumentFullScreenEventHandler = removeDocumentFullScreenEventHandler;

},{}],"../node_modules/@amzn/imdb-creativestudio-video-player/video/video.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
var Notifier_1 = require("@amzn/imdb-gungnir/notifier/Notifier");
var InteroperableMedia_1 = require("@amzn/imdb-media-interoperability-plugin/InteroperableMedia");
var fullscreen_1 = require("../utils/fullscreen");
var Video = /** @class */ (function () {
    function Video(init) {
        var _this = this;
        this.notifier = new Notifier_1.default();
        this.observer = {};
        this.fullscreenStatus = 'normal';
        this.playRequested = false;
        this._isUserPaused = false;
        this._playing = false;
        this._muted = null;
        this._volume = null;
        this._progress = 0;
        this._bufferProgress = 0;
        this.useMediaInterop = false;
        this.interopMedia = null;
        this.setFullscreenStatus = function (newStatus) {
            var changed = newStatus !== _this.fullscreenStatus;
            if (changed) {
                _this.fullscreenStatus = newStatus;
                _this.notify('onFullScreenStatusChange', newStatus);
            }
            if (changed && newStatus === 'full') {
                _this.notify('onFullScreen');
                if (_this.interopMedia) {
                    _this.interopMedia.setIsFullscreen(true);
                }
            }
            if (changed && newStatus === 'normal') {
                _this.notify('onNormalScreen');
                if (_this.interopMedia) {
                    _this.interopMedia.setIsFullscreen(false);
                }
            }
        };
        this.activate = function () {
            _this.removeEventListeners();
            _this.addEventListeners();
        };
        this.deactivate = function () {
            _this.removeEventListeners();
        };
        this.enterFullScreen = function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, fullscreen_1.supportsFullscreen)(this.element)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.setFullscreenStatus('requested');
                        return [4 /*yield*/, (0, fullscreen_1.requestFullscreen)(this.element)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.setFullscreenStatus('error');
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.setFullscreenStatus('denied');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.enterNormalScreen = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fullscreen_1.requestNormalScreen)(this.element)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.mute = function () {
            _this.element.muted = true;
        };
        this.unmute = function () {
            _this.element.muted = false;
        };
        this.pause = function (actionDetails) {
            if (actionDetails === void 0) { actionDetails = {}; }
            _this._playing = false;
            _this.playRequested = (actionDetails === null || actionDetails === void 0 ? void 0 : actionDetails.userInitiated) ? false : _this.playRequested;
            _this._isUserPaused = (actionDetails === null || actionDetails === void 0 ? void 0 : actionDetails.userInitiated) === true;
            _this.element.pause();
            if (_this.interopMedia) {
                _this.interopMedia.pause(actionDetails);
            }
        };
        this.play = function (actionDetails) {
            if (actionDetails === void 0) { actionDetails = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var p;
                return __generator(this, function (_a) {
                    p = this.allowPlay();
                    if (this.interopMedia) {
                        this.playRequested = true;
                        return [2 /*return*/, this.interopMedia.play(actionDetails)];
                    }
                    return [2 /*return*/, p];
                });
            });
        };
        this.restart = function (actionDetails) {
            if (actionDetails === void 0) { actionDetails = {}; }
            _this.element.currentTime = 0;
            setTimeout(function () {
                _this.play(actionDetails);
            });
        };
        this.reset = function (actionDetails) {
            if (actionDetails === void 0) { actionDetails = {}; }
            _this.element.currentTime = 0;
            setTimeout(function () {
                _this.pause(actionDetails);
            });
        };
        this.subscribe = function (observer) {
            return _this.notifier.subscribe(observer);
        };
        this.unsubscribe = function (observer) {
            return _this.notifier.unsubscribe(observer);
        };
        this.allowPlay = function () { return __awaiter(_this, void 0, void 0, function () {
            var playSuccess, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        playSuccess = false;
                        this._playError = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.element.play()];
                    case 2:
                        _a.sent();
                        playSuccess = true;
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this._playError = e_2;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, playSuccess];
                }
            });
        }); };
        this.onPlayPermissionGranted = function () {
            if (_this.playRequested) {
                _this.allowPlay();
            }
        };
        this.onPlayPermissionDenied = function () {
            _this.pause({ userInitiated: false });
        };
        this.onPlayPermissionPending = function () {
            // console.log('onPlayPermissionPending');
        };
        this.setElementRequirements = function () {
            _this.volumeChangeEvent();
            if (_this.element.controlsList) {
                _this.element.controlsList = 'nodownload nofullscreen noremoteplayback';
            }
        };
        this.updateProgress = function () {
            var lastProgress = _this.progress;
            _this._progress = _this.duration ? _this.time / _this.duration : 0;
            if (lastProgress !== _this.progress) {
                _this.notify('onProgressChange', _this.progress);
            }
        };
        this.updateResourceLoadProgress = function () {
            if (_this.element.readyState === 4) {
                _this._bufferProgress = 1;
                _this.notify('onBufferProgressChange', _this.resourceLoadProgress);
                return;
            }
            if (_this.duration > 0) {
                for (var i = 0; i < _this.element.buffered.length; i++) {
                    if (_this.element.buffered.start(_this.element.buffered.length - 1 - i) < _this.time) {
                        _this._bufferProgress = _this.element.buffered.end(_this.element.buffered.length - 1 - i) / _this.duration;
                        _this.notify('onBufferProgressChange', _this.resourceLoadProgress);
                        break;
                    }
                }
            }
        };
        this.notify = function (n) {
            var r = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                r[_i - 1] = arguments[_i];
            }
            _this.notifier.notify(n, r);
        };
        this.initEvent = function () {
            _this.updateProgress();
            _this.notify('onInit');
        };
        this.metadataEvent = function () {
            _this.updateProgress();
            _this.notify('onMetaData');
        };
        this.pauseEvent = function () {
            _this._playing = false;
            _this.notify('onPause');
        };
        this.playEvent = function () {
            var changed = _this.playing === false;
            _this._playing = true;
            _this.updateProgress();
            if (changed) {
                _this.notify('onPlay');
            }
        };
        this.playingEvent = function () {
            var changed = _this.playing === false;
            _this._playing = true;
            if (_this.useMediaInterop) {
                _this.interopMedia.setMediaPlaying();
            }
            if (changed) {
                _this.notify('onPlaying');
            }
        };
        this.endEvent = function () {
            var _a;
            _this._playing = false;
            _this.notify('onComplete');
            (_a = _this.interopMedia) === null || _a === void 0 ? void 0 : _a.setMediaEnded();
        };
        this.timeUpdateEvent = function () {
            _this.updateProgress();
            _this.notify('onTimeUpdate');
        };
        this.durationChangeEvent = function () {
            _this.updateProgress();
        };
        this.volumeChangeEvent = function () {
            var muteChange = _this.element.muted !== _this._muted;
            var volumeChange = _this.element.volume !== _this._volume;
            _this._muted = _this.element.muted;
            _this._volume = _this.element.volume;
            if (muteChange) {
                _this.notify(_this.muted ? 'onMute' : 'onUnmute');
            }
            if (volumeChange) {
                _this.notify('onVolumeChange', _this.element.volume);
            }
        };
        this.progressEvent = function () {
            _this.updateResourceLoadProgress();
        };
        this.fullscreenEvent = function () {
            _this.setFullscreenStatus(_this.isFullScreen ? 'full' : 'normal');
        };
        this.addEventListeners = function () {
            _this.element.addEventListener('loadstart', _this.initEvent);
            _this.element.addEventListener('timeupdate', _this.timeUpdateEvent);
            _this.element.addEventListener('loadedmetadata', _this.metadataEvent);
            _this.element.addEventListener('durationchange', _this.durationChangeEvent);
            _this.element.addEventListener('play', _this.playEvent);
            _this.element.addEventListener('playing', _this.playingEvent);
            _this.element.addEventListener('pause', _this.pauseEvent);
            _this.element.addEventListener('ended', _this.endEvent);
            _this.element.addEventListener('volumechange', _this.volumeChangeEvent);
            _this.element.addEventListener('progress', _this.progressEvent);
            _this.element.addEventListener('canplaythrough', _this.progressEvent);
            _this.element.addEventListener('fullscreenchange', _this.fullscreenEvent);
            _this.element.addEventListener('mozfullscreenchange', _this.fullscreenEvent);
            _this.element.addEventListener('MSFullscreenChange', _this.fullscreenEvent);
            _this.element.addEventListener('webkitfullscreenchange', _this.fullscreenEvent);
            _this.element.addEventListener('webkitendfullscreen', _this.fullscreenEvent);
            document.addEventListener('webkitendfullscreen', _this.fullscreenEvent);
            (0, fullscreen_1.addDocumentFullScreenEventHandler)(_this.fullscreenEvent);
        };
        this.removeEventListeners = function () {
            _this.element.removeEventListener('loadstart', _this.initEvent);
            _this.element.removeEventListener('timeupdate', _this.timeUpdateEvent);
            _this.element.removeEventListener('loadedmetadata', _this.metadataEvent);
            _this.element.removeEventListener('durationchange', _this.durationChangeEvent);
            _this.element.removeEventListener('play', _this.playEvent);
            _this.element.removeEventListener('playing', _this.playingEvent);
            _this.element.removeEventListener('pause', _this.pauseEvent);
            _this.element.removeEventListener('ended', _this.endEvent);
            _this.element.removeEventListener('volumechange', _this.volumeChangeEvent);
            _this.element.removeEventListener('progress', _this.progressEvent);
            _this.element.removeEventListener('canplaythrough', _this.progressEvent);
            _this.element.removeEventListener('fullscreenchange', _this.fullscreenEvent);
            _this.element.removeEventListener('mozfullscreenchange', _this.fullscreenEvent);
            _this.element.removeEventListener('MSFullscreenChange', _this.fullscreenEvent);
            _this.element.removeEventListener('webkitfullscreenchange', _this.fullscreenEvent);
            (0, fullscreen_1.removeDocumentFullScreenEventHandler)(_this.fullscreenEvent);
        };
        this.element = init.element;
        this.initAttributes = this.element.attributes;
        this.observer = init.observer || {};
        this.notifier.subscribe(this.observer);
        this.activate();
        this.setElementRequirements();
        if (!!init.useMediaInterop) {
            var ref = this;
            this.mediaInteropObserver = {
                onPlayPermissionGranted: ref.onPlayPermissionGranted,
                onPlayPermissionDenied: ref.onPlayPermissionDenied,
                onPlayPermissionPending: ref.onPlayPermissionPending,
            };
            this.interopMedia = new InteroperableMedia_1.default(this.element, this.mediaInteropObserver);
        }
    }
    Object.defineProperty(Video.prototype, "muted", {
        get: function () {
            return this._muted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "isFullScreen", {
        get: function () {
            return !!(0, fullscreen_1.getFullscreenElement)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "paused", {
        get: function () {
            return this.element.paused;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "isUserPaused", {
        get: function () {
            return this._isUserPaused;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "playing", {
        get: function () {
            return this._playing;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "playError", {
        get: function () {
            return this._playError;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "time", {
        get: function () {
            return this.element.currentTime || 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "duration", {
        get: function () {
            return this.element.duration || 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "resourceLoadProgress", {
        get: function () {
            return this._bufferProgress;
        },
        enumerable: false,
        configurable: true
    });
    return Video;
}());
exports.Video = Video;
exports.default = Video;

},{"@amzn/imdb-gungnir/notifier/Notifier":"../node_modules/@amzn/imdb-gungnir/notifier/Notifier.js","@amzn/imdb-media-interoperability-plugin/InteroperableMedia":"../node_modules/@amzn/imdb-media-interoperability-plugin/InteroperableMedia.js","../utils/fullscreen":"../node_modules/@amzn/imdb-creativestudio-video-player/utils/fullscreen.js"}],"../node_modules/@amzn/imdb-creativestudio-video-player/videoplayer/videoplayer.js":[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPlayer = exports.VideoPlayerConfigDefault = void 0;
exports.VideoPlayerConfigDefault = {
    preferNativeFullScreenControls: true,
};
var VideoPlayer = /** @class */ (function () {
    function VideoPlayer(video, ui, init) {
        var _this = this;
        if (init === void 0) { init = exports.VideoPlayerConfigDefault; }
        this.video = video;
        this.ui = ui;
        this.isSeeking = false;
        this.normalScreenControls = false;
        this._uiEnabled = true;
        this.play = function (actionDetails) {
            if (actionDetails === void 0) { actionDetails = {}; }
            _this.video.play(actionDetails);
        };
        this.pause = function (actionDetails) {
            if (actionDetails === void 0) { actionDetails = {}; }
            _this.video.pause(actionDetails);
        };
        this.updateUIEnabled = function () {
            var enabled = _this.uiEnabled;
            Object.keys(_this.ui).forEach(function (key) {
                var uiItem = _this.ui[key];
                uiItem.enabled = enabled;
            });
        };
        this.setPlaybackStatus = function (status) {
            var _a;
            if (_this.video.progress === 1 && status === 'paused') {
                status = 'completed';
            }
            _this._playbackStatus = status;
            if ((_a = _this.ui) === null || _a === void 0 ? void 0 : _a.slateButton) {
                _this.ui.slateButton.playbackStatus = status !== 'seeking' ? _this.playbackStatus : _this.seekStartPlaybackStatus;
            }
        };
        this.onUIProgressBarClick = function (offset) {
            _this.currentTime = _this.video.duration * offset;
        };
        this.onUIProgressBarDragOffset = function (offset) {
            _this.currentTime = _this.video.duration * offset;
            _this.seekStartPlaybackStatus = _this.playbackStatus !== 'seeking' ? _this.playbackStatus : _this.seekStartPlaybackStatus;
            if (!_this.isSeeking) {
                _this.isSeeking = true;
                _this.setPlaybackStatus('seeking');
            }
        };
        this.onUIProgressBarDragEnd = function () {
            _this.isSeeking = false;
            _this.setPlaybackStatus(_this.playbackStatus !== 'seeking' ? _this.playbackStatus : _this.seekStartPlaybackStatus);
        };
        this.onVideoInit = function () {
            _this.setPlaybackStatus('notstarted');
        };
        this.onVideoComplete = function () {
            var _a;
            _this.setPlaybackStatus('completed');
            if ((_a = _this.ui) === null || _a === void 0 ? void 0 : _a.playButton) {
                _this.ui.playButton.status = 'pause';
            }
        };
        this.onVideoBufferProgressChange = function (bufferProgress) {
            var _a;
            if ((_a = _this.ui) === null || _a === void 0 ? void 0 : _a.progressBar) {
                _this.ui.progressBar.bufferProgress = bufferProgress;
            }
        };
        this.onVideoProgressChange = function (progress) {
            var _a;
            if ((_a = _this.ui) === null || _a === void 0 ? void 0 : _a.progressBar) {
                _this.ui.progressBar.progress = progress;
            }
        };
        this.onVideoMute = function () {
            var _a;
            if ((_a = _this.ui) === null || _a === void 0 ? void 0 : _a.muteButton) {
                _this.ui.muteButton.status = 'mute';
            }
        };
        this.onVideoUnmute = function () {
            var _a;
            if ((_a = _this.ui) === null || _a === void 0 ? void 0 : _a.muteButton) {
                _this.ui.muteButton.status = 'unmute';
            }
        };
        this.onVideoFullScreen = function () {
            var _a;
            _this.normalScreenControls = _this.videoElement.controls;
            if (_this.init.preferNativeFullScreenControls) {
                _this.videoElement.controls = true;
            }
            if ((_a = _this.ui) === null || _a === void 0 ? void 0 : _a.fullscreenButton) {
                _this.ui.fullscreenButton.status = 'full';
            }
        };
        this.onVideoNormalScreen = function () {
            var _a;
            _this.videoElement.controls = _this.normalScreenControls;
            if ((_a = _this.ui) === null || _a === void 0 ? void 0 : _a.fullscreenButton) {
                _this.ui.fullscreenButton.status = 'normal';
            }
        };
        this.onVideoFullScreenError = function () {
            var _a;
            if ((_a = _this.ui) === null || _a === void 0 ? void 0 : _a.fullscreenButton) {
                _this.ui.fullscreenButton.status = 'normal';
            }
        };
        this.onVideoPlay = function () {
            var _a;
            _this.setPlaybackStatus('playing');
            if ((_a = _this.ui) === null || _a === void 0 ? void 0 : _a.playButton) {
                _this.ui.playButton.status = 'play';
            }
        };
        this.onVideoPause = function () {
            var _a;
            _this.setPlaybackStatus('paused');
            if ((_a = _this.ui) === null || _a === void 0 ? void 0 : _a.playButton) {
                _this.ui.playButton.status = 'pause';
            }
        };
        this.onVideoPlayError = function () {
            var _a;
            // TO-DO: On Play Error VideoNotification
            // console.log('video play error');
            _this.setPlaybackStatus('error');
            if ((_a = _this.ui) === null || _a === void 0 ? void 0 : _a.playButton) {
                _this.ui.playButton.status = 'pause';
            }
        };
        this.onUIFullScreenRequest = function () {
            var fullscreenSuccess = _this.video.enterFullScreen();
            if (!fullscreenSuccess) {
                _this.onVideoFullScreenError();
            }
        };
        this.onUINormalScreenRequest = function () {
            _this.video.enterNormalScreen();
        };
        this.onUIPlayRequest = function () { return __awaiter(_this, void 0, void 0, function () {
            var playSuccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.video.play()];
                    case 1:
                        playSuccess = _a.sent();
                        if (!playSuccess) {
                            this.onVideoPlayError();
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.onUIPauseRequest = function () {
            _this.video.pause({ userInitiated: true });
        };
        this.onUIMuteRequest = function () {
            _this.video.mute();
        };
        this.onUIUnmuteRequest = function () {
            _this.video.unmute();
        };
        this.onUIRestartRequest = function () {
            _this.video.restart({ userInitiated: true });
        };
        var ref = this;
        this.init = __assign(__assign({}, exports.VideoPlayerConfigDefault), init);
        this.video.subscribe({
            onInit: ref.onVideoInit,
            onComplete: ref.onVideoComplete,
            onPause: ref.onVideoPause,
            onPlay: ref.onVideoPlay,
            onBufferProgressChange: ref.onVideoBufferProgressChange,
            onProgressChange: ref.onVideoProgressChange,
            onMute: ref.onVideoMute,
            onUnmute: ref.onVideoUnmute,
            onFullScreen: ref.onVideoFullScreen,
            onNormalScreen: ref.onVideoNormalScreen,
        });
        if (ui === null || ui === void 0 ? void 0 : ui.fullscreenButton) {
            this.ui.fullscreenButton.subscribe({
                onRequestFullScreen: ref.onUIFullScreenRequest,
                onRequestNormalScreen: ref.onUINormalScreenRequest,
            });
        }
        if (ui === null || ui === void 0 ? void 0 : ui.playButton) {
            this.ui.playButton.subscribe({
                onPlayRequest: ref.onUIPlayRequest,
                onPauseRequest: ref.onUIPauseRequest,
            });
        }
        if (ui === null || ui === void 0 ? void 0 : ui.muteButton) {
            this.ui.muteButton.subscribe({
                onMuteRequest: ref.onUIMuteRequest,
                onUnmuteRequest: ref.onUIUnmuteRequest,
            });
            this.ui.muteButton.status = this.video.muted ? 'mute' : 'unmute';
        }
        if (ui === null || ui === void 0 ? void 0 : ui.progressBar) {
            this.ui.progressBar.subscribe({
                onClick: ref.onUIProgressBarClick,
                onDragOffset: ref.onUIProgressBarDragOffset,
                onDragEnd: ref.onUIProgressBarDragEnd,
            });
        }
        if (ui === null || ui === void 0 ? void 0 : ui.slateButton) {
            this.ui.slateButton.subscribe({
                onRequestPause: ref.onUIPauseRequest,
                onRequestPlay: ref.onUIPlayRequest,
                onRequestRestart: ref.onUIRestartRequest,
            });
        }
    }
    Object.defineProperty(VideoPlayer.prototype, "videoElement", {
        get: function () {
            return this.video.element;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VideoPlayer.prototype, "currentTime", {
        get: function () {
            return this.videoElement.currentTime;
        },
        set: function (value) {
            this.videoElement.currentTime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VideoPlayer.prototype, "playbackStatus", {
        get: function () {
            return this._playbackStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VideoPlayer.prototype, "uiEnabled", {
        get: function () {
            return this._uiEnabled;
        },
        set: function (value) {
            var changed = value !== this._uiEnabled;
            this._uiEnabled = value;
            if (changed) {
                this.updateUIEnabled();
            }
        },
        enumerable: false,
        configurable: true
    });
    return VideoPlayer;
}());
exports.VideoPlayer = VideoPlayer;
exports.default = VideoPlayer;

},{}],"../node_modules/@amzn/imdb-advertising-tracking/constants.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIDEO_TYPE_EVENT_TRACKER_MAP = exports.VIDEO_PLAYBACK_EVENT_METRIC_MAP = exports.METRIC_VIDEO_COMPLETE = exports.METRIC_VIDEO_THIRD_QUARTILE = exports.METRIC_VIDEO_MIDPOINT = exports.METRIC_VIDEO_FIRST_QUARTILE = exports.METRIC_VIDEO_START = exports.METRIC_CUSTOM_INTERACTION = exports.METRIC_CLICK_CAROUSEL_THUMBNAIL = exports.METRIC_CLICK_CAROUSEL_CTA = exports.METRIC_CLICK_YOUTUBE = exports.METRIC_CLICK_INSTAGRAM = exports.METRIC_CLICK_TWITTER = exports.METRIC_CLICK_FACEBOOK = exports.METRIC_CLICK_CUSTOM_NAV = exports.METRIC_CLICK_COLLAPSE = exports.METRIC_CLICK_EXPAND = exports.METRIC_CLICK_SYNOPSIS_NAV = exports.METRIC_CLICK_CHARACTERS_NAV = exports.METRIC_CLICK_GALLERY_NAV = exports.METRIC_CLICK_VIDEO_NAV = exports.METRIC_CLICK_SECONDARY_CTA = exports.METRIC_CLICK_PRIMARY_CTA = exports.ALLOWED_NO_PREFIX_METRICS = exports.SITEWIDE_METRIC_MAP = exports.BASE_METRIC_MAP = exports.METRIC_WATCHLIST_DELETE = exports.METRIC_WATCHLIST_ADD = exports.METRIC_ENGAGEMENT_DEPTH = exports.METRIC_ENGAGEMENTS_TOTAL = exports.METRIC_DWELL_TIME = exports.METRIC_TIME_UNTIL_ENGAGEMENT = exports.METRIC_VIEWABLE_IMPRESSION = exports.METRIC_VIEWED = exports.METRIC_INIT = exports.TRACKING_URL = exports.REF_MARKER_WATCHLIST_RIBBION = exports.REF_MARKER_MAX_LENGTH = exports.REF_MARKER_REGEX = exports.REF_MARKER_DELIMETER = exports.REF_MARKER_PREFIX = exports.PAGE_ACTION_REGEX = exports.PAGE_ACTION_DELIMETER = exports.PAGE_ACTION_PREFIX = exports.PAGE_ACTION_MAX_LENGTH = exports.MODULE_NAME = void 0;
exports.MODULE_NAME = 'IMDbAdvertisingTracking';
// export const METRIC_ID_LENGTH = 5;
exports.PAGE_ACTION_MAX_LENGTH = 30;
exports.PAGE_ACTION_PREFIX = 'crt';
exports.PAGE_ACTION_DELIMETER = '-';
var _pageAction_regex = "^".concat(exports.PAGE_ACTION_PREFIX).concat(exports.PAGE_ACTION_DELIMETER);
exports.PAGE_ACTION_REGEX = new RegExp(_pageAction_regex);
exports.REF_MARKER_PREFIX = 'crt';
exports.REF_MARKER_DELIMETER = '_';
var _refMarker_regex = "^".concat(exports.REF_MARKER_PREFIX).concat(exports.REF_MARKER_DELIMETER);
exports.REF_MARKER_REGEX = new RegExp(_refMarker_regex);
exports.REF_MARKER_MAX_LENGTH = 64;
exports.REF_MARKER_WATCHLIST_RIBBION = 'wl_ribbon';
exports.TRACKING_URL = '/tr/';
/**
 * # Initialization Metric
 * Fired when Embeddable content first knows its slot location. Key metric for indicating experience has been delivered to page for user
 */
exports.METRIC_INIT = {
    name: 'init',
    type: 'measurement',
    pageAction: '{prefix}-init'
};
/**
 * # Viewed Metric
 * Fired immediately when the experience is at least 50% inside the user’s viewport
 */
exports.METRIC_VIEWED = {
    name: 'view',
    type: 'measurement',
    pageAction: '{prefix}-view'
};
/**
 * # Viewed Impression Metric
 * Fired once, after the experience has been in the user's viewport for one continuous second
 */
exports.METRIC_VIEWABLE_IMPRESSION = {
    name: 'vimp',
    type: 'measurement',
    pageAction: '{prefix}-vimp'
};
/**
 * # time until first engagement Metric
 * Fired after the first user action (click|touch|swipe|keypress), timed from the time the experience enters the viewport to the time the user first clicks.
 */
exports.METRIC_TIME_UNTIL_ENGAGEMENT = {
    name: 'vtoint',
    type: 'measurement',
    pageAction: '{prefix}-vtoint-{ms}'
};
/**
 * # Dwell Time  Metric
 * Fired when the user leaves the experience, either by closing the app, putting a device down, switching to another app, or navigating to another page. Calculated by the difference between the time of the impression metric and the time when the user leaves the experience
 */
exports.METRIC_DWELL_TIME = {
    name: 'dwell',
    type: 'measurement',
    pageAction: '{prefix}-dwell-{ms}'
};
/**
 * # Engagement Total Metric
 * Total number of user actions (click|touch|swipe|keypress) while using the experience
 */
exports.METRIC_ENGAGEMENTS_TOTAL = {
    name: 'engtot',
    type: 'aggregate',
    pageAction: '{prefix}-engtot-{count}'
};
/**
 * # Total Engagements Metric
 * Total number of _unique_engagement metrics fired while using the experience along with the total number of engagement affordances in the overall experience
 */
exports.METRIC_ENGAGEMENT_DEPTH = {
    name: 'engdpth',
    type: 'aggregate',
    pageAction: '{prefix}-engdpth-{count}-{total}'
};
/**
 * # Watchlist Add Metric
 * Adding a title to a user's watchlist
 */
exports.METRIC_WATCHLIST_ADD = {
    name: 'watchlist-add',
    type: 'engagement',
    pageAction: 'watchlist-add-{tconst}',
    multiple: true
};
/**
 * # Watchlist Delete Metric
 * Adding a title to a user's watchlist
 */
exports.METRIC_WATCHLIST_DELETE = {
    name: 'watchlist-del',
    type: 'engagement',
    pageAction: 'watchlist-del-{tconst}',
    multiple: true
};
exports.BASE_METRIC_MAP = {
    init: exports.METRIC_INIT,
    view: exports.METRIC_VIEWED,
    viewableImpression: exports.METRIC_VIEWABLE_IMPRESSION,
    vimp: exports.METRIC_VIEWABLE_IMPRESSION,
    timeToEngagement: exports.METRIC_TIME_UNTIL_ENGAGEMENT,
    vtoint: exports.METRIC_TIME_UNTIL_ENGAGEMENT,
    engdpth: exports.METRIC_ENGAGEMENT_DEPTH,
    engtot: exports.METRIC_ENGAGEMENTS_TOTAL,
    dwell: exports.METRIC_DWELL_TIME,
    engagementTotal: exports.METRIC_ENGAGEMENTS_TOTAL,
    engagementDepth: exports.METRIC_ENGAGEMENT_DEPTH
};
exports.SITEWIDE_METRIC_MAP = {
    'watchlist-add': exports.METRIC_WATCHLIST_ADD,
    watchlistAdd: exports.METRIC_WATCHLIST_ADD,
    'watchlist-del': exports.METRIC_WATCHLIST_DELETE,
    watchlistDelete: exports.METRIC_WATCHLIST_DELETE
};
exports.ALLOWED_NO_PREFIX_METRICS = new Set();
Object.keys(exports.SITEWIDE_METRIC_MAP).forEach(function (key) {
    var metric = exports.SITEWIDE_METRIC_MAP[key];
    exports.ALLOWED_NO_PREFIX_METRICS.add(metric.name);
});
exports.METRIC_CLICK_PRIMARY_CTA = {
    name: 'clickPrimaryCTA',
    type: 'engagement',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_SECONDARY_CTA = {
    name: 'clickSecondaryCTA',
    type: 'engagement',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_VIDEO_NAV = {
    name: 'clickVideoNav',
    type: 'engagement',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_GALLERY_NAV = {
    name: 'clickGalleryNav',
    type: 'engagement',
    tracker: 'tabClick6',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_CHARACTERS_NAV = {
    name: 'clickCharactersNav',
    type: 'engagement',
    tracker: 'tabClick7',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_SYNOPSIS_NAV = {
    name: 'clickSynopsisNav',
    type: 'engagement',
    tracker: 'tabClick8',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_EXPAND = {
    name: 'clickExpand',
    type: 'engagement',
    tracker: 'tabClick9',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_COLLAPSE = {
    name: 'clickCollapse',
    type: 'engagement',
    tracker: 'tabClick10',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_CUSTOM_NAV = {
    name: 'clickCustomNav',
    type: 'engagement',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_FACEBOOK = {
    name: 'clickFacebook',
    type: 'engagement',
    tracker: 'adCustomAction3',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_TWITTER = {
    name: 'clickTwitter',
    type: 'engagement',
    tracker: 'adCustomAction4',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_INSTAGRAM = {
    name: 'clickInstagram',
    type: 'engagement',
    tracker: 'adCustomAction5',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_YOUTUBE = {
    name: 'clickYoutube',
    type: 'engagement',
    tracker: 'adCustomAction6',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_CAROUSEL_CTA = {
    name: 'clickCarouselCTA',
    type: 'engagement',
    tracker: 'adCustomAction7',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CLICK_CAROUSEL_THUMBNAIL = {
    name: 'clickCarouselThumbnail',
    type: 'engagement',
    tracker: 'adCustomAction8',
    pageAction: '{prefix}-{pageAction}'
};
exports.METRIC_CUSTOM_INTERACTION = {
    name: 'customInteraction',
    type: 'engagement',
    pageAction: '{prefix}-{pageAction}'
};
/**
 * All Video Events
 */
exports.METRIC_VIDEO_START = {
    name: 'videoStart',
    type: 'video',
    tracker: 'videoStart',
    pageAction: '{prefix}-{pageAction}-start'
};
exports.METRIC_VIDEO_FIRST_QUARTILE = {
    name: 'videoFirstQuartile',
    type: 'video',
    tracker: 'videoFirstQuartile',
    pageAction: '{prefix}-{pageAction}-quartile1'
};
exports.METRIC_VIDEO_MIDPOINT = {
    name: 'videoMidpoint',
    type: 'video',
    tracker: 'videoMidpoint',
    pageAction: '{prefix}-{pageAction}-midpoint'
};
exports.METRIC_VIDEO_THIRD_QUARTILE = {
    name: 'videoThirdQuartile',
    type: 'video',
    tracker: 'videoThirdQuartile',
    pageAction: '{prefix}-{pageAction}-quartile3'
};
exports.METRIC_VIDEO_COMPLETE = {
    name: 'videoComplete',
    type: 'video',
    tracker: 'videoComplete',
    pageAction: '{prefix}-{pageAction}-complete'
};
exports.VIDEO_PLAYBACK_EVENT_METRIC_MAP = {
    start: exports.METRIC_VIDEO_START,
    firstQuartile: exports.METRIC_VIDEO_FIRST_QUARTILE,
    midpoint: exports.METRIC_VIDEO_MIDPOINT,
    thirdQuartile: exports.METRIC_VIDEO_THIRD_QUARTILE,
    complete: exports.METRIC_VIDEO_COMPLETE
};
exports.VIDEO_TYPE_EVENT_TRACKER_MAP = new Map();
exports.VIDEO_TYPE_EVENT_TRACKER_MAP.set('intro', {
    start: 'videoStart2',
    complete: 'videoComplete2',
    firstQuartile: 'videoFirstQuartile2',
    midpoint: 'videoMidpoint2',
    thirdQuartile: 'videoThirdQuartile2'
});
exports.VIDEO_TYPE_EVENT_TRACKER_MAP.set('trailer1', {
    start: 'videoStart3',
    complete: 'videoComplete3',
    firstQuartile: 'videoFirstQuartile3',
    midpoint: 'videoMidpoint3',
    thirdQuartile: 'videoThirdQuartile3'
});
exports.VIDEO_TYPE_EVENT_TRACKER_MAP.set('trailer2', {
    start: 'videoStart4',
    complete: 'videoComplete4',
    firstQuartile: 'videoFirstQuartile4',
    midpoint: 'videoMidpoint4',
    thirdQuartile: 'videoThirdQuartile4'
});
exports.VIDEO_TYPE_EVENT_TRACKER_MAP.set('trailer3', {
    start: 'videoStart5',
    complete: 'videoComplete5',
    firstQuartile: 'videoFirstQuartile5',
    midpoint: 'videoMidpoint5',
    thirdQuartile: 'videoThirdQuartile5'
});
exports.VIDEO_TYPE_EVENT_TRACKER_MAP.set('trailer4', {
    start: 'adCustomAction1051',
    firstQuartile: 'adCustomAction1052',
    midpoint: 'adCustomAction1053',
    thirdQuartile: 'adCustomAction1054',
    complete: 'adCustomAction1055'
});
exports.VIDEO_TYPE_EVENT_TRACKER_MAP.set('trailer5', {
    start: 'adCustomAction1056',
    firstQuartile: 'adCustomAction1057',
    midpoint: 'adCustomAction1058',
    thirdQuartile: 'adCustomAction1059',
    complete: 'adCustomAction1060'
});
exports.VIDEO_TYPE_EVENT_TRACKER_MAP.set('trailer6', {
    start: 'adCustomAction1061',
    firstQuartile: 'adCustomAction1062',
    midpoint: 'adCustomAction1063',
    thirdQuartile: 'adCustomAction1064',
    complete: 'adCustomAction1065'
});
exports.VIDEO_TYPE_EVENT_TRACKER_MAP.set('trailer7', {
    start: 'adCustomAction1066',
    firstQuartile: 'adCustomAction1067',
    midpoint: 'adCustomAction1068',
    thirdQuartile: 'adCustomAction1069',
    complete: 'adCustomAction1070'
});
exports.VIDEO_TYPE_EVENT_TRACKER_MAP.set('trailer8', {
    start: 'adCustomAction1071',
    firstQuartile: 'adCustomAction1072',
    midpoint: 'adCustomAction1073',
    thirdQuartile: 'adCustomAction1074',
    complete: 'adCustomAction1075'
});
exports.VIDEO_TYPE_EVENT_TRACKER_MAP.set('trailer9', {
    start: 'adCustomAction1076',
    firstQuartile: 'adCustomAction1077',
    midpoint: 'adCustomAction1078',
    thirdQuartile: 'adCustomAction1079',
    complete: 'adCustomAction1080'
});
exports.VIDEO_TYPE_EVENT_TRACKER_MAP.set('trailer10', {
    start: 'adCustomAction1081',
    firstQuartile: 'adCustomAction1082',
    midpoint: 'adCustomAction1083',
    thirdQuartile: 'adCustomAction1084',
    complete: 'adCustomAction1085'
});

},{}],"../node_modules/@amzn/imdb-advertising-tracking/errors.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidGetRedirect = exports.RefMarkerFormatError = exports.RefMarkerLengthError = exports.PageActionPrefixError = exports.PageActionLengthError = exports.MissingPageDetailsError = exports.MissingDynamicPropsError = exports.MetricNotSitewideMetric = exports.MetricNotBaseMetric = exports.AdMetricIndexRangeError = void 0;
var constants_1 = require("./constants");
var AdMetricIndexRangeError = /** @class */ (function (_super) {
    __extends(AdMetricIndexRangeError, _super);
    function AdMetricIndexRangeError(metricName, incorrectRange, minRange, maxRange) {
        var _this = this;
        var message = "trackAdMetric(".concat(metricName, ") for index:").concat(incorrectRange, " is outside the index boundary between [").concat(minRange, " - ").concat(maxRange, "]");
        _this = _super.call(this, message) || this;
        _this.name = "".concat(constants_1.MODULE_NAME, "_AdMetricIndexRangeError");
        return _this;
    }
    return AdMetricIndexRangeError;
}(Error));
exports.AdMetricIndexRangeError = AdMetricIndexRangeError;
var MetricNotBaseMetric = /** @class */ (function (_super) {
    __extends(MetricNotBaseMetric, _super);
    function MetricNotBaseMetric(metricName) {
        var _this = this;
        var message = "trackBaseMetric(".concat(metricName, ") is not a recognized base tracking metric. Make sure metricName is defined as a base tracking metric");
        _this = _super.call(this, message) || this;
        _this.name = "".concat(constants_1.MODULE_NAME, "_MetricNotBaseMetric");
        return _this;
    }
    return MetricNotBaseMetric;
}(Error));
exports.MetricNotBaseMetric = MetricNotBaseMetric;
var MetricNotSitewideMetric = /** @class */ (function (_super) {
    __extends(MetricNotSitewideMetric, _super);
    function MetricNotSitewideMetric(metricName) {
        var _this = this;
        var message = "trackSitewideMetric(".concat(metricName, ") is not a recognized sitewide tracking metric. Make sure metricName is defined as a sitewide tracking metric");
        _this = _super.call(this, message) || this;
        _this.name = "".concat(constants_1.MODULE_NAME, "_MetricNotSitewideMetric");
        return _this;
    }
    return MetricNotSitewideMetric;
}(Error));
exports.MetricNotSitewideMetric = MetricNotSitewideMetric;
var MissingDynamicPropsError = /** @class */ (function (_super) {
    __extends(MissingDynamicPropsError, _super);
    function MissingDynamicPropsError(metricPattern, props) {
        if (props === void 0) { props = {}; }
        var _this = this;
        var message = "".concat(metricPattern, " is not being provided correct dynamic properties[").concat(JSON.stringify(props), "]");
        _this = _super.call(this, message) || this;
        _this.name = "".concat(constants_1.MODULE_NAME, "_MissingDynamicPropsError");
        return _this;
    }
    return MissingDynamicPropsError;
}(Error));
exports.MissingDynamicPropsError = MissingDynamicPropsError;
var MissingPageDetailsError = /** @class */ (function (_super) {
    __extends(MissingPageDetailsError, _super);
    function MissingPageDetailsError(metricName) {
        var _this = this;
        var message = "".concat(metricName, " tracked before defining PageDetails. pageType and subPageType values must be defined before firing metrics. Call 'setPageDetails( value:PageDetails )'  or 'setTrackingInit( value:TrackingInit )' before tracking metrics");
        _this = _super.call(this, message) || this;
        _this.name = "".concat(constants_1.MODULE_NAME, "_MissingPageDetailsError");
        return _this;
    }
    return MissingPageDetailsError;
}(Error));
exports.MissingPageDetailsError = MissingPageDetailsError;
var PageActionLengthError = /** @class */ (function (_super) {
    __extends(PageActionLengthError, _super);
    function PageActionLengthError(pageAction) {
        var _this = this;
        var message = "".concat(pageAction, " exceeds the ").concat(constants_1.PAGE_ACTION_MAX_LENGTH, " character limit");
        _this = _super.call(this, message) || this;
        _this.name = "".concat(constants_1.MODULE_NAME, "_PageActionLengthError");
        return _this;
    }
    return PageActionLengthError;
}(Error));
exports.PageActionLengthError = PageActionLengthError;
var PageActionPrefixError = /** @class */ (function (_super) {
    __extends(PageActionPrefixError, _super);
    function PageActionPrefixError(pageAction) {
        var _this = this;
        var message = "".concat(pageAction, " does not start with ").concat(constants_1.PAGE_ACTION_PREFIX);
        _this = _super.call(this, message) || this;
        _this.name = "".concat(constants_1.MODULE_NAME, "_PageActionPrefixError");
        return _this;
    }
    return PageActionPrefixError;
}(Error));
exports.PageActionPrefixError = PageActionPrefixError;
var RefMarkerLengthError = /** @class */ (function (_super) {
    __extends(RefMarkerLengthError, _super);
    function RefMarkerLengthError(refMarker) {
        var _this = this;
        var message = "".concat(refMarker, " exceeds the ").concat(constants_1.REF_MARKER_MAX_LENGTH, " character limit");
        _this = _super.call(this, message) || this;
        _this.name = "".concat(constants_1.MODULE_NAME, "_RefMarkerLengthError");
        return _this;
    }
    return RefMarkerLengthError;
}(Error));
exports.RefMarkerLengthError = RefMarkerLengthError;
var RefMarkerFormatError = /** @class */ (function (_super) {
    __extends(RefMarkerFormatError, _super);
    function RefMarkerFormatError(refMarker) {
        var _this = this;
        var message = "RefMarker must start with ".concat(constants_1.REF_MARKER_PREFIX, ". Received ").concat(refMarker);
        _this = _super.call(this, message) || this;
        _this.name = "".concat(constants_1.MODULE_NAME, "_MetricRefMarkerFormatError");
        return _this;
    }
    return RefMarkerFormatError;
}(Error));
exports.RefMarkerFormatError = RefMarkerFormatError;
var InvalidGetRedirect = /** @class */ (function (_super) {
    __extends(InvalidGetRedirect, _super);
    function InvalidGetRedirect() {
        var _this = this;
        var message = "window.getRedirect macro was not replaced. Make sure the function is not loaded from an external file";
        _this = _super.call(this, message) || this;
        _this.name = "".concat(constants_1.MODULE_NAME, "_InvalidGetRedirect");
        return _this;
    }
    return InvalidGetRedirect;
}(Error));
exports.InvalidGetRedirect = InvalidGetRedirect;

},{"./constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js"}],"../node_modules/@amzn/imdb-advertising-tracking/utils/encodeParameters.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeParameters = void 0;
var encodeParameters = function (params) {
    var encodedParams = Object.keys(params).map(function (paramKey) {
        if (typeof params[paramKey] !== 'undefined') {
            var key = encodeURIComponent(paramKey);
            var value = encodeURIComponent(params[paramKey]);
            return "".concat(key, "=").concat(value);
        }
        else {
            return '';
        }
    });
    return encodedParams.join('&');
};
exports.encodeParameters = encodeParameters;
exports.default = exports.encodeParameters;

},{}],"../node_modules/@amzn/imdb-advertising-tracking/utils/getDynamicMetricName.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamicMetricName = void 0;
var getDynamicMetricName = function (pattern, params) {
    var p = pattern;
    Object.keys(params).forEach(function (key) {
        var searchString = new RegExp("{".concat(key, "}"));
        var value = (params[key]).toString();
        p = p.replace(searchString, value);
    });
    return p;
};
exports.getDynamicMetricName = getDynamicMetricName;
exports.default = exports.getDynamicMetricName;

},{}],"../node_modules/@amzn/imdb-advertising-tracking/utils/getPageDetails.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageDetails = void 0;
var getPageConstMeta = function (document) {
    var meta = document.head
        ? document.head.querySelector('meta[property$=\'pageConst\'], meta[property$=\'pageId\']')
        : undefined;
    return meta ? meta.content : undefined;
};
var getPageTypeMeta = function (document) {
    var meta = document.head
        ? document.head.querySelector('meta[property$=\'pageType\']')
        : null;
    return meta ? meta.content : '';
};
var getSubPageTypeMeta = function (document) {
    var meta = document.head
        ? document.head.querySelector('meta[property$=\'subpageType\'], meta[property$=\'subPageType\']')
        : null;
    return meta ? meta.content : '';
};
var getPageDetails = function () {
    var pageDetails = null;
    try {
        var d = window.top.document;
        pageDetails = {
            pageType: getPageTypeMeta(d),
            subPageType: getSubPageTypeMeta(d),
            pageConst: getPageConstMeta(d)
        };
    }
    catch (e) {
        // catching error, but do nothing
    }
    return pageDetails;
};
exports.getPageDetails = getPageDetails;

},{}],"../node_modules/@amzn/imdb-advertising-tracking/utils/getRefMarkerFromCreativeDetails.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefMarkerFromCreativeDetails = void 0;
var constants_1 = require("../constants");
var getRefMarkerFromCreativeDetails = function (_a) {
    var adId = _a.adId, creativeId = _a.creativeId;
    var refMarkerParts = [
        constants_1.REF_MARKER_PREFIX,
        constants_1.REF_MARKER_DELIMETER,
        adId,
        constants_1.REF_MARKER_DELIMETER,
        creativeId
    ];
    return "".concat(refMarkerParts.join(''));
};
exports.getRefMarkerFromCreativeDetails = getRefMarkerFromCreativeDetails;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js"}],"../node_modules/@amzn/imdb-advertising-tracking/utils/validateDynamicMetricParams.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDynamicMetricParams = void 0;
var validateDynamicMetricParams = function (pattern, params) {
    var dynamicValues = pattern.match(/\{(\w+)\}/g);
    var validParams = true;
    if (dynamicValues) {
        dynamicValues.forEach(function (value) {
            var paramKey = value.replace(/[{}]/g, '');
            validParams = !validParams ? validParams : typeof params[paramKey] !== 'undefined';
        });
    }
    return validParams;
};
exports.validateDynamicMetricParams = validateDynamicMetricParams;
exports.default = exports.validateDynamicMetricParams;

},{}],"../node_modules/@amzn/imdb-advertising-tracking/tracking.js":[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSnapshot = exports.trackEngagementTotal = exports.trackEngagementDepth = exports.trackMetric = exports.trackAdMetric = exports.trackSitewideMetric = exports.trackBaseMetric = exports.setUniqueEngagementTotal = exports.setSilentOnError = exports.setClickstreamConfig = exports.setPageDetails = exports.silentOnError = exports.creativeDetails = exports.pageDetails = void 0;
var constants_1 = require("./constants");
var errors_1 = require("./errors");
var encodeParameters_1 = require("./utils/encodeParameters");
var getDynamicMetricName_1 = require("./utils/getDynamicMetricName");
var getPageDetails_1 = require("./utils/getPageDetails");
var getRefMarkerFromCreativeDetails_1 = require("./utils/getRefMarkerFromCreativeDetails");
var validateDynamicMetricParams_1 = require("./utils/validateDynamicMetricParams");
// const trackedMetrics: Map<string, FiredTrackingMetric> = new Map();
// const trackedEngagementMetrics: Map<string, FiredTrackingMetric> = new Map();
// const trackedPageActions: Map<string, FiredTrackingMetric> = new Map();
// const trackedTrackers: Map<string, FiredTrackingMetric> = new Map();
// const firedPageActions: Map<string, FiredTrackingMetric> = new Map();
// const firedTrackers: Map<string, FiredTrackingMetric> = new Map();
// const firedEngagementMetrics: Map<string, FiredTrackingMetric> = new Map();
// const firedMetrics: Map<string, FiredTrackingMetric> = new Map();
// const uniqueEngagementPageActions: Set<string> = new Set();
// const uniqueTrackers: Set<TrackerName> = new Set();
var firedMetrics = [];
var uniqueEngagements = new Set();
exports.pageDetails = undefined;
exports.creativeDetails = undefined;
exports.silentOnError = false;
var baseQueryParams;
var engagementCount = 0;
var uniqueEngagementTotal = 0;
var refMarker;
/**
 * ## setPageDetails
 */
var setPageDetails = function (value) {
    exports.pageDetails = value;
    baseQueryParams = {
        ht: 'actionOnly',
        pt: exports.pageDetails.pageType,
        spt: exports.pageDetails.subPageType
    };
    if (value.pageConst) {
        baseQueryParams.const = value.pageConst;
    }
};
exports.setPageDetails = setPageDetails;
/**
 * ## setClickstreamConfig
 */
var setClickstreamConfig = function (value) {
    exports.creativeDetails = value;
    refMarker = (0, getRefMarkerFromCreativeDetails_1.getRefMarkerFromCreativeDetails)(exports.creativeDetails);
    if (!exports.pageDetails) {
        (0, exports.setPageDetails)((0, getPageDetails_1.getPageDetails)());
    }
};
exports.setClickstreamConfig = setClickstreamConfig;
/**
 * ## setSilentOnError
 * @param value - true will surppress
 */
var setSilentOnError = function (value) {
    exports.silentOnError = value;
};
exports.setSilentOnError = setSilentOnError;
/**
 * ## setUniqueEngagementTotal
 * @param value
 */
var setUniqueEngagementTotal = function (value) {
    uniqueEngagementTotal = value;
};
exports.setUniqueEngagementTotal = setUniqueEngagementTotal;
/**
 * ## trackBaseMetric
 * @param value
 */
var trackBaseMetric = function (metricName, props) {
    var metric = constants_1.BASE_METRIC_MAP[metricName];
    if (!metric) {
        throw new errors_1.MetricNotBaseMetric(metricName);
    }
    (0, exports.trackMetric)(metric, props);
};
exports.trackBaseMetric = trackBaseMetric;
/**
 * ## trackSitewideMetric
 * @param value
 */
var trackSitewideMetric = function (metricName, props, refMarker) {
    var metric = constants_1.SITEWIDE_METRIC_MAP[metricName];
    if (!metric) {
        throw new errors_1.MetricNotSitewideMetric(metricName);
    }
    (0, exports.trackMetric)(metric, props);
};
exports.trackSitewideMetric = trackSitewideMetric;
/**
 * ## trackAdMeteric
 * @param metric
 * @param props
 */
var trackAdMetric = function (metric, props) {
    (0, exports.trackMetric)(metric, props);
};
exports.trackAdMetric = trackAdMetric;
/**
 * ## trackMetric
 * @param metric
 * @param props
 * @param ref
 */
var trackMetric = function (metric, props, ref) {
    var useRef = ref || refMarker;
    var firedTracker = undefined;
    var firedPageAction = undefined;
    // Fire Rodeo Tracker
    if (metric.tracker) {
        if (exports.silentOnError) {
            try {
                sendTracker(metric.tracker);
            }
            catch (error) { }
        }
        else {
            sendTracker(metric.tracker);
        }
        firedTracker = metric.tracker;
    }
    // Fire Clickstream PageAction
    if (metric.pageAction && useRef) {
        var postQueryParams = null;
        if (exports.silentOnError) {
            try {
                postQueryParams = getPostQueryParams(metric, props, useRef);
                var encodedParams = (0, encodeParameters_1.default)(postQueryParams);
                sendPageAction(encodedParams);
            }
            catch (error) { }
        }
        else {
            postQueryParams = getPostQueryParams(metric, props, useRef);
            var encodedParams = (0, encodeParameters_1.default)(postQueryParams);
            sendPageAction(encodedParams);
        }
        firedPageAction = postQueryParams.pageAction;
    }
    if (!firedPageAction && !firedTracker) {
        return;
    }
    // Record Metric
    addFiredMetric(metric, firedPageAction, useRef);
};
exports.trackMetric = trackMetric;
/**
 * ## trackEngagementDepth
 * @param total
 */
var trackEngagementDepth = function (total) {
    if (total === void 0) { total = uniqueEngagementTotal; }
    (0, exports.trackMetric)(constants_1.METRIC_ENGAGEMENT_DEPTH, {
        count: uniqueEngagements.size,
        total: total
    });
};
exports.trackEngagementDepth = trackEngagementDepth;
/**
 * ## trackEngagementTotal
 */
var trackEngagementTotal = function () {
    (0, exports.trackMetric)(constants_1.METRIC_ENGAGEMENTS_TOTAL, { count: engagementCount });
};
exports.trackEngagementTotal = trackEngagementTotal;
/**
 * ## getSnapshot
 */
var getSnapshot = function () {
    return {
        creativeDetails: exports.creativeDetails,
        pageDetails: exports.pageDetails,
        silentOnError: exports.silentOnError,
        firedMetrics: firedMetrics,
        engagementCount: engagementCount,
        uniqueEngagements: uniqueEngagements,
        uniqueEngagementTotal: uniqueEngagementTotal
    };
};
exports.getSnapshot = getSnapshot;
window.getTrackingSnapshot = exports.getSnapshot;
/**
 * Create Fired Metric to store snapshot of all metric activity
 * @param metric
 * @param firedPageAction
 * @param ref
 * @ignore
 * @returns FiredTrackingMetric
 */
var addFiredMetric = function (metric, firedPageAction, ref) {
    var firedMetric = __assign(__assign({}, metric), { recordedTime: Date.now() });
    if (firedPageAction) {
        firedMetric.pageAction = firedPageAction;
    }
    if (ref) {
        firedMetric.ref_ = ref;
    }
    firedMetrics.push(firedMetric);
    if (firedMetric.type === 'engagement') {
        engagementCount = engagementCount + 1;
        var uniqueEngagementString = JSON.stringify({
            pageAction: firedMetric.pageAction,
            tracker: firedMetric.tracker
        });
        uniqueEngagements.add(uniqueEngagementString);
    }
};
/**
 * Get POST Query Params
 * @param metric
 * @param props
 * @param ref_
 * @ignore
 * @returns
 */
var getPostQueryParams = function (metric, props, ref_) {
    if (!metric.pageAction) {
        return null;
    }
    var pageAction = createPageAction(metric, props);
    var params = __assign(__assign({}, baseQueryParams), { pageAction: pageAction });
    if (ref_) {
        if (!constants_1.REF_MARKER_REGEX.test(ref_)) {
            throw new errors_1.RefMarkerFormatError(ref_);
        }
        if (ref_.length > constants_1.REF_MARKER_MAX_LENGTH) {
            throw new errors_1.RefMarkerLengthError(ref_);
        }
        params.ref_ = ref_;
    }
    return params;
};
/**
 * Create Clickstream pageAction parameter
 * @param metric
 * @param props
 * @ignore
 * @returns
 */
var createPageAction = function (metric, props) {
    var pageAction;
    var mergedProps = __assign(__assign({}, props), { prefix: constants_1.PAGE_ACTION_PREFIX });
    if (metric.pageAction && mergedProps) {
        if ((0, validateDynamicMetricParams_1.default)(metric.pageAction, mergedProps)) {
            pageAction = (0, getDynamicMetricName_1.default)(metric.pageAction, mergedProps);
        }
        else {
            throw new errors_1.MissingDynamicPropsError(metric.pageAction, props);
        }
    }
    if (!pageAction) {
        throw new Error("metric name ".concat(pageAction, " does not exist"));
    }
    else if (!constants_1.PAGE_ACTION_REGEX.test(pageAction)) {
        throw new errors_1.PageActionPrefixError(pageAction);
    }
    else if (typeof exports.pageDetails === 'undefined') {
        throw new errors_1.MissingPageDetailsError(pageAction);
    }
    else if (pageAction.length > constants_1.PAGE_ACTION_MAX_LENGTH) {
        throw new errors_1.PageActionLengthError(pageAction);
    }
    return pageAction;
};
/**
 * POST Clickstream metric
 * @ignore
 * @param dataString
 */
var sendPageAction = function (dataString) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', constants_1.TRACKING_URL);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(dataString);
};
var sendTracker = function (trackerName) {
    var trackerPixelURL = window.getClickTracker(trackerName);
    new Image().src = trackerPixelURL;
};

},{"./constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","./errors":"../node_modules/@amzn/imdb-advertising-tracking/errors.js","./utils/encodeParameters":"../node_modules/@amzn/imdb-advertising-tracking/utils/encodeParameters.js","./utils/getDynamicMetricName":"../node_modules/@amzn/imdb-advertising-tracking/utils/getDynamicMetricName.js","./utils/getPageDetails":"../node_modules/@amzn/imdb-advertising-tracking/utils/getPageDetails.js","./utils/getRefMarkerFromCreativeDetails":"../node_modules/@amzn/imdb-advertising-tracking/utils/getRefMarkerFromCreativeDetails.js","./utils/validateDynamicMetricParams":"../node_modules/@amzn/imdb-advertising-tracking/utils/validateDynamicMetricParams.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackClickthrough.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackClickthrough = void 0;
var errors_1 = require("../errors");
var trackClickthrough = function () {
    // backup in case function does not exist
    if (typeof window.getRedirect === 'undefined') {
        window.getRedirect = function () { return '{%redirect}'; }; // cornerstone will replace this string with a click tracker
    }
    var aaxClickTracker = window.getRedirect();
    if (aaxClickTracker.includes('%redirect')) {
        throw new errors_1.InvalidGetRedirect();
    }
    new Image().src = aaxClickTracker;
};
exports.trackClickthrough = trackClickthrough;

},{"../errors":"../node_modules/@amzn/imdb-advertising-tracking/errors.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackCustomInteraction.js":[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackCustomInteraction = void 0;
var constants_1 = require("../constants");
var errors_1 = require("../errors");
var tracking_1 = require("../tracking");
var MIN_INDEX = 1;
var MAX_INDEX = 100;
/**
 * Track Custom Interaction
 *
 * @param index - a number representing the Unit Index of the Ad Creative
 */
var trackCustomInteraction = function (index, pageAction) {
    if (index === void 0) { index = 1; }
    if (pageAction === void 0) { pageAction = "custom-interaction-".concat(index); }
    if (index < MIN_INDEX || index > MAX_INDEX) {
        throw new errors_1.AdMetricIndexRangeError('trackCustomInteraction', index, MIN_INDEX, MAX_INDEX);
    }
    var unit = 1400 + (index - 1);
    var tracker = "adCustomAction".concat(unit);
    (0, tracking_1.trackAdMetric)(__assign(__assign({}, constants_1.METRIC_CUSTOM_INTERACTION), { tracker: tracker }), { pageAction: pageAction });
};
exports.trackCustomInteraction = trackCustomInteraction;
exports.default = exports.trackCustomInteraction;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../errors":"../node_modules/@amzn/imdb-advertising-tracking/errors.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackCustomNav.js":[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackCustomNav = void 0;
var constants_1 = require("../constants");
var errors_1 = require("../errors");
var tracking_1 = require("../tracking");
var MIN_INDEX = 1;
var MAX_INDEX = 2;
/**
 * Track Custom Nav
 *
 *
 * @param index - a number representing the Unit Index of the Ad Creative
 */
var trackCustomNav = function (index, pageAction) {
    if (index === void 0) { index = 1; }
    if (pageAction === void 0) { pageAction = "nav-custom".concat(index === 1 ? '' : index); }
    if (index < MIN_INDEX || index > MAX_INDEX) {
        throw new errors_1.AdMetricIndexRangeError('trackSecondaryCTA', index, MIN_INDEX, MAX_INDEX);
    }
    var tracker = index === 1 ? 'adCustomAction' : 'adCustomAction2';
    (0, tracking_1.trackAdMetric)(__assign(__assign({}, constants_1.METRIC_CLICK_CUSTOM_NAV), { tracker: tracker }), { pageAction: pageAction });
};
exports.trackCustomNav = trackCustomNav;
exports.default = exports.trackCustomNav;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../errors":"../node_modules/@amzn/imdb-advertising-tracking/errors.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackDwell.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackDwell = void 0;
var constants_1 = require("../constants");
var tracking_1 = require("../tracking");
var trackDwell = function (ms) {
    (0, tracking_1.trackMetric)(constants_1.METRIC_DWELL_TIME, { ms: ms });
};
exports.trackDwell = trackDwell;
exports.default = exports.trackDwell;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackImpression.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackImpression = void 0;
var constants_1 = require("../constants");
var tracking_1 = require("../tracking");
var trackImpression = function () {
    (0, tracking_1.trackMetric)(constants_1.METRIC_INIT);
};
exports.trackImpression = trackImpression;
exports.default = exports.trackImpression;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackPrimaryCTA.js":[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackPrimaryCTA = void 0;
var constants_1 = require("../constants");
var errors_1 = require("../errors");
var tracking_1 = require("../tracking");
var trackClickthrough_1 = require("./trackClickthrough");
var MIN_INDEX = 1;
var MAX_INDEX = 2;
/**
 * Track Primary CTA
 *
 * @param index - a number representing the Unit Index of the Ad Creative
 */
var trackPrimaryCTA = function (index, pageAction) {
    if (index === void 0) { index = 1; }
    if (pageAction === void 0) { pageAction = "cta-primary".concat(index === 1 ? '' : index); }
    if (index < MIN_INDEX || index > MAX_INDEX) {
        throw new errors_1.AdMetricIndexRangeError('trackPrimaryCTA', index, MIN_INDEX, MAX_INDEX);
    }
    var tracker = index === 1 ? 'tabClick' : 'tabClick2';
    (0, tracking_1.trackAdMetric)(__assign(__assign({}, constants_1.METRIC_CLICK_PRIMARY_CTA), { tracker: tracker }), { pageAction: pageAction });
    (0, trackClickthrough_1.trackClickthrough)(); // tracking separately since tabClicks do not count as a click in Rodeo
};
exports.trackPrimaryCTA = trackPrimaryCTA;
exports.default = exports.trackPrimaryCTA;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../errors":"../node_modules/@amzn/imdb-advertising-tracking/errors.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js","./trackClickthrough":"../node_modules/@amzn/imdb-advertising-tracking/api/trackClickthrough.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackSecondaryCTA.js":[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackSecondaryCTA = void 0;
var constants_1 = require("../constants");
var errors_1 = require("../errors");
var tracking_1 = require("../tracking");
var MIN_INDEX = 1;
var MAX_INDEX = 2;
/**
 * Track Secondary CTA
 *
 *
 * @param index - a number representing the Unit Index of the Ad Creative
 */
var trackSecondaryCTA = function (index, pageAction) {
    if (index === void 0) { index = 1; }
    if (pageAction === void 0) { pageAction = "cta-secondary".concat(index === 1 ? '' : index); }
    if (index < MIN_INDEX || index > MAX_INDEX) {
        throw new errors_1.AdMetricIndexRangeError('trackSecondaryCTA', index, MIN_INDEX, MAX_INDEX);
    }
    var tracker = index === 1 ? 'adCustomAction1001' : 'adCustomAction1002';
    (0, tracking_1.trackAdMetric)(__assign(__assign({}, constants_1.METRIC_CLICK_SECONDARY_CTA), { tracker: tracker }), { pageAction: pageAction });
};
exports.trackSecondaryCTA = trackSecondaryCTA;
exports.default = exports.trackSecondaryCTA;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../errors":"../node_modules/@amzn/imdb-advertising-tracking/errors.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackTimeToEngagement.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackTimeToEngagement = void 0;
var constants_1 = require("../constants");
var tracking_1 = require("../tracking");
var trackTimeToEngagement = function (ms) {
    (0, tracking_1.trackMetric)(constants_1.METRIC_TIME_UNTIL_ENGAGEMENT, { ms: ms });
};
exports.trackTimeToEngagement = trackTimeToEngagement;
exports.default = exports.trackTimeToEngagement;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackVideoNav.js":[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackVideoNav = void 0;
var constants_1 = require("../constants");
var errors_1 = require("../errors");
var tracking_1 = require("../tracking");
var MIN_INDEX = 1;
var MAX_INDEX = 3;
var TRACKER_LIST = ['tabClick3', 'tabClick4', 'tabClick5'];
/**
 * Track Video Nav
 *
 * @param index - a number representing the video nav index of the Ad Creative
 */
var trackVideoNav = function (index, pageAction) {
    if (index === void 0) { index = 1; }
    if (pageAction === void 0) { pageAction = "nav-video".concat(index === 1 ? '' : index); }
    if (index < MIN_INDEX || index > MAX_INDEX) {
        throw new errors_1.AdMetricIndexRangeError('trackVideoNav', index, MIN_INDEX, MAX_INDEX);
    }
    var tracker = TRACKER_LIST[index - 1];
    (0, tracking_1.trackAdMetric)(__assign(__assign({}, constants_1.METRIC_CLICK_VIDEO_NAV), { tracker: tracker }), { pageAction: pageAction });
};
exports.trackVideoNav = trackVideoNav;
exports.default = exports.trackVideoNav;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../errors":"../node_modules/@amzn/imdb-advertising-tracking/errors.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackVideoPlaybackEvent.js":[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackVideoPlaybackEvent = void 0;
var constants_1 = require("../constants");
var tracking_1 = require("../tracking");
/**
 * ## Track Video Playback Event
 *
 *
 * @param videoType - intro or trailer1-10
 * @param eventType
 */
var trackVideoPlaybackEvent = function (videoType, eventType, pageAction) {
    if (pageAction === void 0) { pageAction = videoType; }
    var metric = constants_1.VIDEO_PLAYBACK_EVENT_METRIC_MAP[eventType];
    var tracker = constants_1.VIDEO_TYPE_EVENT_TRACKER_MAP.get(videoType)[eventType];
    var uniqueMetric = __assign(__assign({}, metric), { tracker: tracker });
    (0, tracking_1.trackAdMetric)(uniqueMetric, { pageAction: pageAction });
    var action = metric.pageAction, rodeoOnlyMetric = __rest(metric, ["pageAction"]);
    (0, tracking_1.trackAdMetric)(rodeoOnlyMetric);
};
exports.trackVideoPlaybackEvent = trackVideoPlaybackEvent;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackView.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackView = void 0;
var constants_1 = require("../constants");
var tracking_1 = require("../tracking");
var trackView = function () {
    (0, tracking_1.trackMetric)(constants_1.METRIC_VIEWED);
};
exports.trackView = trackView;
exports.default = exports.trackView;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackViewableImpression.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackViewableImpression = void 0;
var constants_1 = require("../constants");
var tracking_1 = require("../tracking");
var trackViewableImpression = function () {
    (0, tracking_1.trackMetric)(constants_1.METRIC_VIEWABLE_IMPRESSION);
};
exports.trackViewableImpression = trackViewableImpression;
exports.default = exports.trackViewableImpression;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackWatchlistAdd.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackWatchlistAdd = void 0;
var constants_1 = require("../constants");
var tracking_1 = require("../tracking");
var trackWatchlistAdd = function (tconst) {
    (0, tracking_1.trackMetric)(constants_1.METRIC_WATCHLIST_ADD, { tconst: tconst }, constants_1.REF_MARKER_WATCHLIST_RIBBION);
};
exports.trackWatchlistAdd = trackWatchlistAdd;
exports.default = exports.trackWatchlistAdd;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/trackWatchlistDelete.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackWatchlistDelete = void 0;
var constants_1 = require("../constants");
var tracking_1 = require("../tracking");
var trackWatchlistDelete = function (tconst) {
    (0, tracking_1.trackMetric)(constants_1.METRIC_WATCHLIST_DELETE, { tconst: tconst }, constants_1.REF_MARKER_WATCHLIST_RIBBION);
};
exports.trackWatchlistDelete = trackWatchlistDelete;
exports.default = exports.trackWatchlistDelete;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js"}],"../node_modules/@amzn/imdb-advertising-tracking/api/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackCarouselThumbnail = exports.trackCarouselCTA = exports.trackYoutube = exports.trackInstagram = exports.trackTwitter = exports.trackFacebook = exports.trackCollapse = exports.trackExpand = exports.trackSynopsisNav = exports.trackCharactersNav = exports.trackGalleryNav = exports.trackWatchlistDelete = exports.trackWatchlistAdd = exports.trackViewableImpression = exports.trackView = exports.trackVideoPlaybackEvent = exports.trackVideoNav = exports.trackTimeToEngagement = exports.trackSecondaryCTA = exports.trackPrimaryCTA = exports.trackImpression = exports.trackDwell = exports.trackCustomNav = exports.trackCustomInteraction = exports.trackClickthrough = void 0;
var constants_1 = require("../constants");
var tracking_1 = require("../tracking");
var trackClickthrough_1 = require("./trackClickthrough");
Object.defineProperty(exports, "trackClickthrough", { enumerable: true, get: function () { return trackClickthrough_1.trackClickthrough; } });
var trackCustomInteraction_1 = require("./trackCustomInteraction");
Object.defineProperty(exports, "trackCustomInteraction", { enumerable: true, get: function () { return trackCustomInteraction_1.trackCustomInteraction; } });
var trackCustomNav_1 = require("./trackCustomNav");
Object.defineProperty(exports, "trackCustomNav", { enumerable: true, get: function () { return trackCustomNav_1.trackCustomNav; } });
var trackDwell_1 = require("./trackDwell");
Object.defineProperty(exports, "trackDwell", { enumerable: true, get: function () { return trackDwell_1.trackDwell; } });
var trackImpression_1 = require("./trackImpression");
Object.defineProperty(exports, "trackImpression", { enumerable: true, get: function () { return trackImpression_1.trackImpression; } });
var trackPrimaryCTA_1 = require("./trackPrimaryCTA");
Object.defineProperty(exports, "trackPrimaryCTA", { enumerable: true, get: function () { return trackPrimaryCTA_1.trackPrimaryCTA; } });
var trackSecondaryCTA_1 = require("./trackSecondaryCTA");
Object.defineProperty(exports, "trackSecondaryCTA", { enumerable: true, get: function () { return trackSecondaryCTA_1.trackSecondaryCTA; } });
var trackTimeToEngagement_1 = require("./trackTimeToEngagement");
Object.defineProperty(exports, "trackTimeToEngagement", { enumerable: true, get: function () { return trackTimeToEngagement_1.trackTimeToEngagement; } });
var trackVideoNav_1 = require("./trackVideoNav");
Object.defineProperty(exports, "trackVideoNav", { enumerable: true, get: function () { return trackVideoNav_1.trackVideoNav; } });
var trackVideoPlaybackEvent_1 = require("./trackVideoPlaybackEvent");
Object.defineProperty(exports, "trackVideoPlaybackEvent", { enumerable: true, get: function () { return trackVideoPlaybackEvent_1.trackVideoPlaybackEvent; } });
var trackView_1 = require("./trackView");
Object.defineProperty(exports, "trackView", { enumerable: true, get: function () { return trackView_1.trackView; } });
var trackViewableImpression_1 = require("./trackViewableImpression");
Object.defineProperty(exports, "trackViewableImpression", { enumerable: true, get: function () { return trackViewableImpression_1.trackViewableImpression; } });
var trackWatchlistAdd_1 = require("./trackWatchlistAdd");
Object.defineProperty(exports, "trackWatchlistAdd", { enumerable: true, get: function () { return trackWatchlistAdd_1.trackWatchlistAdd; } });
var trackWatchlistDelete_1 = require("./trackWatchlistDelete");
Object.defineProperty(exports, "trackWatchlistDelete", { enumerable: true, get: function () { return trackWatchlistDelete_1.trackWatchlistDelete; } });
/**
 * ## Track GalleryNav
 */
var trackGalleryNav = function (pageAction) {
    if (pageAction === void 0) { pageAction = 'nav-gallery'; }
    (0, tracking_1.trackAdMetric)(constants_1.METRIC_CLICK_GALLERY_NAV, { pageAction: pageAction });
};
exports.trackGalleryNav = trackGalleryNav;
/**
 * ## Track CharactersNav
 */
var trackCharactersNav = function (pageAction) {
    if (pageAction === void 0) { pageAction = 'nav-characters'; }
    (0, tracking_1.trackAdMetric)(constants_1.METRIC_CLICK_CHARACTERS_NAV, { pageAction: pageAction });
};
exports.trackCharactersNav = trackCharactersNav;
/**
 * ## Track SynopsisNav
 */
var trackSynopsisNav = function (pageAction) {
    if (pageAction === void 0) { pageAction = 'nav-synopsis'; }
    (0, tracking_1.trackAdMetric)(constants_1.METRIC_CLICK_SYNOPSIS_NAV, { pageAction: pageAction });
};
exports.trackSynopsisNav = trackSynopsisNav;
/**
 * ## Track Expand
 */
var trackExpand = function (pageAction) {
    if (pageAction === void 0) { pageAction = 'expand'; }
    (0, tracking_1.trackAdMetric)(constants_1.METRIC_CLICK_EXPAND, { pageAction: pageAction });
};
exports.trackExpand = trackExpand;
/**
 * ## Track Collapse
 */
var trackCollapse = function (pageAction) {
    if (pageAction === void 0) { pageAction = 'collapse'; }
    (0, tracking_1.trackAdMetric)(constants_1.METRIC_CLICK_COLLAPSE, { pageAction: pageAction });
};
exports.trackCollapse = trackCollapse;
/**
 * ## Track Facebook
 */
var trackFacebook = function (pageAction) {
    if (pageAction === void 0) { pageAction = 'facebook'; }
    (0, tracking_1.trackAdMetric)(constants_1.METRIC_CLICK_FACEBOOK, { pageAction: pageAction });
};
exports.trackFacebook = trackFacebook;
/**
 * ## Track Twitter
 */
var trackTwitter = function (pageAction) {
    if (pageAction === void 0) { pageAction = 'twitter'; }
    (0, tracking_1.trackAdMetric)(constants_1.METRIC_CLICK_TWITTER, { pageAction: pageAction });
};
exports.trackTwitter = trackTwitter;
/**
 * ## Track Instagram
 */
var trackInstagram = function (pageAction) {
    if (pageAction === void 0) { pageAction = 'instagram'; }
    (0, tracking_1.trackAdMetric)(constants_1.METRIC_CLICK_INSTAGRAM, { pageAction: pageAction });
};
exports.trackInstagram = trackInstagram;
/**
 * ## Track Youtube
 */
var trackYoutube = function (pageAction) {
    if (pageAction === void 0) { pageAction = 'youtube'; }
    (0, tracking_1.trackAdMetric)(constants_1.METRIC_CLICK_YOUTUBE, { pageAction: pageAction });
};
exports.trackYoutube = trackYoutube;
/**
 * ## Track CarouselCTA
 */
var trackCarouselCTA = function (pageAction) {
    if (pageAction === void 0) { pageAction = 'cta-carousel'; }
    (0, tracking_1.trackAdMetric)(constants_1.METRIC_CLICK_CAROUSEL_CTA, { pageAction: pageAction });
};
exports.trackCarouselCTA = trackCarouselCTA;
/**
 * ## Track CarouselThumbnail
 */
var trackCarouselThumbnail = function (pageAction) {
    if (pageAction === void 0) { pageAction = 'thumbnail-carousel'; }
    (0, tracking_1.trackAdMetric)(constants_1.METRIC_CLICK_CAROUSEL_THUMBNAIL, { pageAction: pageAction });
};
exports.trackCarouselThumbnail = trackCarouselThumbnail;

},{"../constants":"../node_modules/@amzn/imdb-advertising-tracking/constants.js","../tracking":"../node_modules/@amzn/imdb-advertising-tracking/tracking.js","./trackClickthrough":"../node_modules/@amzn/imdb-advertising-tracking/api/trackClickthrough.js","./trackCustomInteraction":"../node_modules/@amzn/imdb-advertising-tracking/api/trackCustomInteraction.js","./trackCustomNav":"../node_modules/@amzn/imdb-advertising-tracking/api/trackCustomNav.js","./trackDwell":"../node_modules/@amzn/imdb-advertising-tracking/api/trackDwell.js","./trackImpression":"../node_modules/@amzn/imdb-advertising-tracking/api/trackImpression.js","./trackPrimaryCTA":"../node_modules/@amzn/imdb-advertising-tracking/api/trackPrimaryCTA.js","./trackSecondaryCTA":"../node_modules/@amzn/imdb-advertising-tracking/api/trackSecondaryCTA.js","./trackTimeToEngagement":"../node_modules/@amzn/imdb-advertising-tracking/api/trackTimeToEngagement.js","./trackVideoNav":"../node_modules/@amzn/imdb-advertising-tracking/api/trackVideoNav.js","./trackVideoPlaybackEvent":"../node_modules/@amzn/imdb-advertising-tracking/api/trackVideoPlaybackEvent.js","./trackView":"../node_modules/@amzn/imdb-advertising-tracking/api/trackView.js","./trackViewableImpression":"../node_modules/@amzn/imdb-advertising-tracking/api/trackViewableImpression.js","./trackWatchlistAdd":"../node_modules/@amzn/imdb-advertising-tracking/api/trackWatchlistAdd.js","./trackWatchlistDelete":"../node_modules/@amzn/imdb-advertising-tracking/api/trackWatchlistDelete.js"}],"js/index.ts":[function(require,module,exports) {
"use strict";

require("../styles/main.scss");

var _index = require("../data/index");

var _utils = require("./utils");

var _fullscreen = require("@amzn/imdb-creativestudio-video-player/ui/fullscreen/fullscreen");

var _slate = require("@amzn/imdb-creativestudio-video-player/ui/slate/slate");

var _video = require("@amzn/imdb-creativestudio-video-player/video/video");

var _videoplayer = require("@amzn/imdb-creativestudio-video-player/videoplayer/videoplayer");

var _api = require("@amzn/imdb-advertising-tracking/api");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var ASPECT_RATIO = 5 / 6;
var isResponsivePage;
var companionConfig;
window.addEventListener('DOMContentLoaded', function () {
  init();
});

function init() {
  return __awaiter(this, void 0, void 0, function () {
    var isAutoplay, _a, poster, shell, doc, clickthrough, fullscreen, video, slate, header, subheader, staticContainer, hue, _b, programmaticHexOverride, ctaDarkContrast, videoSrc, source, v, videoPlayer, videoSlateObserver, videoUIComponents, videoObserver;

    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          isAutoplay = (0, _utils.isFirstImpression)(); // let isAutoplay = true;

          companionConfig = window.videoWallCompanionConfig || window.top.videoWallCompanionConfig;
          isResponsivePage = !parent.document.getElementById("top_ad");
          _a = getElements(), poster = _a.poster, shell = _a.shell, doc = _a.doc, clickthrough = _a.clickthrough, fullscreen = _a.fullscreen, video = _a.video, slate = _a.slate, header = _a.header, subheader = _a.subheader, staticContainer = _a.staticContainer;

          if (isAutoplay) {
            shell.toggleAttribute('data-autoplay', true);
          }

          header.innerHTML = (0, _utils.getDateValue)(companionConfig.header);
          subheader.innerHTML = (0, _utils.getDateValue)(companionConfig.subheader);
          clickthrough.innerHTML = (0, _utils.getDateValue)(companionConfig.clickthroughText);
          if (!companionConfig.hueOverride) return [3
          /*break*/
          , 1];
          _b = companionConfig.hueOverride;
          return [3
          /*break*/
          , 3];

        case 1:
          return [4
          /*yield*/
          , (0, _utils.getHueFromImage)(companionConfig.trailerPosterSource)];

        case 2:
          _b = _c.sent() || 0;
          _c.label = 3;

        case 3:
          hue = _b;
          programmaticHexOverride = (0, _utils.hslToHex)(parseInt(hue), 100, 50);
          doc.style.setProperty('--cvp-color-primary', programmaticHexOverride);
          doc.style.setProperty('--cvp-color-primary-hue', "".concat(hue, "deg"));
          ctaDarkContrast = companionConfig.ctaHexOverride ? (0, _utils.isDarkContrast)(companionConfig.ctaHexOverride) : (0, _utils.isDarkContrast)(programmaticHexOverride);
          if (ctaDarkContrast) clickthrough.style.color = 'black';
          if (!ctaDarkContrast) clickthrough.style.color = 'white';
          header.style.visibility = 'visible';
          subheader.style.visibility = 'visible';
          clickthrough.style.visibility = 'visible';
          (0, _utils.handleBreakpoints)([{
            label: 'xl',
            breakpoint: _index.bp.XL
          }, {
            label: 'lg',
            breakpoint: _index.bp.LG
          }, {
            label: 'md',
            breakpoint: _index.bp.MD
          }, {
            label: 'sm',
            breakpoint: _index.bp.SM
          }], function (bp) {
            shell.setAttribute('data-breakpoint', bp.label);

            if (bp.label === 'sm' || bp.label === 'md') {
              staticContainer.addEventListener('click', function (e) {
                clickthrough.click();
              });
              window.addEventListener('resize', resizeInline40Frame);
              resizeInline40Frame();
            }
          });
          (0, _utils.normalizeClickthrough)(clickthrough);
          videoSrc = (0, _utils.getDateValue)(companionConfig.trailerVideoSource);
          source = document.createElement('source');
          source.setAttribute('src', videoSrc);
          source.setAttribute('type', 'video/mp4');
          video.appendChild(source);
          videoSlateObserver = {
            onRequestPlay: function () {
              var isAutoplay = shell.hasAttribute('data-autoplay');
              if (isAutoplay) shell.toggleAttribute('data-autoplay', false);
              v.restart({
                userInitiated: true
              });
              v.enterFullScreen();
            },
            onRequestPause: function () {
              var isAutoplay = shell.hasAttribute('data-autoplay');

              if (isAutoplay) {
                shell.toggleAttribute('data-autoplay', false);
                v.restart({
                  userInitiated: true
                });
                v.enterFullScreen();
              }
            },
            onRequestRestart: function () {
              shell.toggleAttribute('data-autoplay', false);
              v.enterFullScreen();
            },
            onPlaybackStatusChange: function (s) {
              var isAutoplay = shell.hasAttribute('data-autoplay');

              if (s === 'playing' && Math.floor(v.time) === 0) {
                if (isAutoplay) {
                  try {
                    (0, _api.trackVideoPlaybackEvent)('intro', 'start');
                  } catch (e) {
                    console.log(e);
                  }
                } else {
                  try {
                    (0, _api.trackVideoPlaybackEvent)('trailer1', 'start');
                  } catch (e) {
                    console.log(e);
                  }
                }
              }

              if (s === 'completed') {
                try {
                  (0, _api.trackVideoPlaybackEvent)('trailer1', 'complete');
                } catch (e) {
                  console.log(e);
                }
              } // if (s === 'paused' || s === 'notstarted' || s === 'error' || s === 'completed') {
              // poster.classList.toggle('hidden', false);
              // } else {
              // poster.classList.toggle('hidden', true);
              // }


              if (s === 'completed') {
                poster.classList.toggle('hidden', false);
              }
            }
          };
          videoUIComponents = {
            fullscreenButton: new _fullscreen.VideoFullscreenButton(fullscreen, {}),
            slateButton: new _slate.VideoSlateButton(slate, videoSlateObserver)
          };
          videoObserver = {
            onFullScreenStatusChange: function (s) {
              if (s === 'requested') {
                v.unmute();
              }

              if (s === 'normal') {
                poster.classList.toggle('hidden', false);
                v.mute();
                v.reset({
                  userInitiated: true
                });
              }
            },
            onComplete: function () {
              poster.classList.toggle('hidden', false);
              shell.toggleAttribute('data-autoplay', false);
              v.reset({
                userInitiated: true
              });
            },
            onProgressChange: function (t) {
              // const isAutoplay = shell.hasAttribute('data-autoplay');
              if (Math.floor(v.time) === 8) {
                poster.classList.toggle('hidden', false);
                shell.toggleAttribute('data-autoplay', false);
                v.reset({
                  userInitiated: true
                });

                try {
                  (0, _api.trackVideoPlaybackEvent)('intro', 'complete');
                } catch (e) {
                  console.log(e);
                }
              }
            },
            onMetaData: function () {// if (isAutoplay) {
              //   setTimeout(() => {
              //     v.restart({ userInitiated: false });
              //   }, 10)
              // }
            }
          };
          v = new _video.Video({
            element: video,
            useMediaInterop: "development" === 'development' || !isResponsivePage ? false : true,
            observer: videoObserver
          });
          videoPlayer = new _videoplayer.VideoPlayer(v, videoUIComponents);

          if (isAutoplay) {
            v.restart({
              userInitiated: false
            });
          }

          clickthrough.addEventListener('click', function (e) {
            e.stopPropagation();

            if (!shell.hasAttribute('data-autoplay')) {
              setTimeout(function () {
                v.pause({
                  userInitiated: true
                });
              });
            }

            try {
              (0, _api.trackPrimaryCTA)(2);
              (0, _api.trackClickthrough)();
            } catch (e) {
              console.log(e);
            }
          });
          return [2
          /*return*/
          ];
      }
    });
  });
}

function getElements() {
  return {
    shell: document.getElementById('video-wall-companion'),
    doc: document.documentElement,
    video: document.getElementById('video') || document.querySelector('.video-container video'),
    slate: document.getElementById('video-slate'),
    fullscreen: document.getElementById('video-fullscreen'),
    clickthrough: document.getElementById('clickthrough'),
    poster: document.getElementById('video-poster'),
    header: document.getElementById('header'),
    subheader: document.getElementById('subheader'),
    staticContainer: document.getElementById('static-container')
  };
}

function resizeInline40Frame() {
  var inline40WrapperEl = parent.document.getElementById("inline40_wrapper");
  var inline40FrameEl = inline40WrapperEl === null || inline40WrapperEl === void 0 ? void 0 : inline40WrapperEl.querySelector("iframe");
  var width = window.top.document.querySelector('body').getBoundingClientRect().width;

  if (inline40FrameEl) {
    inline40FrameEl.style.width = "100%";
    inline40FrameEl.style.height = "".concat(width * ASPECT_RATIO, "px");
    inline40WrapperEl.style.width = "100%";
    inline40WrapperEl.style.height = "".concat(width * ASPECT_RATIO, "px");
  }
}
},{"../styles/main.scss":"styles/main.scss","../data/index":"data/index.ts","./utils":"js/utils.ts","@amzn/imdb-creativestudio-video-player/ui/fullscreen/fullscreen":"../node_modules/@amzn/imdb-creativestudio-video-player/ui/fullscreen/fullscreen.js","@amzn/imdb-creativestudio-video-player/ui/slate/slate":"../node_modules/@amzn/imdb-creativestudio-video-player/ui/slate/slate.js","@amzn/imdb-creativestudio-video-player/video/video":"../node_modules/@amzn/imdb-creativestudio-video-player/video/video.js","@amzn/imdb-creativestudio-video-player/videoplayer/videoplayer":"../node_modules/@amzn/imdb-creativestudio-video-player/videoplayer/videoplayer.js","@amzn/imdb-advertising-tracking/api":"../node_modules/@amzn/imdb-advertising-tracking/api/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51338" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.ts"], null)
//# sourceMappingURL=/js.52877fb3.js.map
