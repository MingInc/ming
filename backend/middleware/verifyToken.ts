import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Your JWT secret

// Middleware to verify JWT and get userId
export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId; // Return the userId from the decoded JWT payload
  } catch (err) {
    console.error("Token verification failed:", err);
    return null; // Return null if the token is invalid or expired
  }
};
