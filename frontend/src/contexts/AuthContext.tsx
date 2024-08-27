import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface User {
  accessToken: string;
  auth: any;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: any;
  phoneNumber: string | null;
  photoURL: string;
  proactiveRefresh: any;
  providerData: any[];
  providerId: string;
  reloadListener: any; // Define a more specific type if possible
  reloadUserInfo: any;
  stsTokenManager: any;
  tenantId: string | null;
  uid: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (user: User) => void;
  logout: () => void;
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

  useEffect(() => {
    const _user: any = JSON.parse(
      localStorage.getItem("ming_authenticated_user") || "{}"
    );

    console.log(_user);

    if (_user.email) {
      dispatch({ type: "LOGIN", payload: _user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
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
