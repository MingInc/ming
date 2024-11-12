import { UserModel } from "../models/User.models";

export async function validateUser(req: Request): Promise<Response | null> {
  try {
    const data = await req.json();

    // Check if a user with the provided email or userUid already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email: data.email }, { userUid: data.userUid }],
    });

    if (existingUser) {
      // Return a 409 Conflict response if the user already exists
      new Response(JSON.stringify({ message: "User already exists" }), {
        status: 201,
      });
    }

    // Return null if validation passes (no user found)
    return null;
  } catch (error) {
    console.error("Validation error:", error);
    return new Response(
      JSON.stringify({ error: "Validation error occurred" }),
      {
        status: 500,
      }
    );
  }
}
