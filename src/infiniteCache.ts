import { ICache } from './cache';
import { EvictionPolicy } from './evictionPolicy';
import CacheItem from './cacheItem';
import AbstractCache from './abstractCache';

export default class InfiniteCache extends AbstractCache implements ICache {
  constructor(private name: string) {
    super();
    if (!window.localStorage) {
      throw new Error('Local storage must be supported by browsers for this cache to be used!');
    }
  }

  set = <T>(key: string, value: T, policy?: EvictionPolicy): T => {
    key = this.prefixName(key);
    window.localStorage.setItem(key, JSON.stringify(new CacheItem(key, value, policy)));
    return value;
  }

  get = <T>(key: string): T => {
    key = this.prefixName(key);
    return this.checkAndHandleExpiry(<CacheItem<T>>(JSON.parse(window.localStorage.getItem(key) || '{}')));
  }

  remove = <T>(key: string): T => {
    key = this.prefixName(key);
    const res = this.get<T>(key);
    window.localStorage.removeItem(key);
    return res;
  }

  includes = (key: string): boolean => {
    return this.isDefined(this.get(key));
  }

  private prefixName(key: string): string {
    return `${this.name}:$:${key}`;
  }

  private isDefined(any: any): boolean {
    return typeof any !== 'undefined' && any !== null;
  }
}