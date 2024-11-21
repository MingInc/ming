import jwt from "jsonwebtoken";
import { COOKIE_NAME, JWT_SECRET } from "../constants";
// import { UserModel } from "../models";
// import { addCorsHeaders } from "../helpers/CorsHeader";
import { SessionModel } from "../models/sessions.models";

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

export async function validateSession(req: Request) {
  console.log("cookie headers :", req.headers);
  const cookies = req.headers.get("cookie");
  const sessionId = cookies?.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))?.[1];

  console.log("session Id :", sessionId);

  if (!sessionId) {
    return null; // No session found
  }

  const session = await SessionModel.findOne({
    sessionId,
    expiresAt: { $gte: new Date() },
  });

  return session ? session.userUid : null;
}
