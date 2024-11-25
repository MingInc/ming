import { useToast } from "@/components/ui";
import { fetchRepositories } from "@/services/github.services";
import { useEffect, useState } from "react";

export const useRepositories = (userId: string) => {
  const [repos, setRepos] = useState<[] | Component.Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify type for error
  // const { notify } = useNotification();  // Using a notification hook to alert user
  const { toast } = useToast();
  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        // Call fetchRepositories only if userId exists
        if (userId) {
          const data = await fetchRepositories(userId);
          setRepos(data);
        } else {
          throw new Error("User ID is required.");
        }
      } catch (err) {
        const errorMessage = (err as Error).message || "An error occurred";
        setError(errorMessage);

        // If the error message indicates user logout (due to refresh token issue), notify user
        if (
          errorMessage ===
          "The refresh token is invalid or expired. Please re-authenticate."
        ) {
          toast({
            title: "Your session has expired",
            description: "Please log in again.",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [toast, userId]); // Include `notify` in dependency array to avoid stale closure

  return { repos, loading, error };
};
