import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

// Create the Context
export const AuthContext = createContext<Auth.AuthContextType | undefined>(undefined);

// Define the initial authState
const initialState: Auth.AuthState = {
  isAuthenticated: false,
  user: null,
};

// Reducer function
const authReducer = (authState: Auth.AuthState, action: Auth.AuthAction): Auth.AuthState => {
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


export { AuthProvider };
