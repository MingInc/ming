
import { addCorsHeaders } from "../helpers/CorsHeader";
import { generateUID } from "../helpers/RandomGenerator";
import { processProjectName } from "../helpers/StringManipulations";
import { extractFolderName } from "../helpers/GithubNameExtractor";

export async function deployProject(req: any) {
  const data = await req.json();

  try {
    /**
     * @dev .nothrow() keeps the error message and does not redirect to catch method.
     * @dev .quiet() runs scripts quietly and stores response to console response.
     */
    const {
      projectName,
      githubUrl,
      projectFramework,
      rootDirectory,
      buildCommand,
      outputDirectory,
      installCommand,
      envVariables,
    } = data;
    const uid = processProjectName(projectName) + "-" + generateUID();
    const projectFolderName = extractFolderName(githubUrl);
    const _githubUrl = githubUrl.endsWith(".git")
      ? githubUrl
      : githubUrl + ".git";

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
      {
        stderr: "pipe",
      }
    );

    const combinedStream = new ReadableStream({
      async start(controller) {
        proc.stdout.pipeTo(
          new WritableStream({
            write(chunk) {
              controller.enqueue(chunk);
            },
          })
        );
        proc.stderr.pipeTo(
          new WritableStream({
            write(chunk) {
              controller.enqueue(chunk);
            },
          })
        );
      },
    });

    return addCorsHeaders(new Response(combinedStream, {
      headers: { "Content-Type": "text/plain" },
    }))
  } catch (err: any) {
    console.log(err);
    console.log(`Failed with code ${err.exitCode}`);
    console.log(err.stdout.toString());
    console.log(err.stderr.toString());
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Script execution failed",
          error: err.stderr.toString(),
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      )
    );
  }
}
