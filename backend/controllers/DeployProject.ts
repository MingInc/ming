import { $ } from "bun";
import { addCorsHeaders } from "../helpers/CorsHeader";

export async function deployProject(req: any) {
  const data = await req.json();

  try {
    /**
     * @dev .nothrow() keeps the error message and does not redirect to catch method.
     * @dev .quiet() runs scripts quietly and stores response to console response.
     */
    console.log(data);
    
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: `You called me, which I don't know how to handle!`,
        }),
        { headers: { "Content-Type": "application/json" }, status: 404 }
      )
    );
    // const consoleResponse = await $`./scripts/DeployProject.sh`
    //   .nothrow()
    //   .quiet();

    // return addCorsHeaders(
    //   new Response(
    //     JSON.stringify({
    //       message: {
    //         stdout: consoleResponse.stdout.toString(),
    //         stderr: consoleResponse.stderr.toString(),
    //       },
    //     }),
    //     {
    //       headers: { "Content-Type": "application/json" },
    //       status: 200,
    //     }
    //   )
    // );
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