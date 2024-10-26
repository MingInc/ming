// eslint-disable-next-line no-use-before-define
import { useAuth } from "@/contexts/AuthContext";
import { firebaseConfig } from "@/firebase.config";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup , GithubAuthProvider , fetchSignInMethodsForEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider()
githubProvider.addScope("repo")

export default function Login() {
  const [auth, setAuth] = useState<any>();
  const { login } = useAuth();
  const navigate = useNavigate();
  // signInWithRedirect(auth,githubProvider)

  useEffect(() => {
    const _user = JSON.parse(
      localStorage.getItem("ming_authenticated_user") || "{}"
    );

    if (_user.email) return navigate("/dashboard");

    
    const app = initializeApp(firebaseConfig);
    const authInstance = getAuth(app);
    setAuth(authInstance);
  }, []);

  const handleGoogleSignin = () => {
    if (!auth) return;


    signInWithPopup(auth, provider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        if (user.email) {
          //   toast("You signed up successfully!", {
          //     description: `Welcome to Ming, ${user.email?.split("@")[0]}.`,
          //   });
          login(user);
          localStorage.setItem("ming_authenticated_user", JSON.stringify(user));
          const userData = {
            userUid: user.uid,
            email: user.email,
            provider: 'google'
          }
          const response = await fetch('http://localhost:3000/api/v1/user',{
            method:"POST",
            body: JSON.stringify(userData),
          })
          console.log(response)
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
      });
  };

  const handleGithubSign = async () => {
    if (!auth) return;
  
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
  
      if (user.email) {
        login(user);
        localStorage.setItem("ming_authenticated_user", JSON.stringify(user));
        navigate("/dashboard");
      }
  
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
  
      if (errorCode === 'auth/account-exists-with-different-credential') {
        const email = error.customData.email;
        console.log("email :",email)
        
        // Fetch the sign-in methods for the email
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        
        console.log(`Sign-in methods for ${email}:`, signInMethods);
        
        // Inform the user about the existing providers
        if (signInMethods.length > 0) {
          alert(`This email is linked with: ${signInMethods.join(', ')}`);
        } else {
          alert('No sign-in methods found for this email.');
        }
      }else{
        console.log(errorMessage)
      }
    }
  }

  return (
    <div className="mx-auto text-center flex flex-col gap-2">
      <h1 className="text-xl font-medium mt-4">Login to Ming.</h1>
      <div className="flex flex-col gap-2 items-center">
      <button
        className=" rounded-sm bg-black text-white text-sm py-2 px-4 w-[80vw] md:w-[30vw]"
        onClick={() => handleGoogleSignin()}
      >
        Continue with Google
      </button>
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
