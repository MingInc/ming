import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function GithubCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleGithubCallback() {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");

      if (code) {
        try {
          // Make a request to your backend to exchange the code for an access token
          const response = await fetch(
            `http://localhost:3000/github/callback?code=${code}`
          );
          const data = await response.json();

          // console.log(" data from github callback api :", data)

          if (response.ok) {
            const parsedData = JSON.parse(data.data);
            const user = parsedData.user;

            if (user) {
              login(user);

              // Store session and user data in local/session storage
              localStorage.setItem("ming_session_token", parsedData["_data"].sessionToken);
              localStorage.setItem("ming_authenticated_user", JSON.stringify(user));

              // Redirect to dashboard
              navigate("/dashboard");
              return; // Early return after successful login
            }
          } else {
            throw new Error(data.error || "Failed to authenticate.");
          }
        } catch (error) {
          // Log error and show appropriate error message
          console.error("GitHub callback error:", (error as Error).message);
          setError("Error while exchanging the code for an access token.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("Authorization code is missing.");
        setLoading(false);
      }
    }

    handleGithubCallback();
  }, [location, login, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return <div>Redirecting...</div>;
}
