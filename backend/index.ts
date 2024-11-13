import {
  createProject,
  getProjectsByUser,
} from "./controllers/ProjectRecord.ts";
import {
  deployProject,
  getAccessToken,
  getUserData,
} from "./controllers/DeployProject.ts";
import {
  createBoilerplate,
  getAllBoilerplates,
  getBoilerplateById,
  updateBoilerplate,
  deleteBoilerplate,
} from "./controllers/Boilerplate.ts";
import { addCorsHeaders } from "./helpers/CorsHeader.ts";
import * as mongoose from "mongoose";
import {
  createUser,
  getFirebaseUserFromEmail,
  getFrameworkInfo,
  getGithubAccessToken,
  getGithubUserDetails,
  getRepoContents,
  getUserById,
  handleGithubCallback,
  handleGithubRevoke,
  loginWithGithub,
  updateUserById,
} from "./controllers/User.controller.ts";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import serviceAccountKey from "./serviceAccountKey.json";
import {
  createSupport,
  getAllSupportTickets,
} from "./controllers/Support.controller.ts";
import Stripe from "stripe";
import {
  handleStripePayment,
  handleWebHook,
} from "./controllers/Payment.controller.ts";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
});

type Method = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "OPTIONS";

mongoose
  .connect(
    "mongodb://localhost:27017/ming"
    // `mongodb+srv://Cluster53271:${process.env.MONGODB_PASSWORD}@cluster53271.l3uzg.mongodb.net/ming?retryWrites=true&w=majority&appName=Cluster53271`
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

      // if (method === "POST" && apiEndpoint === "POST /api/v1/user") {
      //   // Run validation middleware before createUser
      //   const validationResponse = await validateUser(req);
      //   console.log("validte response :", validationResponse);
      //   if (validationResponse) return validationResponse;

      //   // Call createUser if validation passed
      //   return createUser(req);
      // }

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

        case "GET /api/v1/getAccessToken":
          return getAccessToken(req);

        case "GET /api/v1/getUserData":
          return getUserData(req);

        // Github Api Endpoints
        case "GET /github/login":
          return loginWithGithub(req);

        case "GET /github/callback":
          return handleGithubCallback(req);

        case "GET /github/revoke":
          return handleGithubRevoke(req);

        // User API endpoints
        case "POST /api/v1/user":
          return createUser(req);

        case `GET /api/v1/user`:
          return getUserById(req);

        case "POST /api/v1/user/update":
          return updateUserById(req);

        case "POST /api/v1/user/accessToken":
          return getGithubAccessToken(req);

        case "POST /api/v1/user/getRepoContents":
          return getRepoContents(req);

        case "POST /api/v1/repo/getFrameworkInfo":
          return getFrameworkInfo(req);

        case "POST /api/v1/getUserData":
          return getGithubUserDetails(req);

        case "POST /api/v1/user/getFirebaseUserByEmail":
          return getFirebaseUserFromEmail(req);

        // Support API endpoints
        case "POST /api/v1/user/support":
          return createSupport(req);

        case "GET /api/v1/user/support":
          return getAllSupportTickets(req);

        case "POST /api/v1/user/create-checkout-session":
          return handleStripePayment(req);

        case "POST /webhook":
          return handleWebHook(req);

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
