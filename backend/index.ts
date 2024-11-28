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
  checkGithubSession,
  createUser,
  getFirebaseUserFromEmail,
  getFrameworkInfo,
  getGithubAccessToken,
  getGithubUserDetails,
  getRepoContents,
  getRepositories,
  getUserById,
  handleGithubCallback,
  handleGithubRevoke,
  loginWithGithub,
  refreshAccessToken,
  updateUserById,
} from "./controllers";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import serviceAccountKey from "./serviceAccountKey.json";
import {
  createSupport,
  getSupportTicketById,
} from "./controllers/Support.controller.ts";
import Stripe from "stripe";
import {
  getPaymentById,
  handleStripePayment,
  handleWebHook,
} from "./controllers/Payment.controller.ts";
import { stripeKey } from "./constants/variable.ts";
import { handleDownloadInvoice } from "./controllers/invoice.controller.ts";

export const stripe = new Stripe(stripeKey!);

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

// const sslCertificates = {
//   key: Bun.file("./server.key"),
//   cert: Bun.file("./server.crt"),
// };

const server = Bun.serve({
  port: 3000,
  development: true,
  // tls: {
  //   key: Bun.file("./server.key"),
  //   cert: Bun.file("./server.crt"),
  // },
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

        case "POST /github/callback":
          return handleGithubCallback(req);

        case "GET /github/revoke":
          return handleGithubRevoke(req);

        case "GET /check-github-session":
          return checkGithubSession(req);

        // User API endpoints
        case "POST /api/v1/user":
          return createUser(req);

        case `GET /api/v1/user`:
          return getUserById(req);

        case "POST /api/v1/user/update":
          return updateUserById(req);

        case "GET /api/v1/user/accessToken":
          return getGithubAccessToken(req);

        case "GET /api/v1/user/refreshToken":
          return refreshAccessToken(req);

        case "GET /api/v1/user/repos":
          return getRepositories(req);

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
          return getSupportTicketById(req);

        case "POST /api/v1/user/create-checkout-session":
          return handleStripePayment(req);

        case "GET /api/v1/user/payments":
          return getPaymentById(req);

        case "POST /download-invoice":
          return handleDownloadInvoice(req);

        // case "POST /github/webhook":
        //   return async function () {
        //     const payload = await req.json();
        //     const githubId = payload.pusher.id || payload.sender?.id;

        //     if (!githubId) {
        //       return addCorsHeaders(
        //         new Response(
        //           JSON.stringify("GitHub user ID not found in payload"),
        //           {
        //             status: 400,
        //           }
        //         )
        //       );
        //     }

        //     try {

        //     } catch (error) {
        //       return addCorsHeaders(
        //         new Response("Internal Server Error", { status: 500 })
        //       );
        //     }
        //     return addCorsHeaders(
        //       new Response(
        //         JSON.stringify({
        //           message: "Response from github webhook",
        //         })
        //       )
        //     );
        //   };

        case "POST /stripe/webhook":
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
