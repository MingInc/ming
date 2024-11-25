import redisClient from "../redis";

export async function getOrSetCache(
  key: string,
  fetchFn: () => Promise<any>,
  ttl: number = 3600
) {
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
