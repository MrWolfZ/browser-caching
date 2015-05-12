import { CachingMode } from './cachingMode';
import { ICache } from './cache';
import TransientCache from './transientCache';
import SessionCache from './sessionCache';
import InfiniteCache from './infiniteCache';

const transientKey = 'transient';
const sessionKey = 'session';
const infiniteKey = 'infinite';

const caches = new TransientCache();
caches.add(transientKey, new TransientCache());
caches.add(sessionKey, new TransientCache());
caches.add(infiniteKey, new TransientCache());

export default class CacheFactory {
  get = (name: string, mode: CachingMode = CachingMode.Infinite, fallBack: boolean = true): ICache => {
    if (name.indexOf(':$:') > 0) {
      throw new Error('The name of the cache must not contain the special marker: ":$:"');
    }

    mode = this.transformMode(mode, fallBack);

    switch (mode) {
      case CachingMode.Transient:
        return caches.get<ICache>(transientKey).getOrAdd(name, () => new TransientCache());
      case CachingMode.Session:
        return caches.get<ICache>(sessionKey).getOrAdd(name, s => new SessionCache(s));
      case CachingMode.Infinite:
        return caches.get<ICache>(infiniteKey).getOrAdd(name, s => new InfiniteCache(s));
      default:
        throw new Error(`Unknown caching mode: ${mode}`);
    }
  }

  private transformMode(mode: CachingMode, fallBack: boolean) {
    // try/catch is required since accessing the properties on window may throw in
    // some browsers if setting local data is prohibited for the site (e.g. in chrome)
    let localStorageSupported = false;
    try {
      localStorageSupported = typeof window.localStorage !== 'undefined' && window.localStorage !== null;
    }
    catch (e) { }

    let sessionStorageSupported = false;
    try {
      sessionStorageSupported = typeof window.sessionStorage !== 'undefined' && window.sessionStorage !== null;
    }
    catch (e) { }

    if (mode === CachingMode.Infinite && !localStorageSupported) {
      if (!fallBack) {
        throw new Error('The current browser does not support validity Infinite!');
      }

      mode = CachingMode.Session;
    }

    if (mode === CachingMode.Session && !sessionStorageSupported) {
      if (!fallBack) {
        throw new Error('The current browser does not support validity Session!');
      }

      mode = CachingMode.Transient;
    }

    return mode;
  }
}