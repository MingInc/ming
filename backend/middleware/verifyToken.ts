import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

// Middleware to verify JWT and get userId
export const verifyToken = (token: string): string | null => {
  if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined!");
    return null; 
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && typeof decoded === "object" && "userId" in decoded) {
      return (decoded as { userId: string }).userId;
    }
    return null;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
};
