import CacheItem from './cacheItem';
import AbstractCache from './abstractCache';
const cache = Object.create(null);
export default class TransientCache extends AbstractCache {
    constructor(...args) {
        super(...args);
        this.set = (key, value, policy) => {
            cache[key] = new CacheItem(key, value, policy);
            return value;
        };
        this.get = (key) => {
            return this.checkAndHandleExpiry((cache[key] || {}));
        };
        this.remove = (key) => {
            const res = this.get(key);
            delete cache[key];
            return res;
        };
        this.includes = (key) => {
            return key in cache;
        };
    }
}
