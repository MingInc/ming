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
import { useAuth, useFetchUserData } from "@/hooks";

export function Login() {
  const [auth, setAuth] = useState<any>();
  const {  authState , login } = useAuth();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null); 
  const { user : githubUser, loading, error  } = useFetchUserData(accessToken!)

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
    if (!auth) return;  
    const sessionToken = localStorage.getItem('ming_session_token'); 
  
    if(!sessionToken){
      redirectToGithubAuth()
    }
    try {
      // Send a request to the backend to check if the user exists in the database (session-based)
      const response = await fetch(`http://localhost:3000/check-github-session`,{
        headers:{
          'Authorization': `Bearer ${sessionToken}`,
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.userExists) {
          setAccessToken(data?.user?.github_accessToken)
        } else {
          // User does not exist, initiate GitHub authentication
          redirectToGithubAuth();
        }
      } else {
        // If the response isn't ok (e.g., 401 Unauthorized), redirect to GitHub for login
        redirectToGithubAuth();
      }
    } catch (error) {
      console.error('Error checking GitHub session:', error);
      // If there's an error, redirect to GitHub for authentication
      redirectToGithubAuth();
    }
  };

  useEffect(() => {
    if(githubUser && !loading && !error){
      localStorage.setItem("ming_authenticated_user", JSON.stringify(githubUser)); // Store basic user info
      login(githubUser)
      navigate("/dashboard");
    }
  },[error, githubUser, loading, login, navigate])
  
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
