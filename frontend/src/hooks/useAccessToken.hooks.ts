import { getAccessToken } from "@/services/github.services";
import { useEffect, useState } from "react";

export const useAccessToken = (userId: string) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (userId) {
        const data = await getAccessToken(userId);
        setToken(data);
      }
    };

    fetchToken();
  }, [userId]);

  return token;
};
