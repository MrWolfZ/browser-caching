(function (CachingMode) {
    CachingMode[CachingMode["Transient"] = 0] = "Transient";
    CachingMode[CachingMode["Session"] = 1] = "Session";
    CachingMode[CachingMode["Infinite"] = 2] = "Infinite";
})(exports.CachingMode || (exports.CachingMode = {}));
var CachingMode = exports.CachingMode;
