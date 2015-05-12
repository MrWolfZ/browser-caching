import CacheItem from './cacheItem';
import AbstractCache from './abstractCache';
export default class InfiniteCache extends AbstractCache {
    constructor(name) {
        super();
        this.name = name;
        this.set = (key, value, policy) => {
            key = this.prefixName(key);
            window.localStorage.setItem(key, JSON.stringify(new CacheItem(key, value, policy)));
            return value;
        };
        this.get = (key) => {
            key = this.prefixName(key);
            return this.checkAndHandleExpiry((JSON.parse(window.localStorage.getItem(key) || '{}')));
        };
        this.remove = (key) => {
            key = this.prefixName(key);
            const res = this.get(key);
            window.localStorage.removeItem(key);
            return res;
        };
        this.includes = (key) => {
            return this.isDefined(this.get(key));
        };
        if (!window.localStorage) {
            throw new Error('Local storage must be supported by browsers for this cache to be used!');
        }
    }
    prefixName(key) {
        return `${this.name}:$:${key}`;
    }
    isDefined(any) {
        return typeof any !== 'undefined' && any !== null;
    }
}
