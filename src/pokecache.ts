export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<unknown>>();
  #reapIntervalId: NodeJS.Timeout | undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  add<T>(key: string, val: T): void {
    this.#cache.set(key, { createdAt: Date.now(), val });
  }

  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val as T | undefined;
  }

  #reap(): void {
    const cutoff = Date.now() - this.#interval;

    for (const [key, entry] of this.#cache) {
      if (entry.createdAt < cutoff) {
        this.#cache.delete(key);
      }
    }
  }

  stopReapLoop(): void {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
