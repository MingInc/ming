import { Project } from "../models/Project.Schema"; // Assuming Project.Schema defines the project model
import { addCorsHeaders } from "../helpers/CorsHeader";
import { processProjectName } from "../helpers/StringManipulations";
import { generateUID } from "../helpers/RandomGenerator";

export async function createProject(req: any) {
  const data = await req.json();

  const uid = processProjectName(data.projectName) + "-" + generateUID();

  try {
    const newProject = new Project({
      projectUid: uid,
      ...data,
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

export async function updateProject(req: any) {
  const data = req.json();

  const { _id } = data;

  try {
    const project = await Project.findByIdAndUpdate(_id, data, { new: true });
    if (!project) return new Response("Not found", { status: 404 });

    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Project updated successfully!",
          project,
        })
      )
    );
  } catch (error: any) {
    console.error("Error updating project:", error);

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
