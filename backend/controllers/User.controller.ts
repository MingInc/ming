import { addCorsHeaders } from "../helpers/CorsHeader";
import { Boilerplate } from "../models/Boilerplate.Schema";
import { UserModel } from "../models/User.models";

// Create a new Boilerplate
export async function createBoilerplate(req: any) {
  try {
    const data = await req.json();
    const boilerplate = new Boilerplate(data);
    await boilerplate.save();
    return addCorsHeaders(
      new Response(JSON.stringify(boilerplate), { status: 201 })
    );
  } catch (error) {
    console.error("Failed to create boilerplate:", error);
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to create boilerplate" }), {
        status: 500,
      })
    );
  }
}

// create a new user
export async function createUser(req: Request) {
  try {
    const data = await req.json();
    const user = new UserModel(data);
    await user.save();
    return addCorsHeaders(new Response(JSON.stringify(user), { status: 201 }));
  } catch (error) {
    console.error("Failed to create user:", error);
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to create user" }), {
        status: 500,
      })
    );
  }
}
