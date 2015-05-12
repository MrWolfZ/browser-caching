import { ICache } from './cache';
import { EvictionPolicy } from './evictionPolicy';
import CacheItem from './cacheItem';
export default class AbstractCache implements ICache {
    add: <T>(key: string, value: T, policy?: EvictionPolicy) => T;
    set: <T>(key: string, value: T, policy?: EvictionPolicy) => T;
    get: <T>(key: string) => T;
    getOrAdd: <T>(key: string, factory: (key: string) => T, policy?: EvictionPolicy) => T;
    addOrUpdate: <T>(key: string, addFactory: (key: string) => T, updateFactory: (key: string, old: T) => T, policy?: EvictionPolicy) => T;
    remove: <T>(key: string) => T;
    includes: (key: string) => boolean;
    protected checkAndHandleExpiry<T>(item: CacheItem<T>): T;
}
