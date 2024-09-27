import { addCorsHeaders } from "../helpers/CorsHeader";
import { Boilerplate } from "../models/Boilerplate.Schema"; 

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

// Retrieve all Boilerplates
export async function getAllBoilerplates(req: any) {
  try {
    const boilerplates = await Boilerplate.find();
    return addCorsHeaders(
      new Response(JSON.stringify(boilerplates), { status: 200 })
    );
  } catch (error) {
    console.error("Failed to retrieve boilerplates:", error);
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to retrieve boilerplates" }), {
        status: 500,
      })
    );
  }
}

// Get a single Boilerplate by ID
export async function getBoilerplateById(req: any) {
  const { id } = req.params;
  try {
    const boilerplate = await Boilerplate.findById(id);
    if (!boilerplate) {
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "Boilerplate not found" }), {
          status: 404,
        })
      );
    }
    return addCorsHeaders(
      new Response(JSON.stringify(boilerplate), { status: 200 })
    );
  } catch (error) {
    console.error("Failed to retrieve boilerplate:", error);
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to retrieve boilerplate" }), {
        status: 500,
      })
    );
  }
}

// Update a Boilerplate
export async function updateBoilerplate(req: any) {
  const { id } = req.params;
  const data = await req.json();
  try {
    const updatedBoilerplate = await Boilerplate.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedBoilerplate) {
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "Boilerplate not found" }), {
          status: 404,
        })
      );
    }
    return addCorsHeaders(
      new Response(JSON.stringify(updatedBoilerplate), { status: 200 })
    );
  } catch (error) {
    console.error("Failed to update boilerplate:", error);
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to update boilerplate" }), {
        status: 500,
      })
    );
  }
}

// Delete a Boilerplate
export async function deleteBoilerplate(req: any) {
  const { id } = req.params;
  try {
    const deletedBoilerplate = await Boilerplate.findByIdAndDelete(id);
    if (!deletedBoilerplate) {
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "Boilerplate not found" }), {
          status: 404,
        })
      );
    }
    return addCorsHeaders(
      new Response(JSON.stringify(deletedBoilerplate), { status: 200 })
    );
  } catch (error) {
    console.error("Failed to delete boilerplate:", error);
    return addCorsHeaders(
      new Response(JSON.stringify({ error: "Failed to delete boilerplate" }), {
        status: 500,
      })
    );
  }
}
