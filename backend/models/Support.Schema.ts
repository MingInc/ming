import mongoose from "mongoose";

/**
 * Mongoose schema for a support ticket.
 * This schema defines the structure of the support ticket document in the database,
 * including details about the ticket, user information, status, assignment, and any associated image.
 */
const supportSchema = new mongoose.Schema(
  {
    ticketInfo: {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
    userInfo: {
      type: String,
      ref: "User", // Referencing the User model
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed", "assigned"],
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// // Prepopulate the reference using `userUid`
// supportSchema.pre("find", function () {
//   this.populate({ path: "userInfo", match: { userUid: this.userInfo } });
// });

export type Support = mongoose.InferSchemaType<typeof supportSchema>;
export const SupportModel = mongoose.model("Support", supportSchema);
