var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cacheItem_1 = require('./cacheItem');
var abstractCache_1 = require('./abstractCache');
var cache = Object.create(null);
var TransientCache = (function (_super) {
    __extends(TransientCache, _super);
    function TransientCache() {
        var _this = this;
        _super.apply(this, arguments);
        this.set = function (key, value, policy) {
            cache[key] = new cacheItem_1.default(key, value, policy);
            return value;
        };
        this.get = function (key) {
            return _this.checkAndHandleExpiry((cache[key] || {}));
        };
        this.remove = function (key) {
            var res = _this.get(key);
            delete cache[key];
            return res;
        };
        this.includes = function (key) {
            return key in cache;
        };
    }
    return TransientCache;
})(abstractCache_1.default);
exports.default = TransientCache;
