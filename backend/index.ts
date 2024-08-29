import { $ } from "bun";

type Method = "GET" | "PUT" | "POST" | "OPTIONS";

function addCorsHeaders(response: Response): Response {
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

const server = Bun.serve({
  port: 3000,
  development: true,
  async fetch(req: Request) {
    try {
      const url = new URL(req.url);
      const method = req.method as Method;

      if (method === "OPTIONS") {
        return addCorsHeaders(new Response("Preflight request successful"));
      }

      const apiEndpoint = `${method} ${url.pathname}`;

      switch (apiEndpoint) {
        case "POST /test":
          const data = await req.json();

          try {
            /**
             * @dev .nothrow() keeps the error message and does not redirect to catch method.
             */
            const consoleResponse = await $`./scripts/DeployProject.sh`.nothrow();
            // const consoleResponse = await $`pwd`.text();

            return addCorsHeaders(
              new Response(JSON.stringify({ message: consoleResponse }), {
                headers: { "Content-Type": "application/json" },
                status: 200,
              })
            );
          } catch (err:any) {
            console.log(err)
            console.log(`Failed with code ${err.exitCode}`);
            console.log(err.stdout.toString());
            console.log(err.stderr.toString());
            return addCorsHeaders(
              new Response(
                JSON.stringify({
                  message: "Script execution failed",
                  error: err.stderr.toString(),
                }),
                {
                  headers: { "Content-Type": "application/json" },
                  status: 500,
                }
              )
            );
          }
        case "GET /test":
          return addCorsHeaders(
            new Response(JSON.stringify({ message: `You called GET /test` }), {
              headers: { "Content-Type": "application/json" },
              status: 200,
            })
          );
        default:
          return addCorsHeaders(
            new Response(
              JSON.stringify({
                message: `You called ${apiEndpoint}, which I don't know how to handle!`,
              }),
              { headers: { "Content-Type": "application/json" }, status: 404 }
            )
          );
      }
    } catch (err) {
      console.error(err);
      return addCorsHeaders(
        new Response(JSON.stringify({ message: "Internal Server Error" }), {
          headers: { "Content-Type": "application/json" },
          status: 500,
        })
      );
    }
  },
  error(error: Error) {
    return addCorsHeaders(
      new Response(`<pre>${error}\n${error.stack}</pre>`, {
        headers: {
          "Content-Type": "text/html",
        },
      })
    );
  },
});

console.log(`Server running at ${server.url}`);
