function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./cacheFactory'));
__export(require('./cache'));
__export(require('./cachingMode'));
__export(require('./evictionPolicy'));
