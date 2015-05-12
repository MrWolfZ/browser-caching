var evictionPolicy_1 = require('./evictionPolicy');
var CacheItem = (function () {
    function CacheItem(key, value, policy) {
        if (policy === void 0) { policy = evictionPolicy_1.EvictionPolicy.Never; }
        this.key = key;
        this.value = value;
        this.policy = policy;
    }
    Object.defineProperty(CacheItem.prototype, "isExpired", {
        get: function () {
            return new Date().getTime() > this.policy.absoluteTimeout;
        },
        enumerable: true,
        configurable: true
    });
    return CacheItem;
})();
exports.default = CacheItem;
