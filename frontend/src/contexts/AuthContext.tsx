import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebase.config";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (user: any) => void;
  logout: () => void;
  linkAccount: (user: any) => void
}

type AuthAction = { type: "LOGIN"; payload: any } | { type: "LOGOUT" };

// Create the Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the initial authState
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// Reducer function
const authReducer = (authState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return authState;
  }
};

// Create the Context Provider component
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = (user: any) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const linkAccount = (user: any) => {
    dispatch({ type: "LOGIN", payload: user }); // Update to reflect the linked account
  };

  useEffect(() => {
    const _user: any = JSON.parse(
      localStorage.getItem("ming_authenticated_user") || "{}"
    );

    if (_user.email) {
      dispatch({ type: "LOGIN", payload: _user });
    }

    // const app = initializeApp(firebaseConfig);
    // const authInstance = getAuth(app);

    // const unsubscribe = onAuthStateChanged(authInstance, (user) => {
    //   if (user) {
    //     dispatch({ type: "LOGIN", payload: user });
    //     localStorage.setItem("ming_authenticated_user", JSON.stringify(user));
    //   } else {
    //     dispatch({ type: "LOGOUT" });
    //     localStorage.removeItem("ming_authenticated_user")
    //   }
    // });

    // return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout, linkAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
