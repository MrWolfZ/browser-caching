import { ICache } from './cache';
import { EvictionPolicy } from './evictionPolicy';
import CacheItem from './cacheItem';

export default class AbstractCache implements ICache {

  add = <T>(key: string, value: T, policy?: EvictionPolicy): T => {
    if (this.includes(key)) {
      throw new Error(`Key ${key} is already present!`);
    }

    return this.set(key, value, policy);
  }

  set = <T>(key: string, value: T, policy?: EvictionPolicy): T => {
    throw new Error('method is abstract');
  }

  get = <T>(key: string): T => {
    throw new Error('method is abstract');
  }

  getOrAdd = <T>(key: string, factory: (key: string) => T, policy?: EvictionPolicy): T => {
    if (this.includes(key)) {
      return this.get<T>(key);
    }

    return this.add(key, factory(key), policy);
  }

  addOrUpdate = <T>(key: string, addFactory: (key: string) => T, updateFactory: (key: string, old: T) => T, policy?: EvictionPolicy) => {
    if (this.includes(key)) {
      return this.set(key, updateFactory(key, this.get<T>(key)), policy);
    }

    return this.set(key, addFactory(key), policy);
  }

  remove = <T>(key: string): T => {
    throw new Error('method is abstract');
  }

  includes = (key: string): boolean => {
    throw new Error('method is abstract');
  }

  protected checkAndHandleExpiry<T>(item: CacheItem<T>): T {
    if (item.isExpired) {
      this.remove(item.key);
      return null;
    }

    return item.value;
  }
}