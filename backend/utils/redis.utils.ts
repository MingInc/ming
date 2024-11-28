import redisClient from "../redis";

/**
 * Tries to fetch data from the cache. If the data is not found in the cache, it calls the provided
 * `fetchFn` to fetch the data, stores it in the cache, and then returns the fetched data.
 *
 * @param {string} key - The cache key used to store and retrieve the cached data.
 * @param {() => Promise<any>} fetchFn - A function that fetches the data if not found in the cache. It should return a promise that resolves to the data.
 * @param {number} [ttl=3600] - The time-to-live (TTL) for the cached data in seconds. Default is 3600 seconds (1 hour).
 *
 * @returns {Promise<any>} A promise that resolves to the data, either from the cache or fetched using `fetchFn`.
 */
export async function getOrSetCache(
  key: string,
  fetchFn: () => Promise<any>,
  ttl: number = 3600
): Promise<any> {
  const cachedData = await redisClient.get(key);

  if (cachedData) {
    console.log("Cache hit:", key);
    return JSON.parse(cachedData); // Return parsed data from cache
  }

  console.log("Cache miss:", key);
  const data = await fetchFn(); // Fetch data from API or source
  await redisClient.setEx(key, ttl, JSON.stringify(data)); // Cache the data with TTL
  return data;
}
