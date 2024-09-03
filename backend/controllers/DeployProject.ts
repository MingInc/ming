import { $ } from "bun";
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
    const consoleResponse =
      await $`./scripts/deploy/ViteReact.sh ${uid} ${_githubUrl} ${projectFolderName}`.nothrow();

    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: {
            stdout: consoleResponse.stdout.toString(),
            stderr: consoleResponse.stderr.toString(),
          },
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      )
    );
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
