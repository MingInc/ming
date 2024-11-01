// eslint-disable-next-line no-use-before-define
import { useAuth } from "@/contexts/AuthContext";
import { useRepoContext } from "@/contexts/RepoContext";
import {
  fetchRepositories,
  firebaseConfig,
} from "@/firebase.config";
// import firebase from "firebase/app"
import "firebase/auth"
import { encryptData } from "@/lib/utils";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
githubProvider.addScope("repo");

export default function Login() {
  const [auth, setAuth] = useState<any>();
  const { login, authState } = useAuth();
  const navigate = useNavigate();
  const { setRepos } = useRepoContext();
  // const providers = useAuthProvider()
  // const allowedProviders = ["google.com", "github.com"];

  // const isGoogleLinked = providers?.some(provider => allowedProviders.includes(provider));
  // const isGithubLinked = providers?.some(provider => allowedProviders.includes(provider));

  useEffect(() => {
    const _user = JSON.parse(
      localStorage.getItem("ming_authenticated_user") || "{}"
    );

    if (_user.email) return navigate("/dashboard");

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

    try {
      const result = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      const repos = await fetchRepositories(token!);
      setRepos(repos);
      const encryptedRepoData = encryptData(JSON.stringify(repos));
      localStorage.setItem(
        "ming_github_user_repos",
        JSON.stringify(encryptedRepoData)
      );

      if (user.email) {
        login(user);
        localStorage.setItem("ming_authenticated_user", JSON.stringify(user));
        // navigate("/dashboard");
      }

      return token;
    } catch (error) {
      const errorCode = error?.code;
      const errorMessage = error?.message;
      console.log(errorMessage);

      if (errorCode === "auth/account-exists-with-different-credential") {
        const email = error?.customData?.email;
        console.log("email :", email);
        

        // Fetch the sign-in methods for the email
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);

        console.log(`Sign-in methods for ${email}:`, signInMethods);

        // Inform the user about the existing providers
        if (signInMethods.length > 0) {
          alert(`This email is linked with: ${signInMethods.join(", ")}`);
        } else {
          alert("No sign-in methods found for this email.");
        }
      } else {
        console.log(errorMessage);
      }
    }
  };

  // const handleGoogleSignin = async () => {
  //     const result = await signInWithGoogle();
  //     const user = result?.user;
  //     console.log("result :", result);
  //     if (user) {
  //       const linkedProviders = user.providerData.map(
  //         (provider) => provider.providerId
  //       );
  //       console.log(linkedProviders);
  //       if (linkedProviders.includes("github.com")) {
  //         const response = await fetch("http://localhost:3000/api/v1/user/accessToken",{
  //           method:"POST",
  //           body:JSON.stringify({
  //             id: user.uid
  //           })
  //         })
  //         const data = await response.json()
  //         console.log("response data :", data)
  //         console.log("access token :", data.github_accessToken)
  //         const accessToken = data.github_accessToken
  //         if (accessToken) {
  //           const repos = await fetchRepositories(accessToken);
  //           const encryptedRepoData = encryptData(JSON.stringify(repos));
  //           localStorage.setItem("ming_github_user_repos", JSON.stringify(encryptedRepoData));
  //           navigate("/dashboard");
  //         }
  //       }
  //       if (user.email) {
  //         login(user);
  //         localStorage.setItem("ming_authenticated_user", JSON.stringify(user));
  //         navigate("/dashboard");
  //       }
  //     }
  // };

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
          Continue with Github
        </button>
      </div>
    </div>
  );
}
