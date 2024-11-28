import * as mongoose from "mongoose";

/**
 * Mongoose schema for a User.
 * This schema defines the structure of the user document in the database,
 * including fields related to authentication, profile, GitHub integration,
 * user roles, and premium status.
 */
const userSchema = new mongoose.Schema({
  userUid: { type: String, required: true },
  email: { type: String, required: false, unique: true },
  provider: { type: [], required: true }, // e.g., 'google' or 'github'
  created_at: {
    type: Date,
    default: Date.now,
  },
  githubUrl: { type: String },
  accessToken: { type: String },
  github_accessToken: { type: String },
  github_refreshToken: { type: String },
  githubUser: { type: Object }, // Store GitHub user data
  githubUserFetchedAt: { type: Date }, // Timestamp of the last fetch
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: false,
  },
  premium: {
    type: Boolean,
    default: false,
    required: false,
  },
});

// userSchema.index(
//   {
//     userUid: 1,
//   },
//   {
//     unique: true,
//   }
// );

export type User = mongoose.InferSchemaType<typeof userSchema>;
const UserModel = mongoose.model("User", userSchema);
export { UserModel };
