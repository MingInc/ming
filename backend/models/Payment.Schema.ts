import mongoose from "mongoose";

// Define the schema for the Payment model
const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      // ref: "User",
      required: true,
    },
    stripePaymentId: {
      type: String,
      required: true,
      unique: true, // Ensure each payment has a unique Stripe payment ID
    },
    amount: {
      type: Number,
      required: true, // The amount paid in the smallest currency unit (e.g., cents)
    },
    currency: {
      type: String,
      required: true, // Currency code (e.g., 'usd', 'eur')
    },
    status: {
      type: String,
      enum: ["succeeded", "pending", "failed", "canceled"],
      default: "pending", // Default status while processing
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true, // E.g., 'credit_card', 'paypal', etc.
    },
    description: {
      type: String, // Optional: A short description for the payment (e.g., plan name)
      default: "Payment for subscription",
    },
    // planId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Plan", // Link to the plan model (if you're associating payments with plans)
    //   required: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set the update date
    },
  },
  { timestamps: true } // This will automatically add `createdAt` and `updatedAt` fields
);

export type Payment = mongoose.InferSchemaType<typeof Payment>;
const Payment = mongoose.model("Payment", paymentSchema);
export { Payment };
