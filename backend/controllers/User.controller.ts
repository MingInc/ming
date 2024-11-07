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
          status: 201,
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

export async function getGithubUserDetails(req: Request) {
  const data = await req.json();
  const { accessToken } = data;
  try {
    const response = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "user found successfully",
          user: data,
        }),
        {
          status: 201,
        }
      )
    );
  } catch (error) {
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to get user" }), {
        status: 500,
      })
    );
  }
}

export async function getFrameworkInfo(req: Request) {
  try {
    const data = await req.json();
    const { owner, repo, token } = data;
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/package.json`,
      {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   Accept: "application/vnd.github.v3.raw", // To get the raw content
        // },
      }
    );
    const _data = await response.json();
    console.log("data :", atob(_data.content));
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "frameworkInfo found successfully",
          data: atob(_data.content),
        }),
        {
          status: 201,
        }
      )
    );
  } catch (error) {
    return addCorsHeaders(
      new Response(JSON.stringify({ error }), {
        status: 500,
      })
    );
  }
}
export async function getFrameworkContent(req: Request) {
  try {
    const data = await req.json();
    const { owner, repo, path } = data;
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: "GET",
      }
    );
    const _data = await response.json();
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "frameworkInfo found successfully",
          data: _data,
        }),
        {
          status: 201,
        }
      )
    );
  } catch (error) {
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to get user" }), {
        status: 500,
      })
    );
  }
}
