export async function getAccessToken(userId: string) {
  const response = await fetch(
    "http://localhost:3000/api/v1/user/accessToken",
    {
      method: "POST",
      body: JSON.stringify({
        id: userId,
      }),
    }
  );
  const data = await response.json();
  return data?.github_accessToken;
}

export const fetchRepositories = async (token: string | null) => {
  const response = await fetch(
    "https://api.github.com/user/repos?affiliation=owner&sort=created&direction=desc",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const repos = await response.json();
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
