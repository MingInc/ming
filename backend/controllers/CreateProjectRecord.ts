import { Project } from "../models/Project.Schema"; // Assuming Project.Schema defines the project model
import { addCorsHeaders } from "../helpers/CorsHeader";
import { processProjectName } from "../helpers/StringManipulations";
import { generateUID } from "../helpers/RandomGenerator";

export async function createProject(req: any) {
  const data = await req.json();

  const uid = processProjectName(data.projectName) + "-" + generateUID();

  console.log(data)

  try {
    const newProject = new Project({
        projectUid: uid,
        ...data
    });
    const savedProject = await newProject.save();

    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Project created successfully!",
          project: savedProject,
        })
      )
    );
  } catch (error: any) {
    console.error("Error creating project:", error);

    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: error.message,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      )
    );
  }
}
