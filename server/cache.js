const cache = {};
const CACHE_TTL = 60 * 10000;

const getCache = (key) => {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    delete cache[key];
    return null;
  }
  return entry.data;
};

export const setCache = (key, data) =>
  (cache[key] = { data, timestamp: Date.now() });

export const cacheGuard = (key, callback) => getCache(key) ?? callback();
