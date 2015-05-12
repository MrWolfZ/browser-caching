var EvictionPolicy = (function () {
    function EvictionPolicy(absoluteTimeout) {
        this.absoluteTimeout = absoluteTimeout;
    }
    EvictionPolicy.Never = new EvictionPolicy(Number.MAX_VALUE);
    return EvictionPolicy;
})();
exports.EvictionPolicy = EvictionPolicy;
