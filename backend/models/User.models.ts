import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userUid: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  provider: { type: String, required: true }, // e.g., 'google' or 'github'
  created_at: {
    type: Date,
    default: Date.now,
  },
  githubUrl: { type: String },
});

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const UserModel = mongoose.model("User", userSchema);
