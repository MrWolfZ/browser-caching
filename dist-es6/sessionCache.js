import CacheItem from './cacheItem';
import AbstractCache from './abstractCache';
export default class SessionCache extends AbstractCache {
    constructor(name) {
        super();
        this.name = name;
        this.set = (key, value, policy) => {
            key = this.prefixName(key);
            window.sessionStorage.setItem(key, JSON.stringify(new CacheItem(key, value, policy)));
            return value;
        };
        this.get = (key) => {
            key = this.prefixName(key);
            return this.checkAndHandleExpiry((JSON.parse(window.sessionStorage.getItem(key) || '{}')));
        };
        this.remove = (key) => {
            key = this.prefixName(key);
            const res = this.get(key);
            window.sessionStorage.removeItem(key);
            return res;
        };
        this.includes = (key) => {
            return this.isDefined(this.get(key));
        };
        if (!window.sessionStorage) {
            throw new Error('Session storage must be supported by browsers for this cache to be used!');
        }
    }
    prefixName(key) {
        return `${this.name}:$:${key}`;
    }
    isDefined(any) {
        return typeof any !== 'undefined' && any !== null;
    }
}
