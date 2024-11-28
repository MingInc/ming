import mongoose from "mongoose";

/**
 * Mongoose schema for a user session.
 * This schema defines the structure of a session document in the database,
 * including the session ID, associated user, expiration time, and device/browser information.
 */
const SessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userUid: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  deviceInfo: { type: String }, // Optional: store device/browser info
});

export type Session = mongoose.InferSchemaType<typeof SessionSchema>;
const SessionModel = mongoose.model("Session", SessionSchema);
export { SessionModel };
