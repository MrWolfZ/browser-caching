import { EvictionPolicy } from './evictionPolicy';
export default class CacheItem {
    constructor(key, value, policy = EvictionPolicy.Never) {
        this.key = key;
        this.value = value;
        this.policy = policy;
    }
    get isExpired() {
        return new Date().getTime() > this.policy.absoluteTimeout;
    }
}
