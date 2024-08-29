// eslint-disable-next-line no-use-before-define
import { useAuth } from "@/contexts/AuthContext";
import { firebaseConfig } from "@/firebase.config";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

export default function Login() {
  const [auth, setAuth] = useState<any>();
  const { login } = useAuth();
  const navigate = useNavigate();

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
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        if (user.email) {
          //   toast("You signed up successfully!", {
          //     description: `Welcome to Ming, ${user.email?.split("@")[0]}.`,
          //   });
          login(user);
          localStorage.setItem("ming_authenticated_user", JSON.stringify(user));
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

  return (
    <div className="mx-auto text-center">
      <h1 className="text-xl font-medium mt-4">Login to Ming.</h1>
      <button
        className="my-4 rounded-sm bg-black text-white text-sm py-2 px-4 w-[80vw] md:w-[30vw]"
        onClick={() => handleGoogleSignin()}
      >
        Continue with Google
      </button>
    </div>
  );
}
