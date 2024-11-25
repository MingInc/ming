export async function getAccessToken(userId: string) {
  const response = await fetch(
    `http://localhost:3000/api/v1/user/accessToken?id=${userId}`
  );
  const data = await response.json();
  return data?.github_accessToken;
}

export const fetchRepositories = async (userId: string) => {
  // Call the backend to fetch repositories
  const response = await fetch(
    `http://localhost:3000/api/v1/user/repos?id=${userId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    // If the response is 401 and contains a specific message, clear local storage and redirect
    if (response.status === 401) {
      const errorData = await response.json();
      if (
        errorData.message ===
        "The refresh token is invalid or expired. Please re-authenticate."
      ) {
        // Clear local storage to remove any saved authentication data
        localStorage.clear();

        // Throw a custom error message to indicate that the user has been logged out
        throw new Error(
          "The refresh token is invalid or expired. Please re-authenticate."
        );
      }
    }

    console.error("Failed to fetch repositories:", response.statusText);
    throw new Error(`Failed to fetch repositories: ${response.statusText}`);
  }

  // If the request is successful, return the repositories
  const repos = await response.json();
  console.log("Repositories fetched:", repos);

  // Filter repositories to include only those with JavaScript as the primary language
  const jsRepos = repos.filter(
    (repo: Component.Repo) => repo.language === "JavaScript"
  );

  return jsRepos;
};

export async function getUserData(token: string) {
  const response = await fetch("http://localhost:3000/api/v1/getUserData", {
    method: "POST",
    body: JSON.stringify({
      accessToken: token,
    }),
  });
  const data = await response.json();
  console.log("github data :", data);
  return data?.user;
}

export async function getRepoContents(owner: string | null, repo: string) {
  const response = await fetch(
    `http://localhost:3000/api/v1/user/getRepoContents`,
    {
      method: "POST",
      body: JSON.stringify({
        owner,
        repo,
      }),
    }
  );
  return await response.json();
}

export async function getFrameworkInfo(
  owner: string | null,
  repo: string,
  path: string
) {
  const response = await fetch(
    `http://localhost:3000/api/v1/repo/getFrameworkInfo`,
    {
      method: "POST",
      body: JSON.stringify({
        owner,
        repo,
        path,
      }),
    }
  );
  return await response.json();
}

// export const refreshGitHubToken = async (refreshToken: string) => {
//   try {
//     const response = await fetch(
//       "https://github.com/login/oauth/access_token",
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           client_id: process.env.GITHUB_CLIENT_ID,
//           client_secret: process.env.GITHUB_CLIENT_SECRET,
//           refresh_token: refreshToken,
//           grant_type: "refresh_token",
//         }),
//       }
//     );
//     const data = await response.json();
//     const { access_token } = data;
//     localStorage.setItem("githubAccessToken", access_token);
//     return access_token;
//   } catch (error) {
//     console.error("Error refreshing GitHub token:", error);
//     throw error;
//   }
// };

export const revokeGitHubToken = async (token: string) => {
  try {
    await fetch(`http://localhost:3000/github/revoke?token=${token}`);
    localStorage.removeItem("githubAccessToken");
    localStorage.removeItem("githubRefreshToken");
    alert("Token revoked successfully");
  } catch (error) {
    console.error("Error revoking GitHub token:", error);
  }
};
