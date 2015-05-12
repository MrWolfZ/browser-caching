declare module 'browser-caching' {
    class EvictionPolicy {
        absoluteTimeout: number;
        constructor(absoluteTimeout: number);
        static Never: EvictionPolicy;
    }
    
    interface ICache {
        add<T>(key: string, value: T, policy?: EvictionPolicy): T;
        set<T>(key: string, value: T, policy?: EvictionPolicy): T;
        get<T>(key: string): T;
        getOrAdd<T>(key: string, factory: (key: string) => T, policy?: EvictionPolicy): T;
        addOrUpdate<T>(key: string, addFactory: (key: string) => T, updateFactory: (key: string, old: T) => T, policy?: EvictionPolicy): any;
        remove<T>(key: string): T;
        includes(key: string): boolean;
    }
    
    class CacheItem<T> {
        key: string;
        value: T;
        policy: EvictionPolicy;
        constructor(key: string, value: T, policy?: EvictionPolicy);
        isExpired: boolean;
    }
    
    class AbstractCache implements ICache {
        add: <T>(key: string, value: T, policy?: EvictionPolicy) => T;
        set: <T>(key: string, value: T, policy?: EvictionPolicy) => T;
        get: <T>(key: string) => T;
        getOrAdd: <T>(key: string, factory: (key: string) => T, policy?: EvictionPolicy) => T;
        addOrUpdate: <T>(key: string, addFactory: (key: string) => T, updateFactory: (key: string, old: T) => T, policy?: EvictionPolicy) => T;
        remove: <T>(key: string) => T;
        includes: (key: string) => boolean;
        protected checkAndHandleExpiry<T>(item: CacheItem<T>): T;
    }
    
    enum CachingMode {
        Transient = 0,
        Session = 1,
        Infinite = 2,
    }
    
    class TransientCache extends AbstractCache implements ICache {
        set: <T>(key: string, value: T, policy?: EvictionPolicy) => T;
        get: <T>(key: string) => T;
        remove: <T>(key: string) => T;
        includes: (key: string) => boolean;
    }
    
    class SessionCache extends AbstractCache implements ICache {
        private name;
        constructor(name: string);
        set: <T>(key: string, value: T, policy?: EvictionPolicy) => T;
        get: <T>(key: string) => T;
        remove: <T>(key: string) => T;
        includes: (key: string) => boolean;
        private prefixName(key);
        private isDefined(any);
    }
    
    class InfiniteCache extends AbstractCache implements ICache {
        private name;
        constructor(name: string);
        set: <T>(key: string, value: T, policy?: EvictionPolicy) => T;
        get: <T>(key: string) => T;
        remove: <T>(key: string) => T;
        includes: (key: string) => boolean;
        private prefixName(key);
        private isDefined(any);
    }
    
    class CacheFactory {
        get: (name: string, mode?: CachingMode, fallBack?: boolean) => ICache;
        private transformMode(mode, fallBack);
    }
}