import admin from "firebase-admin";
import { addCorsHeaders } from "../helpers/CorsHeader";
import { sendWelcomeEmail } from "../utils";
import { SupportModel, UserModel } from "../models";

// create a new user
export async function createUser(req: Request) {
  try {
    const data = await req.json();

    // Check if a user with the provided email or userUid already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email: data.email }, { userUid: data.userUid }],
    });

    if (existingUser) {
      // Return a 409 Conflict response if the user already exists
      return addCorsHeaders(
        new Response(
          JSON.stringify({
            messge: "User already exists",
          }),
          { status: 201 }
        )
      );
    }

    // Create a new user since validation passed
    const newUser = new UserModel(data);
    await newUser.save();

    sendWelcomeEmail(newUser?.email!);

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

// Function to get a user by ID
export async function getUserById(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      // Return a 400 Bad Request response if the ID parameter is missing
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "User ID is required" }), {
          status: 400,
        })
      );
    }

    // Fetch the user from the database by ID
    const user = await UserModel.find({
      userUid: userId,
    });

    if (!user) {
      // Return a 404 Not Found response if the user does not exist
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
        })
      );
    }

    // Return the user data if found
    return addCorsHeaders(
      new Response(JSON.stringify(user), {
        status: 200,
      })
    );
  } catch (error) {
    console.error("Failed to get user:", error);

    // Return a 500 Internal Server Error response if an error occurs
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

export async function deleteUser(req: Request) {
  try {
    const { userUid } = await req.json();

    if (!userUid) {
      return addCorsHeaders(
        new Response(
          JSON.stringify({
            error: "User UID is required",
          }),
          { status: 400 }
        )
      );
    }

    // Check if the user exists
    const user = await UserModel.findOne({ userUid });
    if (!user) {
      return addCorsHeaders(
        new Response(
          JSON.stringify({
            error: "User not found",
          }),
          { status: 404 }
        )
      );
    }

    // Step 1: Delete related support tickets (find by userUid in the userInfo field)
    await SupportModel.deleteMany({ userInfo: userUid });
    console.log(
      `All support tickets for user with UID ${userUid} have been deleted.`
    );

    // Step 2: Delete the user from the UserModel
    await UserModel.deleteOne({ userUid });
    console.log(`User with UID ${userUid} has been deleted.`);

    // Return success response
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message:
            "User and their support tickets have been deleted successfully",
        }),
        { status: 200 }
      )
    );
  } catch (error) {
    console.error("Failed to delete user and support tickets:", error);
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          error: "Failed to delete user and support tickets",
        }),
        { status: 500 }
      )
    );
  }
}

// github controller

export async function loginWithGithub(req: Request) {
  try {
    console.log("redirect URI :", process.env.GITHUB_REDIRECT_URI);
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.GITHUB_REDIRECT_URI as string;
    const scope = "user repo"; // Define the scope according to your needs
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    return addCorsHeaders(
      new Response(null, {
        status: 302,
        headers: {
          Location: url,
        },
      })
    );
  } catch (error) {
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to login with github" }), {
        status: 500,
      })
    );
  }
}

export async function handleGithubCallback(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return addCorsHeaders(
        new Response(
          JSON.stringify({ message: "Authorization code is missing" }),
          {
            status: 500,
          }
        )
      );
    }

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const redirectUri = process.env.GITHUB_REDIRECT_URI;

    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", // Ensure the body is JSON encoded
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        }),
      }
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Failed to exchange code for access token");
    }

    const data = await response.json();

    console.log("data :", data);

    const { access_token, refresh_token } = data;

    //  Fetch user details from GitHub using the access token
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data from GitHub");
    }

    const userData = await userResponse.json();

    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Login with github",
          data: JSON.stringify({
            access_token,
            refresh_token,
            user: userData,
          }),
        }),
        {
          status: 201,
        }
      )
    );
  } catch (error) {
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to login with github" }), {
        status: 500,
      })
    );
  }
}

export async function handleGithubRevoke(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    const response = await fetch(
      `https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/tokens/${token}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.GITHUB_CLIENT_ID +
              ":" +
              process.env.GITHUB_CLIENT_SECRET
          ).toString("base64")}`,
        },
      }
    );
    const data = await response.json();
    console.log("data :", data);
    return addCorsHeaders(
      new Response(
        JSON.stringify({ message: "Revoked github access token successfully" }),
        {
          status: 201,
        }
      )
    );
  } catch (error) {
    return addCorsHeaders(
      new Response(
        JSON.stringify({ message: "Failed to revoke token :", error: error }),
        {
          status: 500,
        }
      )
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

export async function getRepoContents(req: Request) {
  try {
    const data = await req.json();
    const { owner, repo } = data;
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/`,
      {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   Accept: "application/vnd.github.v3.raw", // To get the raw content
        // },
      }
    );
    const _data = await response.json();
    console.log("data :", _data);
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
      new Response(JSON.stringify({ error }), {
        status: 500,
      })
    );
  }
}

export async function getFrameworkInfo(req: Request) {
  try {
    const data = await req.json();
    const { owner, repo, path } = data;
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
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
