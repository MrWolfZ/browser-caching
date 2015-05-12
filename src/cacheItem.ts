import { EvictionPolicy } from './evictionPolicy';

export default class CacheItem<T> {
  constructor(public key: string, public value: T, public policy: EvictionPolicy = EvictionPolicy.Never) {
  }

  get isExpired() {
    return new Date().getTime() > this.policy.absoluteTimeout;
  }
}