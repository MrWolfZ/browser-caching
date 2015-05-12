var cachingMode_1 = require('./cachingMode');
var transientCache_1 = require('./transientCache');
var sessionCache_1 = require('./sessionCache');
var infiniteCache_1 = require('./infiniteCache');
var transientKey = 'transient';
var sessionKey = 'session';
var infiniteKey = 'infinite';
var caches = new transientCache_1.default();
caches.add(transientKey, new transientCache_1.default());
caches.add(sessionKey, new transientCache_1.default());
caches.add(infiniteKey, new transientCache_1.default());
var CacheFactory = (function () {
    function CacheFactory() {
        var _this = this;
        this.get = function (name, mode, fallBack) {
            if (mode === void 0) { mode = cachingMode_1.CachingMode.Infinite; }
            if (fallBack === void 0) { fallBack = true; }
            if (name.indexOf(':$:') > 0) {
                throw new Error('The name of the cache must not contain the special marker: ":$:"');
            }
            mode = _this.transformMode(mode, fallBack);
            switch (mode) {
                case cachingMode_1.CachingMode.Transient:
                    return caches.get(transientKey).getOrAdd(name, function () { return new transientCache_1.default(); });
                case cachingMode_1.CachingMode.Session:
                    return caches.get(sessionKey).getOrAdd(name, function (s) { return new sessionCache_1.default(s); });
                case cachingMode_1.CachingMode.Infinite:
                    return caches.get(infiniteKey).getOrAdd(name, function (s) { return new infiniteCache_1.default(s); });
                default:
                    throw new Error("Unknown caching mode: " + mode);
            }
        };
    }
    CacheFactory.prototype.transformMode = function (mode, fallBack) {
        // try/catch is required since accessing the properties on window may throw in
        // some browsers if setting local data is prohibited for the site (e.g. in chrome)
        var localStorageSupported = false;
        try {
            localStorageSupported = typeof window.localStorage !== 'undefined' && window.localStorage !== null;
        }
        catch (e) { }
        var sessionStorageSupported = false;
        try {
            sessionStorageSupported = typeof window.sessionStorage !== 'undefined' && window.sessionStorage !== null;
        }
        catch (e) { }
        if (mode === cachingMode_1.CachingMode.Infinite && !localStorageSupported) {
            if (!fallBack) {
                throw new Error('The current browser does not support validity Infinite!');
            }
            mode = cachingMode_1.CachingMode.Session;
        }
        if (mode === cachingMode_1.CachingMode.Session && !sessionStorageSupported) {
            if (!fallBack) {
                throw new Error('The current browser does not support validity Session!');
            }
            mode = cachingMode_1.CachingMode.Transient;
        }
        return mode;
    };
    return CacheFactory;
})();
exports.default = CacheFactory;
