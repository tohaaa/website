/******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/ 		if(installedModules[moduleId]) {
            /******/ 			return installedModules[moduleId].exports;
            /******/ 		}
        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = installedModules[moduleId] = {
            /******/ 			i: moduleId,
            /******/ 			l: false,
            /******/ 			exports: {}
            /******/ 		};
        /******/
        /******/ 		// Execute the module function
        /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Flag the module as loaded
        /******/ 		module.l = true;
        /******/
        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// identity function for calling harmony imports with the correct context
    /******/ 	__webpack_require__.i = function(value) { return value; };
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
        /******/ 		if(!__webpack_require__.o(exports, name)) {
            /******/ 			Object.defineProperty(exports, name, {
                /******/ 				configurable: false,
                /******/ 				enumerable: true,
                /******/ 				get: getter
                /******/ 			});
            /******/ 		}
        /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
        /******/ 		var getter = module && module.__esModule ?
            /******/ 			function getDefault() { return module['default']; } :
        /******/ 			function getModuleExports() { return module; };
        /******/ 		__webpack_require__.d(getter, 'a', getter);
        /******/ 		return getter;
        /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 6);
    /******/ })
/************************************************************************/
/******/ ([
    /* 0 */
    /***/ (function(module, exports) {

        module.exports = jQuery;

        /***/ }),
    /* 1 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaQuery; });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);




        // Default set of media queries
        var defaultQueries = {
            'default': 'only screen',
            landscape: 'only screen and (orientation: landscape)',
            portrait: 'only screen and (orientation: portrait)',
            retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),' + 'only screen and (min--moz-device-pixel-ratio: 2),' + 'only screen and (-o-min-device-pixel-ratio: 2/1),' + 'only screen and (min-device-pixel-ratio: 2),' + 'only screen and (min-resolution: 192dpi),' + 'only screen and (min-resolution: 2dppx)'
        };

        // matchMedia() polyfill - Test a CSS media type/query in JS.
        // Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
        var matchMedia = window.matchMedia || function () {
            'use strict';

            // For browsers that support matchMedium api such as IE 9 and webkit

            var styleMedia = window.styleMedia || window.media;

            // For those that don't support matchMedium
            if (!styleMedia) {
                var style = document.createElement('style'),
                    script = document.getElementsByTagName('script')[0],
                    info = null;

                style.type = 'text/css';
                style.id = 'matchmediajs-test';

                script && script.parentNode && script.parentNode.insertBefore(style, script);

                // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
                info = 'getComputedStyle' in window && window.getComputedStyle(style, null) || style.currentStyle;

                styleMedia = {
                    matchMedium: function (media) {
                        var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                        // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                        if (style.styleSheet) {
                            style.styleSheet.cssText = text;
                        } else {
                            style.textContent = text;
                        }

                        // Test if media query is true or false
                        return info.width === '1px';
                    }
                };
            }

            return function (media) {
                return {
                    matches: styleMedia.matchMedium(media || 'all'),
                    media: media || 'all'
                };
            };
        }();

        var MediaQuery = {
            queries: [],

            current: '',

            /**
   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
   * @function
   * @private
   */
            _init: function () {
                var self = this;
                var $meta = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('meta.foundation-mq');
                if (!$meta.length) {
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<meta class="foundation-mq">').appendTo(document.head);
                }

                var extractedStyles = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.foundation-mq').css('font-family');
                var namedQueries;

                namedQueries = parseStyleToObject(extractedStyles);

                for (var key in namedQueries) {
                    if (namedQueries.hasOwnProperty(key)) {
                        self.queries.push({
                            name: key,
                            value: 'only screen and (min-width: ' + namedQueries[key] + ')'
                        });
                    }
                }

                this.current = this._getCurrentSize();

                this._watcher();
            },


            /**
   * Checks if the screen is at least as wide as a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
   */
            atLeast: function (size) {
                var query = this.get(size);

                if (query) {
                    return matchMedia(query).matches;
                }

                return false;
            },


            /**
   * Checks if the screen matches to a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
   */
            is: function (size) {
                size = size.trim().split(' ');
                if (size.length > 1 && size[1] === 'only') {
                    if (size[0] === this._getCurrentSize()) return true;
                } else {
                    return this.atLeast(size[0]);
                }
                return false;
            },


            /**
   * Gets the media query of a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to get.
   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
   */
            get: function (size) {
                for (var i in this.queries) {
                    if (this.queries.hasOwnProperty(i)) {
                        var query = this.queries[i];
                        if (size === query.name) return query.value;
                    }
                }

                return null;
            },


            /**
   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
   * @function
   * @private
   * @returns {String} Name of the current breakpoint.
   */
            _getCurrentSize: function () {
                var matched;

                for (var i = 0; i < this.queries.length; i++) {
                    var query = this.queries[i];

                    if (matchMedia(query.value).matches) {
                        matched = query;
                    }
                }

                if (typeof matched === 'object') {
                    return matched.name;
                } else {
                    return matched;
                }
            },


            /**
   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
   * @function
   * @private
   */
            _watcher: function () {
                var _this = this;

                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('resize.zf.mediaquery').on('resize.zf.mediaquery', function () {
                    var newSize = _this._getCurrentSize(),
                        currentSize = _this.current;

                    if (newSize !== currentSize) {
                        // Change the current media query
                        _this.current = newSize;

                        // Broadcast the media query change on the window
                        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
                    }
                });
            }
        };

        // Thank you: https://github.com/sindresorhus/query-string
        function parseStyleToObject(str) {
            var styleObject = {};

            if (typeof str !== 'string') {
                return styleObject;
            }

            str = str.trim().slice(1, -1); // browsers re-quote string style values

            if (!str) {
                return styleObject;
            }

            styleObject = str.split('&').reduce(function (ret, param) {
                var parts = param.replace(/\+/g, ' ').split('=');
                var key = parts[0];
                var val = parts[1];
                key = decodeURIComponent(key);

                // missing `=` should be `null`:
                // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
                val = val === undefined ? null : decodeURIComponent(val);

                if (!ret.hasOwnProperty(key)) {
                    ret[key] = val;
                } else if (Array.isArray(ret[key])) {
                    ret[key].push(val);
                } else {
                    ret[key] = [ret[key], val];
                }
                return ret;
            }, {});

            return styleObject;
        }



        /***/ }),
    /* 2 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* unused harmony export rtl */
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GetYoDigits; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return transitionend; });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);




        // Core Foundation Utilities, utilized in a number of places.

        /**
 * Returns a boolean for RTL support
 */
        function rtl() {
            return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html').attr('dir') === 'rtl';
        }

        /**
 * returns a random base-36 uid with namespacing
 * @function
 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
 * @returns {String} - unique id
 */
        function GetYoDigits(length, namespace) {
            length = length || 6;
            return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
        }

        function transitionend($elem) {
            var transitions = {
                'transition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'OTransition': 'otransitionend'
            };
            var elem = document.createElement('div'),
                end;

            for (var t in transitions) {
                if (typeof elem.style[t] !== 'undefined') {
                    end = transitions[t];
                }
            }
            if (end) {
                return end;
            } else {
                end = setTimeout(function () {
                    $elem.triggerHandler('transitionend', [$elem]);
                }, 1);
                return 'transitionend';
            }
        }



        /***/ }),
    /* 3 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Foundation; });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__ = __webpack_require__(1);






        var FOUNDATION_VERSION = '6.4.2';

        // Global Foundation object
        // This is attached to the window, or used as a module for AMD/Browserify
        var Foundation = {
            version: FOUNDATION_VERSION,

            /**
   * Stores initialized plugins.
   */
            _plugins: {},

            /**
   * Stores generated unique ids for plugin instances
   */
            _uuids: [],

            /**
   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
   * @param {Object} plugin - The constructor of the plugin.
   */
            plugin: function (plugin, name) {
                // Object key to use when adding to global Foundation object
                // Examples: Foundation.Reveal, Foundation.OffCanvas
                var className = name || functionName(plugin);
                // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
                // Examples: data-reveal, data-off-canvas
                var attrName = hyphenate(className);

                // Add to the Foundation object and the plugins list (for reflowing)
                this._plugins[attrName] = this[className] = plugin;
            },
            /**
   * @function
   * Populates the _uuids array with pointers to each individual plugin instance.
   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
   * Also fires the initialization event for each plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @param {String} name - the name of the plugin, passed as a camelCased string.
   * @fires Plugin#init
   */
            registerPlugin: function (plugin, name) {
                var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
                plugin.uuid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["b" /* GetYoDigits */])(6, pluginName);

                if (!plugin.$element.attr('data-' + pluginName)) {
                    plugin.$element.attr('data-' + pluginName, plugin.uuid);
                }
                if (!plugin.$element.data('zfPlugin')) {
                    plugin.$element.data('zfPlugin', plugin);
                }
                /**
     * Fires when the plugin has initialized.
     * @event Plugin#init
     */
                plugin.$element.trigger('init.zf.' + pluginName);

                this._uuids.push(plugin.uuid);

                return;
            },
            /**
   * @function
   * Removes the plugins uuid from the _uuids array.
   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
   * Also fires the destroyed event for the plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @fires Plugin#destroyed
   */
            unregisterPlugin: function (plugin) {
                var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

                this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
                plugin.$element.removeAttr('data-' + pluginName).removeData('zfPlugin')
                /**
     * Fires when the plugin has been destroyed.
     * @event Plugin#destroyed
     */
                    .trigger('destroyed.zf.' + pluginName);
                for (var prop in plugin) {
                    plugin[prop] = null; //clean up script to prep for garbage collection.
                }
                return;
            },

            /**
   * @function
   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
   * @default If no argument is passed, reflow all currently active plugins.
   */
            reInit: function (plugins) {
                var isJQ = plugins instanceof __WEBPACK_IMPORTED_MODULE_0_jquery___default.a;
                try {
                    if (isJQ) {
                        plugins.each(function () {
                            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('zfPlugin')._init();
                        });
                    } else {
                        var type = typeof plugins,
                            _this = this,
                            fns = {
                                'object': function (plgs) {
                                    plgs.forEach(function (p) {
                                        p = hyphenate(p);
                                        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-' + p + ']').foundation('_init');
                                    });
                                },
                                'string': function () {
                                    plugins = hyphenate(plugins);
                                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-' + plugins + ']').foundation('_init');
                                },
                                'undefined': function () {
                                    this['object'](Object.keys(_this._plugins));
                                }
                            };
                        fns[type](plugins);
                    }
                } catch (err) {
                    console.error(err);
                } finally {
                    return plugins;
                }
            },

            /**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */
            reflow: function (elem, plugins) {

                // If plugins is undefined, just grab everything
                if (typeof plugins === 'undefined') {
                    plugins = Object.keys(this._plugins);
                }
                // If plugins is a string, convert it to an array with one item
                else if (typeof plugins === 'string') {
                    plugins = [plugins];
                }

                var _this = this;

                // Iterate through each plugin
                __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(plugins, function (i, name) {
                    // Get the current plugin
                    var plugin = _this._plugins[name];

                    // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
                    var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(elem).find('[data-' + name + ']').addBack('[data-' + name + ']');

                    // For each plugin found, initialize it
                    $elem.each(function () {
                        var $el = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
                            opts = {};
                        // Don't double-dip on plugins
                        if ($el.data('zfPlugin')) {
                            console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
                            return;
                        }

                        if ($el.attr('data-options')) {
                            var thing = $el.attr('data-options').split(';').forEach(function (e, i) {
                                var opt = e.split(':').map(function (el) {
                                    return el.trim();
                                });
                                if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
                            });
                        }
                        try {
                            $el.data('zfPlugin', new plugin(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), opts));
                        } catch (er) {
                            console.error(er);
                        } finally {
                            return;
                        }
                    });
                });
            },
            getFnName: functionName,

            addToJquery: function ($) {
                // TODO: consider not making this a jQuery function
                // TODO: need way to reflow vs. re-initialize
                /**
     * The Foundation jQuery method.
     * @param {String|Array} method - An action to perform on the current jQuery object.
     */
                var foundation = function (method) {
                    var type = typeof method,
                        $noJS = $('.no-js');

                    if ($noJS.length) {
                        $noJS.removeClass('no-js');
                    }

                    if (type === 'undefined') {
                        //needs to initialize the Foundation object, or an individual plugin.
                        __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();
                        Foundation.reflow(this);
                    } else if (type === 'string') {
                        //an individual method to invoke on a plugin or group of plugins
                        var args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary
                        var plugClass = this.data('zfPlugin'); //determine the class of plugin

                        if (plugClass !== undefined && plugClass[method] !== undefined) {
                            //make sure both the class and method exist
                            if (this.length === 1) {
                                //if there's only one, call it directly.
                                plugClass[method].apply(plugClass, args);
                            } else {
                                this.each(function (i, el) {
                                    //otherwise loop through the jQuery collection and invoke the method on each
                                    plugClass[method].apply($(el).data('zfPlugin'), args);
                                });
                            }
                        } else {
                            //error for no class or no method
                            throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
                        }
                    } else {
                        //error for invalid argument type
                        throw new TypeError('We\'re sorry, ' + type + ' is not a valid parameter. You must use a string representing the method you wish to invoke.');
                    }
                    return this;
                };
                $.fn.foundation = foundation;
                return $;
            }
        };

        Foundation.util = {
            /**
   * Function for applying a debounce effect to a function call.
   * @function
   * @param {Function} func - Function to be called at end of timeout.
   * @param {Number} delay - Time in ms to delay the call of `func`.
   * @returns function
   */
            throttle: function (func, delay) {
                var timer = null;

                return function () {
                    var context = this,
                        args = arguments;

                    if (timer === null) {
                        timer = setTimeout(function () {
                            func.apply(context, args);
                            timer = null;
                        }, delay);
                    }
                };
            }
        };

        window.Foundation = Foundation;

        // Polyfill for requestAnimationFrame
        (function () {
            if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {
                return new Date().getTime();
            };

            var vendors = ['webkit', 'moz'];
            for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
                var vp = vendors[i];
                window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
            }
            if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
                var lastTime = 0;
                window.requestAnimationFrame = function (callback) {
                    var now = Date.now();
                    var nextTime = Math.max(lastTime + 16, now);
                    return setTimeout(function () {
                        callback(lastTime = nextTime);
                    }, nextTime - now);
                };
                window.cancelAnimationFrame = clearTimeout;
            }
            /**
   * Polyfill for performance.now, required by rAF
   */
            if (!window.performance || !window.performance.now) {
                window.performance = {
                    start: Date.now(),
                    now: function () {
                        return Date.now() - this.start;
                    }
                };
            }
        })();
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== 'function') {
                    // closest thing possible to the ECMAScript 5
                    // internal IsCallable function
                    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
                }

                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {},
                    fBound = function () {
                        return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                if (this.prototype) {
                    // native functions don't have a prototype
                    fNOP.prototype = this.prototype;
                }
                fBound.prototype = new fNOP();

                return fBound;
            };
        }
        // Polyfill to get the name of a function in IE9
        function functionName(fn) {
            if (Function.prototype.name === undefined) {
                var funcNameRegex = /function\s([^(]{1,})\(/;
                var results = funcNameRegex.exec(fn.toString());
                return results && results.length > 1 ? results[1].trim() : "";
            } else if (fn.prototype === undefined) {
                return fn.constructor.name;
            } else {
                return fn.prototype.constructor.name;
            }
        }
        function parseValue(str) {
            if ('true' === str) return true;else if ('false' === str) return false;else if (!isNaN(str * 1)) return parseFloat(str);
            return str;
        }
        // Convert PascalCase to kebab-case
        // Thank you: http://stackoverflow.com/a/8955580
        function hyphenate(str) {
            return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }



        /***/ }),
    /* 4 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Triggers; });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_motion__ = __webpack_require__(5);





        var MutationObserver = function () {
            var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
            for (var i = 0; i < prefixes.length; i++) {
                if (prefixes[i] + 'MutationObserver' in window) {
                    return window[prefixes[i] + 'MutationObserver'];
                }
            }
            return false;
        }();

        var triggers = function (el, type) {
            el.data(type).split(' ').forEach(function (id) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#' + id)[type === 'close' ? 'trigger' : 'triggerHandler'](type + '.zf.trigger', [el]);
            });
        };

        var Triggers = {
            Listeners: {
                Basic: {},
                Global: {}
            },
            Initializers: {}
        };

        Triggers.Listeners.Basic = {
            openListener: function () {
                triggers(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'open');
            },
            closeListener: function () {
                var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('close');
                if (id) {
                    triggers(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'close');
                } else {
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('close.zf.trigger');
                }
            },
            toggleListener: function () {
                var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('toggle');
                if (id) {
                    triggers(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'toggle');
                } else {
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('toggle.zf.trigger');
                }
            },
            closeableListener: function (e) {
                e.stopPropagation();
                var animation = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('closable');

                if (animation !== '') {
                    __WEBPACK_IMPORTED_MODULE_1__foundation_util_motion__["a" /* Motion */].animateOut(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), animation, function () {
                        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('closed.zf');
                    });
                } else {
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).fadeOut().trigger('closed.zf');
                }
            },
            toggleFocusListener: function () {
                var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('toggle-focus');
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#' + id).triggerHandler('toggle.zf.trigger', [__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)]);
            }
        };

        // Elements with [data-open] will reveal a plugin that supports it when clicked.
        Triggers.Initializers.addOpenListener = function ($elem) {
            $elem.off('click.zf.trigger', Triggers.Listeners.Basic.openListener);
            $elem.on('click.zf.trigger', '[data-open]', Triggers.Listeners.Basic.openListener);
        };

        // Elements with [data-close] will close a plugin that supports it when clicked.
        // If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
        Triggers.Initializers.addCloseListener = function ($elem) {
            $elem.off('click.zf.trigger', Triggers.Listeners.Basic.closeListener);
            $elem.on('click.zf.trigger', '[data-close]', Triggers.Listeners.Basic.closeListener);
        };

        // Elements with [data-toggle] will toggle a plugin that supports it when clicked.
        Triggers.Initializers.addToggleListener = function ($elem) {
            $elem.off('click.zf.trigger', Triggers.Listeners.Basic.toggleListener);
            $elem.on('click.zf.trigger', '[data-toggle]', Triggers.Listeners.Basic.toggleListener);
        };

        // Elements with [data-closable] will respond to close.zf.trigger events.
        Triggers.Initializers.addCloseableListener = function ($elem) {
            $elem.off('close.zf.trigger', Triggers.Listeners.Basic.closeableListener);
            $elem.on('close.zf.trigger', '[data-closeable], [data-closable]', Triggers.Listeners.Basic.closeableListener);
        };

        // Elements with [data-toggle-focus] will respond to coming in and out of focus
        Triggers.Initializers.addToggleFocusListener = function ($elem) {
            $elem.off('focus.zf.trigger blur.zf.trigger', Triggers.Listeners.Basic.toggleFocusListener);
            $elem.on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', Triggers.Listeners.Basic.toggleFocusListener);
        };

        // More Global/complex listeners and triggers
        Triggers.Listeners.Global = {
            resizeListener: function ($nodes) {
                if (!MutationObserver) {
                    //fallback for IE 9
                    $nodes.each(function () {
                        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).triggerHandler('resizeme.zf.trigger');
                    });
                }
                //trigger all listening elements and signal a resize event
                $nodes.attr('data-events', "resize");
            },
            scrollListener: function ($nodes) {
                if (!MutationObserver) {
                    //fallback for IE 9
                    $nodes.each(function () {
                        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).triggerHandler('scrollme.zf.trigger');
                    });
                }
                //trigger all listening elements and signal a scroll event
                $nodes.attr('data-events', "scroll");
            },
            closeMeListener: function (e, pluginId) {
                var plugin = e.namespace.split('.')[0];
                var plugins = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-' + plugin + ']').not('[data-yeti-box="' + pluginId + '"]');

                plugins.each(function () {
                    var _this = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
                    _this.triggerHandler('close.zf.trigger', [_this]);
                });
            }
        };

        // Global, parses whole document.
        Triggers.Initializers.addClosemeListener = function (pluginName) {
            var yetiBoxes = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-yeti-box]'),
                plugNames = ['dropdown', 'tooltip', 'reveal'];

            if (pluginName) {
                if (typeof pluginName === 'string') {
                    plugNames.push(pluginName);
                } else if (typeof pluginName === 'object' && typeof pluginName[0] === 'string') {
                    plugNames.concat(pluginName);
                } else {
                    console.error('Plugin names must be strings');
                }
            }
            if (yetiBoxes.length) {
                var listeners = plugNames.map(function (name) {
                    return 'closeme.zf.' + name;
                }).join(' ');

                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(listeners).on(listeners, Triggers.Listeners.Global.closeMeListener);
            }
        };

        function debounceGlobalListener(debounce, trigger, listener) {
            var timer = void 0,
                args = Array.prototype.slice.call(arguments, 3);
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(trigger).on(trigger, function (e) {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function () {
                    listener.apply(null, args);
                }, debounce || 10); //default time to emit scroll event
            });
        }

        Triggers.Initializers.addResizeListener = function (debounce) {
            var $nodes = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-resize]');
            if ($nodes.length) {
                debounceGlobalListener(debounce, 'resize.zf.trigger', Triggers.Listeners.Global.resizeListener, $nodes);
            }
        };

        Triggers.Initializers.addScrollListener = function (debounce) {
            var $nodes = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-scroll]');
            if ($nodes.length) {
                debounceGlobalListener(debounce, 'scroll.zf.trigger', Triggers.Listeners.Global.scrollListener, $nodes);
            }
        };

        Triggers.Initializers.addMutationEventsListener = function ($elem) {
            if (!MutationObserver) {
                return false;
            }
            var $nodes = $elem.find('[data-resize], [data-scroll], [data-mutate]');

            //element callback
            var listeningElementsMutation = function (mutationRecordsList) {
                var $target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(mutationRecordsList[0].target);

                //trigger the event handler for the element depending on type
                switch (mutationRecordsList[0].type) {
                    case "attributes":
                        if ($target.attr("data-events") === "scroll" && mutationRecordsList[0].attributeName === "data-events") {
                            $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
                        }
                        if ($target.attr("data-events") === "resize" && mutationRecordsList[0].attributeName === "data-events") {
                            $target.triggerHandler('resizeme.zf.trigger', [$target]);
                        }
                        if (mutationRecordsList[0].attributeName === "style") {
                            $target.closest("[data-mutate]").attr("data-events", "mutate");
                            $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
                        }
                        break;

                    case "childList":
                        $target.closest("[data-mutate]").attr("data-events", "mutate");
                        $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
                        break;

                    default:
                        return false;
                        //nothing
                                                   }
            };

            if ($nodes.length) {
                //for each element that needs to listen for resizing, scrolling, or mutation add a single observer
                for (var i = 0; i <= $nodes.length - 1; i++) {
                    var elementObserver = new MutationObserver(listeningElementsMutation);
                    elementObserver.observe($nodes[i], { attributes: true, childList: true, characterData: false, subtree: true, attributeFilter: ["data-events", "style"] });
                }
            }
        };

        Triggers.Initializers.addSimpleListeners = function () {
            var $document = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document);

            Triggers.Initializers.addOpenListener($document);
            Triggers.Initializers.addCloseListener($document);
            Triggers.Initializers.addToggleListener($document);
            Triggers.Initializers.addCloseableListener($document);
            Triggers.Initializers.addToggleFocusListener($document);
        };

        Triggers.Initializers.addGlobalListeners = function () {
            var $document = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document);
            Triggers.Initializers.addMutationEventsListener($document);
            Triggers.Initializers.addResizeListener();
            Triggers.Initializers.addScrollListener();
            Triggers.Initializers.addClosemeListener();
        };

        Triggers.init = function ($, Foundation) {
            if (typeof $.triggersInitialized === 'undefined') {
                var $document = $(document);

                if (document.readyState === "complete") {
                    Triggers.Initializers.addSimpleListeners();
                    Triggers.Initializers.addGlobalListeners();
                } else {
                    $(window).on('load', function () {
                        Triggers.Initializers.addSimpleListeners();
                        Triggers.Initializers.addGlobalListeners();
                    });
                }

                $.triggersInitialized = true;
            }

            if (Foundation) {
                Foundation.Triggers = Triggers;
                // Legacy included to be backwards compatible for now.
                Foundation.IHearYou = Triggers.Initializers.addGlobalListeners;
            }
        };



        /***/ }),
    /* 5 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* unused harmony export Move */
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Motion; });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(2);





        /**
 * Motion module.
 * @module foundation.motion
 */

        var initClasses = ['mui-enter', 'mui-leave'];
        var activeClasses = ['mui-enter-active', 'mui-leave-active'];

        var Motion = {
            animateIn: function (element, animation, cb) {
                animate(true, element, animation, cb);
            },

            animateOut: function (element, animation, cb) {
                animate(false, element, animation, cb);
            }
        };

        function Move(duration, elem, fn) {
            var anim,
                prog,
                start = null;
            // console.log('called');

            if (duration === 0) {
                fn.apply(elem);
                elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
                return;
            }

            function move(ts) {
                if (!start) start = ts;
                // console.log(start, ts);
                prog = ts - start;
                fn.apply(elem);

                if (prog < duration) {
                    anim = window.requestAnimationFrame(move, elem);
                } else {
                    window.cancelAnimationFrame(anim);
                    elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
                }
            }
            anim = window.requestAnimationFrame(move);
        }

        /**
 * Animates an element in or out using a CSS transition class.
 * @function
 * @private
 * @param {Boolean} isIn - Defines if the animation is in or out.
 * @param {Object} element - jQuery or HTML object to animate.
 * @param {String} animation - CSS class to use.
 * @param {Function} cb - Callback to run when animation is finished.
 */
        function animate(isIn, element, animation, cb) {
            element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).eq(0);

            if (!element.length) return;

            var initClass = isIn ? initClasses[0] : initClasses[1];
            var activeClass = isIn ? activeClasses[0] : activeClasses[1];

            // Set up the animation
            reset();

            element.addClass(animation).css('transition', 'none');

            requestAnimationFrame(function () {
                element.addClass(initClass);
                if (isIn) element.show();
            });

            // Start the animation
            requestAnimationFrame(function () {
                element[0].offsetWidth;
                element.css('transition', '').addClass(activeClass);
            });

            // Clean up the animation when it finishes
            element.one(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["a" /* transitionend */])(element), finish);

            // Hides the element (for out animations), resets the element, and runs a callback
            function finish() {
                if (!isIn) element.hide();
                reset();
                if (cb) cb.apply(element);
            }

            // Resets transitions and removes motion-specific classes
            function reset() {
                element[0].style.transitionDuration = 0;
                element.removeClass(initClass + ' ' + activeClass + ' ' + animation);
            }
        }



        /***/ }),
    /* 6 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_deployer_sites_node_foundation_customizer_node_foundation_customizer_foundation_sites_js_foundation_core__ = __webpack_require__(3);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_deployer_sites_node_foundation_customizer_node_foundation_customizer_foundation_sites_js_foundation_util_mediaQuery__ = __webpack_require__(1);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_deployer_sites_node_foundation_customizer_node_foundation_customizer_foundation_sites_js_foundation_util_triggers__ = __webpack_require__(4);


        __WEBPACK_IMPORTED_MODULE_1__home_deployer_sites_node_foundation_customizer_node_foundation_customizer_foundation_sites_js_foundation_core__["a" /* Foundation */].addToJquery(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

        __WEBPACK_IMPORTED_MODULE_1__home_deployer_sites_node_foundation_customizer_node_foundation_customizer_foundation_sites_js_foundation_core__["a" /* Foundation */].MediaQuery = __WEBPACK_IMPORTED_MODULE_2__home_deployer_sites_node_foundation_customizer_node_foundation_customizer_foundation_sites_js_foundation_util_mediaQuery__["a" /* MediaQuery */];

        __WEBPACK_IMPORTED_MODULE_3__home_deployer_sites_node_foundation_customizer_node_foundation_customizer_foundation_sites_js_foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a, __WEBPACK_IMPORTED_MODULE_1__home_deployer_sites_node_foundation_customizer_node_foundation_customizer_foundation_sites_js_foundation_core__["a" /* Foundation */]);

        /***/ })
    /******/ ]);