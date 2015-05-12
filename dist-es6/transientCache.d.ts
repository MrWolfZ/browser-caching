import { ICache } from './cache';
import { EvictionPolicy } from './evictionPolicy';
import AbstractCache from './abstractCache';
export default class TransientCache extends AbstractCache implements ICache {
    set: <T>(key: string, value: T, policy?: EvictionPolicy) => T;
    get: <T>(key: string) => T;
    remove: <T>(key: string) => T;
    includes: (key: string) => boolean;
}
