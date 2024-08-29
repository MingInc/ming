export function addCorsHeaders(response: Response): Response {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  
    for (const [key, value] of Object.entries(corsHeaders)) {
      response.headers.set(key, value);
    }
  
    return response;
  }