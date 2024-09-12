import { addCorsHeaders } from "../helpers/CorsHeader";
import { generateUID } from "../helpers/RandomGenerator";
import { processProjectName } from "../helpers/StringManipulations";
import { extractFolderName } from "../helpers/GithubNameExtractor";
import { Project } from "../models/Project.Schema";
import mongoose from "mongoose";

export async function deployProject(req: any) {
  const data = await req.json();

  try {
    const {
      projectName,
      githubUrl,
      _id, // Ensure _id is correctly passed
      // other fields
    } = data;
    const uid = processProjectName(projectName) + "-" + generateUID();
    const projectFolderName = extractFolderName(githubUrl);
    const _githubUrl = githubUrl.endsWith(".git") ? githubUrl : githubUrl + ".git";

    let logArray: string[] = [];
    const sink = new Bun.ArrayBufferSink();
    sink.start({ asUint8Array: true });

    const proc: any = Bun.spawn(
      [
        "./scripts/deploy/ViteReact.sh",
        uid,
        _githubUrl,
        projectFolderName,
        Bun.env.NGROK_API_KEY,
        Bun.env.NGROK_AUTH_TOKEN,
        Bun.env.NGROK_DOMAIN,
      ],
      { stderr: "pipe" }
    );

    const decoder = new TextDecoder();

    const combinedStream = new ReadableStream({
      async start(controller) {
        await Promise.all([
          proc.stdout.pipeTo(
            new WritableStream({
              write(chunk) {
                const decodedChunk = decoder.decode(chunk, { stream: true });
                sink.write(chunk);
                logArray.push(decodedChunk);
                controller.enqueue(decodedChunk);
              },
            })
          ),
          proc.stderr.pipeTo(
            new WritableStream({
              write(chunk) {
                const decodedChunk = decoder.decode(chunk, { stream: true });
                sink.write(chunk);
                logArray.push(decodedChunk);
                controller.enqueue(decodedChunk);
              },
            })
          ),
        ]);

        // Wait for the streams to complete before updating the database
        try {
          const objectId = mongoose.Types.ObjectId.isValid(_id)
            ? new mongoose.Types.ObjectId(_id)
            : null;

          if (!objectId) {
            console.error("Invalid ObjectId:", _id);
            return new Response("Invalid ObjectId", { status: 400 });
          }

          const project = await Project.findByIdAndUpdate(
            objectId,
            {
              $set: {
                projectDeploymentData: { projectDeploymentLog: logArray },
              },
            },
            { new: true }
          );

          if (!project) {
            console.error("Project not found with _id:", _id);
            return new Response("Project not found", { status: 404 });
          }

          console.log("Project updated successfully:", project);
        } catch (error) {
          console.error("Error during project update:", error);
        }

        controller.close();
      },
    });

    return addCorsHeaders(
      new Response(combinedStream, {
        headers: { "Content-Type": "text/plain" },
      })
    );
  } catch (err: any) {
    console.error("Script execution error:", err);
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Script execution failed",
          error: err.stderr ? err.stderr.toString() : err.message,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      )
    );
  }
}
