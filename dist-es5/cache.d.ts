import { EvictionPolicy } from './evictionPolicy';
export interface ICache {
    add<T>(key: string, value: T, policy?: EvictionPolicy): T;
    set<T>(key: string, value: T, policy?: EvictionPolicy): T;
    get<T>(key: string): T;
    getOrAdd<T>(key: string, factory: (key: string) => T, policy?: EvictionPolicy): T;
    addOrUpdate<T>(key: string, addFactory: (key: string) => T, updateFactory: (key: string, old: T) => T, policy?: EvictionPolicy): any;
    remove<T>(key: string): T;
    includes(key: string): boolean;
}
