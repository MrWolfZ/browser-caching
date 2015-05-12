var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cacheItem_1 = require('./cacheItem');
var abstractCache_1 = require('./abstractCache');
var InfiniteCache = (function (_super) {
    __extends(InfiniteCache, _super);
    function InfiniteCache(name) {
        var _this = this;
        _super.call(this);
        this.name = name;
        this.set = function (key, value, policy) {
            key = _this.prefixName(key);
            window.localStorage.setItem(key, JSON.stringify(new cacheItem_1.default(key, value, policy)));
            return value;
        };
        this.get = function (key) {
            key = _this.prefixName(key);
            return _this.checkAndHandleExpiry((JSON.parse(window.localStorage.getItem(key) || '{}')));
        };
        this.remove = function (key) {
            key = _this.prefixName(key);
            var res = _this.get(key);
            window.localStorage.removeItem(key);
            return res;
        };
        this.includes = function (key) {
            return _this.isDefined(_this.get(key));
        };
        if (!window.localStorage) {
            throw new Error('Local storage must be supported by browsers for this cache to be used!');
        }
    }
    InfiniteCache.prototype.prefixName = function (key) {
        return this.name + ":$:" + key;
    };
    InfiniteCache.prototype.isDefined = function (any) {
        return typeof any !== 'undefined' && any !== null;
    };
    return InfiniteCache;
})(abstractCache_1.default);
exports.default = InfiniteCache;
