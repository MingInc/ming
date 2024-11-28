import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

/**
 * Custom React hook that provides access to the authentication context.
 * It retrieves the current value of the `AuthContext` and throws an error
 * if the hook is used outside of the `AuthProvider`.
 *
 * @throws {Error} If the hook is used outside of an `AuthProvider`, an error will be thrown.
 * @returns {Auth.AuthContextType} The authentication context value, which typically includes user data,
 * authentication methods, etc.
 */
export const useAuth = (): Auth.AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
