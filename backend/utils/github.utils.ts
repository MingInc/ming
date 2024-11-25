import { addCorsHeaders } from "../helpers/CorsHeader";

export async function verifyGithubToken(accessToken: string) {
  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      // If we get a 401 Unauthorized, it means the token is expired or invalid
      return true; // The token is expired
    }

    return false; // The token is valid
  } catch (error) {
    console.error("Error verifying GitHub token:", error);
    return true; // If there's an error (e.g., network), consider it expired
  }
}

export async function getNewTokensFromGithub(refreshToken: string) {
    try {
      const response = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: process.env.GITHUB_CLIENT_ID as string,
            client_secret: process.env.GITHUB_CLIENT_SECRET as string,
            refresh_token: refreshToken,
            grant_type: "refresh_token",
          }).toString(),
        }
      );
  
      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text(); // Read response as text
        console.error("Error refreshing token:", errorText);
        throw new Error(`Failed to refresh token: ${errorText}`);
      }
  
      const data = await response.text();
      const urlParams = new URLSearchParams(data);
  
      const errorCode = urlParams.get("error");
  
      if (errorCode === "bad_refresh_token") {
        // Refresh token is invalid or expired
        throw new Error(
          "The refresh token is invalid or expired. Please re-authenticate."
        );
      }
  
      const newAccessToken = urlParams.get("access_token");
      const newRefreshToken = urlParams.get("refresh_token");
      const tokenType = urlParams.get("token_type");
      const scope = urlParams.get("scope");
  
      // Return the new tokens in an object
      return {
        newAccessToken,
        newRefreshToken,
        tokenType,
        scope,
      };
    } catch (error) {
      console.error("Error refreshing GitHub tokens:", error);
      throw new Error("Failed to refresh GitHub tokens");
    }
  }
  
