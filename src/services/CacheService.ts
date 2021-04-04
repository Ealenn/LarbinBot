import NodeCache from 'node-cache';
import { singleton } from 'tsyringe';

/**
 * Cache Service
 */
export interface ICacheService {
  get<T>(key: string): T | undefined;
  set<T>(key: string, value: T): T;
}

@singleton()
export class CacheService implements ICacheService {
  private _cache: NodeCache;
  constructor(){
    this._cache = new NodeCache();
  }

  public get<T>(key: string) : T | undefined {
    return this._cache.get<T>(key);
  }

  public set<T>(key: string, value: T) : T {
    this._cache.set<T>(key, value);
    return value;
  }
}
