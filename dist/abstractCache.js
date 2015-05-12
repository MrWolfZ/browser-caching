var AbstractCache = (function () {
    function AbstractCache() {
        var _this = this;
        this.add = function (key, value, policy) {
            if (_this.includes(key)) {
                throw new Error("Key " + key + " is already present!");
            }
            return _this.set(key, value, policy);
        };
        this.set = function (key, value, policy) {
            throw new Error('method is abstract');
        };
        this.get = function (key) {
            throw new Error('method is abstract');
        };
        this.getOrAdd = function (key, factory, policy) {
            if (_this.includes(key)) {
                return _this.get(key);
            }
            return _this.add(key, factory(key), policy);
        };
        this.addOrUpdate = function (key, addFactory, updateFactory, policy) {
            if (_this.includes(key)) {
                return _this.set(key, updateFactory(key, _this.get(key)), policy);
            }
            return _this.set(key, addFactory(key), policy);
        };
        this.remove = function (key) {
            throw new Error('method is abstract');
        };
        this.includes = function (key) {
            throw new Error('method is abstract');
        };
    }
    AbstractCache.prototype.checkAndHandleExpiry = function (item) {
        if (item.isExpired) {
            this.remove(item.key);
            return null;
        }
        return item.value;
    };
    return AbstractCache;
})();
exports.default = AbstractCache;
