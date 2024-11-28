const allowedOrigins = [
  "http://localhost:5173",
  "https://developer.0web.minginc.xyz/",
  "https://0web.minginc.xyz",
  "https://0web.vercel.app",
];

/**
 * Adds CORS headers to the response.
 * This function modifies the given `Response` object by adding necessary headers
 * for enabling Cross-Origin Resource Sharing (CORS).
 * It allows the client to send requests to a different origin (specified in the headers).
 *
 * @param {Response} response - The `Response` object to which CORS headers will be added.
 * @returns {Response} The modified `Response` object with CORS headers set.
 *
 * @example
 * const response = new Response();
 * const modifiedResponse = addCorsHeaders(response);
 * // Now the response will have CORS headers like "Access-Control-Allow-Origin"
 */
export function addCorsHeaders(response: Response): Response {
  const origin = response.headers.get("origin");

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  } else {
    response.headers.set(
      "Access-Control-Allow-Origin",
      "http://localhost:5173"
    );
  }
  const corsHeaders = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS", // Allow these HTTP methods
    "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow these headers in the request
    "Access-Control-Allow-Credentials": "true", // Allow credentials like cookies or HTTP authentication
  };

  // Loop over the corsHeaders object and set the headers on the response
  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}
