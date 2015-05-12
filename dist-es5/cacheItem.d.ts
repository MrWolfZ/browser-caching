import { EvictionPolicy } from './evictionPolicy';
export default class CacheItem<T> {
    key: string;
    value: T;
    policy: EvictionPolicy;
    constructor(key: string, value: T, policy?: EvictionPolicy);
    isExpired: boolean;
}
