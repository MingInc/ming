import {
  createProject,
  getProjectsByUser,
} from "./controllers/ProjectRecord.ts";
import { deployProject } from "./controllers/DeployProject.ts";
import {
  createBoilerplate,
  getAllBoilerplates,
  getBoilerplateById,
  updateBoilerplate,
  deleteBoilerplate,
} from "./controllers/Boilerplate.ts";
import { addCorsHeaders } from "./helpers/CorsHeader.ts";
import * as mongoose from "mongoose";

type Method = "GET" | "PUT" | "POST" | "DELETE" | "OPTIONS";

mongoose
  .connect(
    `mongodb+srv://Cluster53271:${process.env.MONGODB_PASSWORD}@cluster53271.l3uzg.mongodb.net/ming?retryWrites=true&w=majority&appName=Cluster53271`
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    return console.log(err);
  });

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
      console.log(Date.now(), apiEndpoint); // works as morgan for Bun

      switch (apiEndpoint) {
        case "POST /api/v1/deploy-project":
          return deployProject(req);
        case "POST /api/v1/create-project":
          return createProject(req);
        case "GET /api/v1/get-projects":
          return getProjectsByUser(req);

        // Boilerplate API endpoints
        case "POST /api/v1/boilerplate":
          return createBoilerplate(req); // Create a new boilerplate
        case "GET /api/v1/boilerplates":
          return getAllBoilerplates(req); // Get all boilerplates
        case `GET /api/v1/boilerplate/${url.pathname.split("/")[4]}`:
          return getBoilerplateById(req); // Get a boilerplate by ID
        case `PUT /api/v1/boilerplate/${url.pathname.split("/")[4]}`:
          return updateBoilerplate(req); // Update a boilerplate by ID
        case `DELETE /api/v1/boilerplate/${url.pathname.split("/")[4]}`:
          return deleteBoilerplate(req); // Delete a boilerplate by ID

        case "GET /api/v1/status":
          return addCorsHeaders(
            new Response(
              JSON.stringify({ message: `I am alive! Thanks for asking. 🥲` }),
              {
                headers: { "Content-Type": "application/json" },
                status: 200,
              }
            )
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

console.log(`Server running at http://localhost:3000/`);
