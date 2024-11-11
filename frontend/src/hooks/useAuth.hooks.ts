import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

// Custom hook to use the AuthContext
export const useAuth = (): Auth.AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
