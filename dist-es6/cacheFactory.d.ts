import { CachingMode } from './cachingMode';
import { ICache } from './cache';
export default class CacheFactory {
    get: (name: string, mode?: CachingMode, fallBack?: boolean) => ICache;
    private transformMode(mode, fallBack);
}
