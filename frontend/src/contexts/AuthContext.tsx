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

// Initializer function to read from localStorage and return initial state
const init = (): Auth.AuthState => {
  const savedUser = localStorage.getItem('ming_authenticated_user');
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      return { isAuthenticated: true, user };
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
      return initialState;
    }
  }
  return initialState;
};

// Create the Context Provider component
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState,init);

  const login = (user: any) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    localStorage.removeItem("ming_authenticated_user");
    dispatch({ type: "LOGOUT" });
  };

  const linkAccount = (user: any) => {
    dispatch({ type: "LOGIN", payload: user }); // Update to reflect the linked account
  };

  useEffect(() => {
    const _user: any = JSON.parse(
      localStorage.getItem("ming_authenticated_user") || "{}"
    );

    console.log("authenticated user :", _user)

    if (_user) {
      dispatch({ type: "LOGIN", payload: _user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout, linkAccount }}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthProvider };
