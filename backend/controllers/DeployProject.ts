import { addCorsHeaders } from "../helpers/CorsHeader";
import { generateUID } from "../helpers/RandomGenerator";
import { processProjectName } from "../helpers/StringManipulations";
import { extractFolderName } from "../helpers/GithubNameExtractor";
import { Project } from "../models/Project.Schema";
import mongoose from "mongoose";

// Function to extract public URL from a JSON string
function extractPublicUrl(jsonString: string): string | undefined {
  try {
    const jsonData: {
      endpoints: { public_url: string; url: string }[];
    } = JSON.parse(jsonString);

    const publicUrl = jsonData.endpoints[0]?.public_url;
    const url = jsonData.endpoints[0]?.url;

    return publicUrl || url;
  } catch (error) {
    console.error("Error parsing JSON for public URL:", error);
    return undefined;
  }
}

export async function deployProject(req: any) {
  const data = await req.json();

  try {
    const {
      projectName,
      githubUrl,
      _id, // Ensure _id is correctly passed
    } = data;

    const uid = processProjectName(projectName) + "-" + generateUID();
    const projectFolderName = extractFolderName(githubUrl);
    const _githubUrl = githubUrl.endsWith(".git")
      ? githubUrl
      : githubUrl + ".git";

    let logArray: string[] = [];
    let extractedUrl: string | undefined;
    let buildTimeInSeconds: string | undefined;

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

                // Check for the public URL in each log entry
                const tempUrl = extractPublicUrl(decodedChunk);
                if (tempUrl && tempUrl.includes("http")) {
                  extractedUrl = tempUrl; // Store the extracted URL
                }

                // Check for build time in each log entry
                if (decodedChunk.includes("build time:")) {
                  const match = decodedChunk.match(/build time: (\d+) seconds./);
                  if (match) {
                    buildTimeInSeconds = match[1];
                  }
                }

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

        try {
          // If we have a valid URL and build time, update the project
          if (extractedUrl && buildTimeInSeconds) {
            const project = await Project.findOneAndUpdate(
              { projectUid: _id },
              {
                $set: {
                  projectDeploymentData: {
                    projectDeploymentLog: logArray,
                    buildTime: buildTimeInSeconds,
                    buildStatus: "completed",
                    buildUrl: extractedUrl,
                  },
                },
              },
              { new: true }
            );

            if (!project) {
              console.error("Project not found with _id:", _id);
              return new Response("Project not found", { status: 404 });
            }

            console.log("Project updated successfully:", project);
          }
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
