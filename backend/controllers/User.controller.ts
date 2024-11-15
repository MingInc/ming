import admin from "firebase-admin";
import { addCorsHeaders } from "../helpers/CorsHeader";
import { getNewTokensFromGithub, sendWelcomeEmail } from "../utils";
import { SupportModel, UserModel } from "../models";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware";
import {
  clientId,
  clientSecret,
  COOKIE_NAME,
  JWT_SECRET,
  redirectUri,
} from "../constants";

// create a new user
export async function createUser(req: Request) {
  try {
    const data = await req.json();

    // Check if a user with the provided email or userUid already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email: data.email }, { userUid: data.userUid }],
    });

    if (existingUser) {
      return addCorsHeaders(
        new Response(
          JSON.stringify({
            error: "User already exists",
          })
        )
      );
    }

    // Create a new user since validation passed
    const newUser = new UserModel(data);
    await newUser.save();

    sendWelcomeEmail(newUser?.email!);

    const payload = {
      userId: newUser.userUid,
      email: newUser.email,
    };

    const sessionToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    return addCorsHeaders(
      new Response(JSON.stringify({ newUser, sessionToken }), {
        status: 201,
        headers: {
          "Set-Cookie": `${COOKIE_NAME}=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600; Path=/`,
        },
      })
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

    const _userData = {
      userUid: userData.id,
      email: userData.email,
      provider: ["github"],
      githubUrl: userData.html_url,
      github_accessToken: access_token,
      github_refreshToken: refresh_token,
    };


    const _response = await fetch(`http://localhost:3000/api/v1/user`, {
      method: "POST",
      body: JSON.stringify(_userData),
    });

    const _data = await _response.json();

    const { newUser, sessionToken  } = _data

    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Login with github and user saved to db",
          data: JSON.stringify({
            access_token,
            refresh_token,
            user: userData,
            _data: {
              newUser,
              sessionToken,
            },
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
    const _id = new URL(req.url).searchParams.get("id");

    if (!_id) {
      return addCorsHeaders(
        new Response(JSON.stringify({ message: "User ID not provided" }), {
          status: 400,
        })
      );
    }

    const user = await UserModel.findOne({ userUid: _id });

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

export async function refreshAccessToken(req: Request) {
  try {
    const _id = new URL(req.url).searchParams.get("id");

    if (!_id) {
      return addCorsHeaders(
        new Response(JSON.stringify({ message: "user id is missing" }), {
          status: 400,
        })
      );
    }

    const user = await UserModel.findOne({
      userUid: _id,
    });

    if (!user) {
      return addCorsHeaders(
        new Response(
          JSON.stringify({ message: "user not found with following id" }),
          {
            status: 400,
          }
        )
      );
    }

    const refreshToken = user.github_refreshToken;
    if (!refreshToken) {
      return addCorsHeaders(
        new Response(
          JSON.stringify({ message: "No GitHub refresh token available" }),
          {
            status: 400,
          }
        )
      );
    }

    const clientId = process.env.GITHUB_CLIENT_ID as string;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;

    // GitHub OAuth refresh token URL
    const refreshUrl = "https://github.com/login/oauth/access_token";

    // Make a POST request to GitHub's OAuth token endpoint to get a new access token
    const response = await fetch(refreshUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }).toString(),
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const data = await response.json();
    const { access_token, refresh_token: newRefreshToken } = data;

    if (newRefreshToken) {
      user.github_refreshToken = newRefreshToken;
      // user.github_accessToken = access_token
      await user.save();
    }

    // Return the new access token and refresh token to the frontend
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Access token refreshed successfully",
          data: {
            access_token,
            refresh_token: newRefreshToken, // Optional: GitHub may provide a new refresh token
          },
        }),
        { status: 200 }
      )
    );
  } catch (error) {
    return addCorsHeaders(
      new Response(
        JSON.stringify({ error: "Failed to refresh access token" }),
        {
          status: 500,
        }
      )
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

export async function getRepositories(req: Request) {
  try {
    const userId = new URL(req.url).searchParams.get("id");

    if (!userId) {
      return addCorsHeaders(
        new Response(JSON.stringify({ message: "User ID is required" }), {
          status: 400,
        })
      );
    }

    const user = await UserModel.findOne({ userUid: userId });

    if (!user) {
      return addCorsHeaders(
        new Response(JSON.stringify({ message: "User not found" }), {
          status: 404,
        })
      );
    }

    let accessToken = user.github_accessToken;

    if (!accessToken) {
      return addCorsHeaders(
        new Response(JSON.stringify({ message: "No access token found" }), {
          status: 400,
        })
      );
    }

    // Make an API call to GitHub to fetch repositories
    let response = await fetch(
      "https://api.github.com/user/repos?affiliation=owner&sort=created&direction=desc",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // If GitHub returns 401 (Unauthorized), try refreshing the token
    if (response.status === 401) {
      console.log("Access token expired, refreshing token...");

      const refreshToken = user.github_refreshToken;
      console.log("refresh token :", refreshToken);
      if (!refreshToken) {
        return addCorsHeaders(
          new Response(
            JSON.stringify({ message: "No GitHub refresh token available" }),
            { status: 400 }
          )
        );
      }

      // Refresh the token
      const { newAccessToken, newRefreshToken } = await getNewTokensFromGithub(
        user.github_refreshToken!
      );

      if (newAccessToken) {
        // Update user with new access and refresh tokens
        user.github_accessToken = newAccessToken;
        if (newRefreshToken) {
          user.github_refreshToken = newRefreshToken;
        }
        await user.save();

        // Retry the GitHub API request with the new access token
        response = await fetch(
          "https://api.github.com/user/repos?affiliation=owner&sort=created&direction=desc",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );
      } else {
        return addCorsHeaders(
          new Response(
            JSON.stringify({
              message: "Failed to refresh GitHub access token",
            }),
            { status: 500 }
          )
        );
      }
    }

    // If the response is still not OK, return an error
    if (!response.ok) {
      console.error("Failed to fetch repositories:", response.statusText);
      return new Response(
        JSON.stringify({ message: "Failed to fetch repositories from GitHub" }),
        { status: response.status }
      );
    }

    // Get the repository data from GitHub
    const repos = await response.json();

    // Return the repositories data
    return addCorsHeaders(new Response(JSON.stringify(repos), { status: 200 }));
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "An error occurred while fetching repositories",
        }),
        { status: 500 }
      )
    );
  }
}

// Endpoint to check if the user session is valid
export async function checkGithubSession(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Get the token from the header

    if (!token) {
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
      );
    }

    const userId = verifyToken(token);

    if (!userId) {
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "Invalid session" }), {
          status: 401,
        })
      );
    }

    // Check if the user exists in the database
    const user = await UserModel.findOne({
      userUid: userId,
    });

    if (!user) {
      return addCorsHeaders(
        new Response(JSON.stringify({ userExists: false }), { status: 404 })
      );
    }

    // If user exists, send the user data
    return addCorsHeaders(
      new Response(JSON.stringify({ userExists: true, user }), { status: 200 })
    );
  } catch (error) {
    console.error("Failed to check session:", error);
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to check session" }), {
        status: 500,
      })
    );
  }
}
