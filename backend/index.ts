type Path = "/api/v1";
type Method = "GET" | "PUT";

const server = Bun.serve({
  port: 3000,
  development: true,
  async fetch(req) {
    try {
      const url = new URL(req.url);
      const method = req.method;

      const apiEndpoint: any = `${method as Method} ${url.pathname as Path}`;

      switch (apiEndpoint) {
        case "PUT /api/v1":
          return new Response(
            JSON.stringify({ message: `You called PUT /flags` }),
            { headers: { "Content-Type": "application/json" }, status: 200 }
          );
        case "GET /test":
          return new Response(
            JSON.stringify({ message: `You called GET /flags` }),
            { headers: { "Content-Type": "application/json" }, status: 200 }
          );
        default:
          return new Response(
            JSON.stringify({
              message: `You called ${apiEndpoint}, which I don't know how to handle!`,
            }),
            { headers: { "Content-Type": "application/json" }, status: 404 }
          );
      }
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ message: "Internal Server Error" }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }
    // @dev Example Response
    // return new Response(JSON.stringify({ message: "Hello!" }), {
    //   headers: { "Content-Type": "application/json" },
    // });
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response("Home page!");
    }
    if (url.pathname === "/blog") return new Response("Blog!");
    return new Response("404!");
  },
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});

console.log(server.url.href);
