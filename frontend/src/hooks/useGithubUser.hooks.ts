import { getUserData } from "@/services/github.services";
import { useEffect, useState } from "react";

export const useFetchUserData = (token: string) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getUserData(token);
          setUser(data);
        } catch (err) {
          setError((err as Error).message || "An error occured");
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  return { user, loading, error };
};
