import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  const caches: Cache[] = [];

  function makeCache(interval = 1000): Cache {
    const cache = new Cache(interval);
    caches.push(cache);
    return cache;
  }

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    for (const cache of caches.splice(0)) {
      cache.stopReapLoop();
    }
    vi.useRealTimers();
  });

  test("adds and retrieves an entry", () => {
    const cache = makeCache();
    cache.add("greeting", "hello");

    expect(cache.get<string>("greeting")).toBe("hello");
  });

  test("returns undefined for a missing key", () => {
    const cache = makeCache();

    expect(cache.get<string>("missing")).toBeUndefined();
  });

  test("replaces the value when adding an existing key", () => {
    const cache = makeCache();
    cache.add("count", 1);
    cache.add("count", 2);

    expect(cache.get<number>("count")).toBe(2);
  });

  test("keeps different keys from overwriting each other", () => {
    const cache = makeCache();
    cache.add("first", "pikachu");
    cache.add("second", "charmander");

    expect(cache.get<string>("first")).toBe("pikachu");
    expect(cache.get<string>("second")).toBe("charmander");
  });

  test("keeps fresh entries available", () => {
    const cache = makeCache(1000);
    cache.add("fresh", "pikachu");

    vi.advanceTimersByTime(500);

    expect(cache.get<string>("fresh")).toBe("pikachu");
  });

  test("removes entries older than the interval", () => {
    const cache = makeCache(1000);
    cache.add("old", "pikachu");

    vi.advanceTimersByTime(2000);

    expect(cache.get<string>("old")).toBeUndefined();
  });

  test("stops reaping after stopReapLoop", () => {
    const cache = makeCache(1000);
    cache.stopReapLoop();
    cache.add("old", "pikachu");

    vi.advanceTimersByTime(2000);

    expect(cache.get<string>("old")).toBe("pikachu");
  });
});
