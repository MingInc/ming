import React, { createContext, useReducer, useContext, ReactNode } from "react";

interface AuthState {
  isAuthenticated: boolean;
  user: null;
}

interface AuthContextType {
  authState: AuthState;
  login: (user: any) => void;
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
