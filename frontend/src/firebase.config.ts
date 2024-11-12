// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
const db = getFirestore(app);

githubProvider.addScope("repo");
githubProvider.addScope("user:email");
// const messaging = getMessaging();

// const analytics = getAnalytics(app);

// getToken(messaging, {
//   vapidKey:
//     "BI3zLcLPEC3HNVBo5i7qELHOm3TL9L0Uw8s5x6MqtjXve-dsmQrYgzefNEGvqCO84Fomh43IpIS9Mgwvc_hUHlI",
// });

//
export async function saveAccessToken(userId: string, accessToken: string) {
  await setDoc(
    doc(db, "users", userId),
    {
      githubAccessToken: accessToken,
    },
    {
      merge: true,
    }
  );
}

export const fetchFrameworkInfo = async (
  owner: string,
  repo: string,
  accessToken: string
) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/content`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    return credential?.accessToken; // Get the GitHub access token
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result; // Return result
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Link GitHub to Google Account
export const linkGithubToGoogle = async (): Promise<UserCredential> => {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  return await linkWithPopup(auth.currentUser!, provider);
};

export const redirectToGithubAuth = () => {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${
    import.meta.env.VITE_PUBLIC_GITHUB_CLIENT_ID
  }&redirect_uri=${import.meta.env.VITE_GITHUB_REDIRECT_URL}&scope=${"repo"}`;
  window.location.href = authUrl;
};

export const saveUserData = async (user: any, accessToken: string) => {
  const userData = {
    userUid: user.uid,
    email: user.email,
    provider: ["github"],
    accessToken: user?.accessToken,
    github_accessToken: accessToken,
  };
  const response = await fetch(`http://localhost:3000/api/v1/user`, {
    method: "POST",
    body: JSON.stringify(userData),
  });

  // Check if response is okay
  if (!response.ok) {
    const errorData = await response.json(); // Fetch the error data
    console.log("error Data :", errorData);
    throw new Error(errorData || "Failed to save user data"); // Use a custom error message
  }
  const data = await response.json();
  const userWithPremium = {
    ...data,
    premium: data.premium || false, // Assuming `premium` flag is included in the response
  };

  localStorage.setItem(
    "ming_authenticated_user",
    JSON.stringify(userWithPremium)
  );

  return data;
};
