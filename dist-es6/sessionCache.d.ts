import { ICache } from './cache';
import { EvictionPolicy } from './evictionPolicy';
import AbstractCache from './abstractCache';
export default class SessionCache extends AbstractCache implements ICache {
    private name;
    constructor(name: string);
    set: <T>(key: string, value: T, policy?: EvictionPolicy) => T;
    get: <T>(key: string) => T;
    remove: <T>(key: string) => T;
    includes: (key: string) => boolean;
    private prefixName(key);
    private isDefined(any);
}
