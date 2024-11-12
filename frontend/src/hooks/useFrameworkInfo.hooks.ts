import { getRepoContents } from "@/services/github.services";
import { useEffect, useState } from "react";

export const useFetchFrameworkInfo = (
  owner: string | null,
  projectName: string
) => {
  const [frameworkInfo, setFrameworkInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFrameworkInfo = async () => {
      if (owner && projectName) {
        setLoading(true);
        setError(null);
        try {
          const data = await getRepoContents(owner, projectName);
          console.log("data :", data);
          if (data?.data) {
            setFrameworkInfo(data?.data);
          }
        } catch (err) {
          setError((err as Error).message || "An error occured");
        } finally {
          setLoading(false);
        }
      } else {
        setFrameworkInfo(null);
        setLoading(false);
      }
    };

    fetchFrameworkInfo();
  }, [owner, projectName]);

  return { frameworkInfo, loading, error };
};
