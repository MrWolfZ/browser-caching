import { ICache } from './cache';
import { EvictionPolicy } from './evictionPolicy';
import CacheItem from './cacheItem';
import AbstractCache from './abstractCache';

const cache = Object.create(null);

export default class TransientCache extends AbstractCache implements ICache {
  set = <T>(key: string, value: T, policy?: EvictionPolicy): T => {
    cache[key] = new CacheItem(key, value, policy);
    return value;
  }

  get = <T>(key: string): T => {
    return this.checkAndHandleExpiry(<CacheItem<T>>(cache[key] || {}));
  }

  remove = <T>(key: string): T => {
    const res = this.get<T>(key);
    delete cache[key];
    return res;
  }

  includes = (key: string): boolean => {
    return key in cache;
  }
}