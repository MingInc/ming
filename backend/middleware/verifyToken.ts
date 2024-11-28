import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";
import { SessionModel } from "../models/sessions.models";
import cookie from "cookie";

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

/**
 * Validates the session based on the session ID stored in the request cookies.
 *
 * This function extracts the session ID from the request cookies, checks if it exists, and then verifies the session's
 * validity by looking it up in the `SessionModel` based on the session ID and the session's expiration date. If a valid
 * session is found, the function returns the associated user UID. If no session is found or if the session has expired,
 * it returns `null`.
 *
 * @param {Request} req - The HTTP request object containing the session ID in the cookies.
 * @returns {Promise<string | null>} A Promise that resolves to the user UID if the session is valid, or `null` if the session is invalid or expired.
 */
export async function validateSession(req: Request): Promise<string | null> {
  const cookies = cookie.parse(req.headers.get("cookie") || "");

  const sessionId = cookies.ming_sessionId;

  if (!sessionId) {
    return null; // No session found
  }

  const session = await SessionModel.findOne({
    sessionId,
    expiresAt: { $gte: new Date() },
  });
  if (new Date() > new Date(session?.expiresAt as Date)) {
    return "Session Expired";
  }

  return session ? session.userUid : null;
}
