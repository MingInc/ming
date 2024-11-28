 import {
  firebaseConfig,
} from "@/firebase.config";
import "firebase/auth"
import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks";

export function Login() {
  const [_, setAuth] = useState<any>();
  const {  authState , login } = useAuth();
  const navigate = useNavigate();
  // const [__, setAccessToken] = useState<string | null>(null); 

  useEffect(() => {
    const _user = JSON.parse(
      localStorage.getItem("ming_authenticated_user") || "{}"
    );
    console.log("user ", _user)

    // if (_user) return navigate("/dashboard");

    const app = initializeApp(firebaseConfig);
    const authInstance = getAuth(app);
    setAuth(authInstance);
  }, [navigate]);

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [authState.isAuthenticated, navigate]);

  const handleGithubSign = async () => {
    const response = await fetch(`http://localhost:3000/check-github-session`, {
      credentials: "include",
    });
  
    if (response.ok) {
      const { user , githubUser } = await response.json();
      console.log(" user from checked session : ", user)

      console.log("github user access token:",user?.github_accessToken)
      console.log("github user :",githubUser)
      // setAccessToken(user?.github_accessToken)
      
      localStorage.setItem("ming_authenticated_user", JSON.stringify(githubUser)); 
      login(githubUser);
      navigate("/dashboard");
    } else {
      redirectToGithubAuth();
    }
  };
  
  // Redirect to GitHub OAuth URL for authentication
  const redirectToGithubAuth = () => {
    const clientId = import.meta.env.VITE_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URL;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  
    window.location.href = githubAuthUrl;
  };

  return (
    <div className="mx-auto text-center flex flex-col gap-2">
      <h1 className="text-xl font-medium mt-4">Login to Ming.</h1>
      <div className="flex flex-col gap-2 items-center">
        {/* <button
          className=" rounded-sm bg-black text-white text-sm py-2 px-4 w-[80vw] md:w-[30vw]"
          onClick={() => handleGoogleSignin()}
        >
          Continue with Google
        </button> */}
        <button
          className=" rounded-sm bg-black text-white text-sm py-2 px-4 w-[80vw] md:w-[30vw]"
          onClick={() => handleGithubSign()}
        >
          <i className="ri-github-fill"></i> Sign in with Github
        </button>
      </div>
    </div>
  );
}
