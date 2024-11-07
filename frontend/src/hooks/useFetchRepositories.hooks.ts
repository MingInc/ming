import { fetchRepositories } from "@/services/github.services";
import { useEffect, useState } from "react";

export const useRepositories = (token: string) => {
  const [repos, setRepos] = useState<[] | Component.Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify type for error

  useEffect(() => {
    const fetchRepos = async () => {
      if (token) {
        setLoading(true);
        try {
          const data = await fetchRepositories(token);
          setRepos(data);
        } catch (err) {
          const errorMessage = (err as Error).message || "An error occurred";
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRepos();
  }, [token]);

  return { repos, loading, error };
};

