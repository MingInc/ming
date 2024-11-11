import mongoose from "mongoose";

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
