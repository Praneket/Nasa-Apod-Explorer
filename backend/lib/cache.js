const { LRUCache } = require("lru-cache");

const ttl = parseInt(process.env.CACHE_TTL_SECONDS || "86400", 10) * 1000;
const max = parseInt(process.env.CACHE_MAX_ITEMS || "200", 10);

const cache = new LRUCache({
  max: max,
  ttl: ttl,
});

module.exports = cache;
