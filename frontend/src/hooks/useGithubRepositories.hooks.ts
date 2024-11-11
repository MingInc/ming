import { useEffect, useState } from "react";

export const useGitHubRepos = (framework: string[]) => {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await Promise.all(
          framework.map(async (_framework) => {
            const resp = await fetch(
              `https://api.github.com/search/repositories?q=${_framework.toLowerCase()}+in:description+sort:stars`
            );
            return resp.json();
          })
        );
        const combinedRepos = await response.flatMap((data, index) =>
          (data.items?.slice(0, 3) || []).map((repo: Component.Repo) => ({
            ...repo,
            category: framework[index], // Assign the framework name as category
          }))
        );
        setRepos(combinedRepos);
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    fetchRepos();
  }, []);

  return { repos };
};
