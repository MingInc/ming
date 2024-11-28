import { useState, useEffect } from "react";

interface useUserResult {
  user: Component.User | null;
  loading: boolean;
  error: string | null;
}
/**
 * Custom hook to fetch a user by their userId.
 *
 * This hook fetches a user from the API using the provided `userId` and manages the loading and error states.
 * It returns the user data, loading state, and any errors encountered during the fetch operation.
 *
 * @param {string} userId - The ID of the user to fetch from the API.
 * @returns {useUserResult} - The hook returns an object with three properties:
 *   - `user` (Component.User[]): The user data fetched from the API (empty array if not fetched or no user).
 *   - `loading` (boolean): A state indicating if the fetch operation is in progress.
 *   - `error` (string | null): An error message if the fetch operation fails, null otherwise.
 *
 * @example
 * const { user, loading, error } = useUser('1234');
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage message={error} />;
 * return <UserProfile user={user} />;
 */
export const useUser = (userId: string): useUserResult => {
  const [user, setUser] = useState<Component.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `http://localhost:3000/api/v1/user?id=${userId}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data: Component.User = await response.json();
        if (data) {
          setUser(data);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};
