 import {
  firebaseConfig,
  // githubProvider,
  // saveUserData,
} from "@/firebase.config";
// import firebase from "firebase/app"
import "firebase/auth"
import { initializeApp } from "firebase/app";
import {
  getAuth,
  // signInWithPopup,
  // GithubAuthProvider,
  // fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks";

export function Login() {
  const [auth, setAuth] = useState<any>();
  const { login, authState } = useAuth();
  const navigate = useNavigate();
  // const providers = useAuthProvider()
  // const allowedProviders = ["google.com", "github.com"];

  // const isGoogleLinked = providers?.some(provider => allowedProviders.includes(provider));
  // const isGithubLinked = providers?.some(provider => allowedProviders.includes(provider));

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

    const clientId = import.meta.env.VITE_PUBLIC_GITHUB_CLIENT_ID
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URL

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

    window.location.href = githubAuthUrl
    // window.location.href = "http://localhost:3000/github/login"
    // window.location.href = `https://github.com/login/oauth/authorize?client_id=Iv23liS10VfRc85UWSq8&redirect_uri=http://localhost:5173&scope=user:email`

    // try {
    //   const result = await signInWithPopup(auth, githubProvider);
    //   const credential = GithubAuthProvider.credentialFromResult(result);
    //   const token = credential?.accessToken;
    //   const user = result.user;
    //   console.log("github user :",user)
    //   await saveUserData(user,token!)
    //   if (user) {
    //     login(user);
    //     localStorage.setItem("ming_authenticated_user", JSON.stringify(user));
    //     navigate("/dashboard");
    //   }

    //   return token;
    // } catch (error) {
    //   if(error instanceof FirebaseError){
    //     const errorCode = error?.code;
    //     const errorMessage = error?.message;
    //     console.log(errorMessage);
    //     if (errorCode === "auth/account-exists-with-different-credential") {
    //       const email : string = error?.customData?.email as string;
    //       console.log("email :", email);
          
  
    //       // Fetch the sign-in methods for the email
    //       const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  
    //       console.log(`Sign-in methods for ${email}:`, signInMethods);
  
    //       // Inform the user about the existing providers
    //       if (signInMethods.length > 0) {
    //         alert(`This email is linked with: ${signInMethods.join(", ")}`);
    //       } else {
    //         alert("No sign-in methods found for this email.");
    //       }
    //     } else {
    //       console.log(errorMessage);
    //     }
    //   }

    // }
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
          <i className="ri-github-fill"></i> Sign in with Github
        </button>
      </div>
    </div>
  );
}
