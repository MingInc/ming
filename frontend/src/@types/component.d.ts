declare namespace Component {
  // Define the type for a GitHub repository
  interface Repo {
    id: number;
    name: string;
    html_url: string;
    default_branch: string;
    owner: {
      avatar_url: string;
      login: string;
    };
    updated_at: string;
    full_name: string;
    language: string;
  }

  // Define the types for the ticket structure
  export type Ticket = {
    _id: string; // This would correspond to the _id field in MongoDB (or ticket._id)
    ticketInfo: {
      title: string;
      description: string;
    };
    userInfo: string; // This could be a user ID, corresponding to `userInfo` in your schema
    status: "open" | "closed" | "assigned"; // Based on the enum in your schema
    assignedTo: string; // This would be the ID of the user the ticket is assigned to
    image: string; // URL or path to the image associated with the ticket
    createdAt?: string; // Corresponds to the `timestamps` feature in Mongoose
    updatedAt?: string; // Corresponds to the `timestamps` feature in Mongoose
  };

  export interface User {
    userUid: string;
    email?: string;
    provider: string[];
    created_at: Date;
    githubUrl?: string;
    accessToken?: string;
    github_accessToken?: string;
    role: "user" | "admin";
    premium: boolean;
  }

  // types/payment.ts
  export interface Payment {
    userId: string;
    stripePaymentId: string;
    amount: number;
    currency: string;
    status: "succeeded" | "pending" | "failed" | "canceled";
    paymentMethod: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }
}
