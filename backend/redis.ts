import { createClient } from '@redis/client';

const redisClient = createClient({
  url: 'redis://localhost:6379', // Replace with your Redis URL if hosted remotely
});

redisClient.connect().catch(console.error);

export default redisClient;
