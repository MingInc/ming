import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useEffect, useRef, useState } from "react";

export default function CurrentBuild() {
  const [projectDeploymentPayload, setProjectDeploymentPayload] = useState({
    githubUrl: "", // Initialize with a default value
    projectName: "",
  });
  const [projectDeploymentLog, setProjectDeploymentLog] = useState<string[]>(
    []
  );
  const [buildStatus, setBuildStatus] = useState<string>("building");
  const [buildUrl, setBuildUrl] = useState<string>("");
  const [buildTime, setBuildTime] = useState<string>("");
  const logContainerRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const _payload: any = localStorage.getItem(
      "MING_PROJECT_DEPLOYMENT_PAYLOAD"
    )
      ? JSON.parse(
          localStorage.getItem("MING_PROJECT_DEPLOYMENT_PAYLOAD") as string
        )
      : null;

    setProjectDeploymentPayload(_payload);

    (async () => {
      const _id = localStorage.getItem('MING_PROJECT_DEPLOYMENT_ID')
      try {
        const response: any = await fetch(
          `${import.meta.env.VITE_SERVER_URI}/api/v1/deploy-project`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({..._payload, _id}),
          }
        );

        const reader = response?.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const decodedValue = decoder.decode(value); // Trim whitespace

          // Check immediately if the log contains "Cleaning up..."
          if (decodedValue.includes("Cleaning up...")) {
            setBuildStatus("failed");
            break; // Stop further processing if the build failed
          }

          // Update the projectDeploymentLog state with a new entry
          const newLogEntry = decoder.decode(value);
          setProjectDeploymentLog((prevLogData) => [
            ...prevLogData,
            newLogEntry,
          ]);

          if (decodedValue.includes("build time:")) {
            let match = decoder
              .decode(value)
              .match(/build time: (\d+) seconds./);

            if (match) {
              let buildTimeInSeconds = match[1];
              setBuildTime(buildTimeInSeconds);
            }
            break;
          }

          function extractPublicUrl(jsonString: string): string | undefined {
            try {
              const jsonData: {
                endpoints: { public_url: string; url: string }[];
              } = JSON.parse(jsonString);
              const publicUrl = jsonData.endpoints[0].public_url;
              const url = jsonData.endpoints[0].url;
              return publicUrl || url;
            } catch (error) {
              // Handle the error
              // console.error("Error parsing JSON:", error);
              return undefined; // Or set a flag indicating URL wasn't found
            }
          }

          var extractedUrl: string | undefined = extractPublicUrl(
            decoder.decode(value)
          );
          if (extractedUrl && extractedUrl.includes("http")) {
            console.log(extractedUrl)
            console.log("Extracted URL:", extractedUrl);
            setBuildUrl(extractedUrl);
            setBuildStatus("completed");

            localStorage.removeItem("MING_PROJECT_DEPLOYMENT_PAYLOAD");
            localStorage.removeItem("MING_PROJECT_DEPLOYMENT_ID");
          }
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Auto-scroll to the bottom when the logs update
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [projectDeploymentLog]);

  return (
    <div className="mx-auto max-w-7xl container my-5">
      <div className="flex items-start justify-center flex-wrap text-sm gap-4">
        <img
          className="w-[100%] lg:w-[25vw] h-[200px] object-cover"
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHpxMDVqdm53bnZhMHU5enVwcDZ6aWp1bWVuZXdvd210bjY0bWdlMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V4NSR1NG2p0KeJJyr5/giphy.webp"
          alt=""
        />
        <div className="w-[100%] lg:w-[25vw]">
          <h1 className="font-semibold text-lg">
            {projectDeploymentPayload?.projectName}
          </h1>
          <div className="flex gap-6">
            <div>
              <p>Status</p>
              <p>{buildStatus}</p>
            </div>
            <div>
              <p>Duration</p>
              <p>
                {buildTime !== "" ? `${buildTime} Seconds` : <>{buildStatus}</>}
              </p>
            </div>
          </div>

          <p className="mt-3 font-semibold">Domains</p>
          <ul>
            <li>
              <a
                className="flex items-center gap-1"
                href={buildUrl ? buildUrl : "#"}
              >
                {" "}
                {/* Set href to "#" if buildUrl is empty */}
                <i className="ri-global-line"></i>{" "}
                {buildStatus !== "completed" ? (
                  <div className="max-w-sm animate-pulse h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                ) : (
                  buildUrl
                )}
              </a>
            </li>
            <li></li>
          </ul>
        </div>
        <div className="w-[100%] lg:w-[20vw]">
          <p className="font-semibold">Source</p>
          <p>
            <i className="ri-git-merge-line"></i> main
          </p>
          <p>
            <i className="ri-github-fill"></i>{" "}
            {projectDeploymentPayload && projectDeploymentPayload?.githubUrl}
          </p>
          <div className="mt-2"></div>
          <a
            href={buildUrl}
            target="_blank"
            className={`${
              buildStatus === "building" ? "bg-gray-300" : "bg-black"
            } text-white py-1 my-3 px-5`}
          >
            {buildStatus !== "completed" ? "Building..." : "Live Preview"}
          </a>
        </div>
      </div>
      <hr className="my-6" />

      <p className="text-lg font-semibold">Deployment Details</p>
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center justify-between w-[96%]">
              <p className="text-sm">Build Logs</p>
              {buildStatus === "building" ? (
                <div className="flex items-center gap-3 text-sm">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <p>Building...</p>
                </div>
              ) : buildStatus === "failed" ? (
                <div className="flex items-center  text-sm">
                  <span className="flex w-3 h-3 me-3 bg-red-500 rounded-full"></span>{" "}
                  Deployment Failed
                </div>
              ) : (
                <div>Build Completed</div>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul
              className="flex flex-col border-2 border-gray-500 max-h-[200px] overflow-y-scroll"
              ref={logContainerRef}
            >
              {projectDeploymentLog.map((logEntry, index) => (
                <li
                  className="hover:bg-gray-100 py-1 px-2 flex items-center"
                  key={index}
                >
                  <p className="w-[60px]">#{index}</p>
                  <p className="flex-1">{logEntry}</p>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center justify-between w-[96%]">
              <p className="text-sm">Assigned Domain</p>
              {buildStatus === "building" ? (
                <div className="flex items-center gap-3 text-sm">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <p>Building...</p>
                </div>
              ) : buildStatus === "failed" ? (
                <div className="flex items-center  text-sm">
                  <span className="flex w-3 h-3 me-3 bg-red-500 rounded-full"></span>{" "}
                  Deployment Failed
                </div>
              ) : (
                <a href={buildUrl} target="_blank">
                  {buildUrl}
                </a>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <a href={buildUrl} target="_blank" className="underline">
              {buildUrl}
            </a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
