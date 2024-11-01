import admin from "firebase-admin";
import { addCorsHeaders } from "../helpers/CorsHeader";
import { UserModel } from "../models/User.models";

// create a new user
export async function createUser(req: Request) {
  try {
    const data = await req.json();
    console.log("data:", data);

    // Check if a user with the provided email or userUid already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email: data?.email }, { userUid: data?.userUid }],
    });

    if (existingUser) {
      return addCorsHeaders(
        new Response(JSON.stringify({ message: "User already exists" }), {
          status: 400,
        })
      );
    }

    // Create a new user if no matching user is found
    const newUser = new UserModel(data);
    await newUser.save();

    return addCorsHeaders(
      new Response(JSON.stringify(newUser), { status: 201 })
    );
  } catch (error) {
    console.error("Failed to create user:", error);
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to create user" }), {
        status: 500,
      })
    );
  }
}

// get user by id
export async function getUserById(req: Request) {
  try {
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to update user" }), {
        status: 500,
      })
    );
  } catch (error) {
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to get user" }), {
        status: 500,
      })
    );
  }
}

// update user by id
export async function updateUserById(req: Request) {
  try {
    const data = await req.json();
    console.log(data);
    const { id, provider, github_accessToken } = data;

    if (!id) {
      return addCorsHeaders(
        new Response(JSON.stringify({ message: "User ID not provided" }), {
          status: 400,
        })
      );
    }

    const user = await UserModel.findOne({ userUid: id });

    if (user) {
      const updatedUser = await UserModel.updateOne(
        { userUid: id },
        {
          $addToSet: { provider: provider }, // Add provider without duplicates
          $set: { github_accessToken: github_accessToken }, // Set or update github_accessToken
        }
      );

      console.log(updatedUser);
      return addCorsHeaders(
        new Response(
          JSON.stringify({
            user: await UserModel.findOne({ userUid: id }), // Return the updated user data
            message: "User updated successfully",
          }),
          { status: 200 }
        )
      );
    }

    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Failed to find user",
        }),
        { status: 400 }
      )
    );
  } catch (error) {
    console.error("Failed to update user:", error);
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to update user" }), {
        status: 500,
      })
    );
  }
}

export async function getGithubAccessToken(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id) {
      return addCorsHeaders(
        new Response(JSON.stringify({ message: "User ID not provided" }), {
          status: 400,
        })
      );
    }

    const user = await UserModel.findOne({ userUid: id });

    if (!user) {
      return addCorsHeaders(
        new Response(
          JSON.stringify({
            message: "Failed to find user",
          }),
          { status: 400 }
        )
      );
    }

    const githubAccessToken = user.github_accessToken;
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          github_accessToken: githubAccessToken,
          message: "GitHub access token retrieved successfully",
        }),
        { status: 200 }
      )
    );
  } catch (error) {
    console.error("Failed to update user:", error);
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to update user" }), {
        status: 500,
      })
    );
  }
}

export async function getGithubAccessTokenFromRefreshToken(req: Request) {
  try {
    const data = await req.json();
    console.log(data);

    const { refreshToken } = data;

    // Your API call to refresh the GitHub token using firebaseToken
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        // headers: {
        //   Authorization: `Bearer ${refreshToken}`,
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      }
    );

    const _data = await response.json();

    return addCorsHeaders(
      new Response(JSON.stringify({ _data }), {
        status: 500,
      })
    );
  } catch (error) {
    console.error("Failed to update user:", error);
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to update user" }), {
        status: 500,
      })
    );
  }
}

export async function getFirebaseUserFromEmail(req: Request) {
  try {
    const data = await req.json();
    const { email } = data;

    const user = await admin.auth().getUserByEmail(email);


    // Unlink GitHub provider from the user
    const updatedUser = await admin.auth().updateUser(user.uid, {
      providersToUnlink: ["github.com"],
    });

    console.log("user :", user);

    // const { UserRecord } = user;
    // console.log("user record :", UserRecord);
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "user found successfully",
          user: updatedUser,
        }),
        {
          status: 201,
        }
      )
    );
  } catch (error) {
    console.error("Failed to update user:", error);
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to get user" }), {
        status: 500,
      })
    );
  }
}
