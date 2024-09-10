import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

export default function CurrentBuild() {
  const [projectDeploymentPayload, setProjectDeploymentPayload] = useState({});
  const [projectDeploymentLog, setProjectDeploymentLog] = useState<string[]>(
    []
  );

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
      try {
        const response: any = await fetch(
          `${import.meta.env.VITE_SERVER_URI}/api/v1/deploy-project`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(_payload),
          }
        );

        const reader = response?.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Update the projectDeploymentLog state with a new entry
          const newLogEntry = decoder.decode(value);
          setProjectDeploymentLog((prevLogData) => [
            ...prevLogData,
            newLogEntry,
          ]);
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
 
  return (
    <div className="mx-auto max-w-7xl container my-5">
      <div className="flex items-start justify-center flex-wrap text-sm gap-4">
        <img
          className="w-[100%] lg:w-[25vw] h-[200px] object-cover"
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHpxMDVqdm53bnZhMHU5enVwcDZ6aWp1bWVuZXdvd210bjY0bWdlMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V4NSR1NG2p0KeJJyr5/giphy.webp"
          alt=""
        />
        <div className="w-[100%] lg:w-[25vw]">
          <h1 className="font-semibold text-lg">Ming</h1>
          <div className="flex gap-6">
            <div>
              <p>Status</p>
              <p>Building</p>
            </div>
            <div>
              <p>Duration</p>
              <p>25s (8d ago)</p>
            </div>
          </div>

          <p className="mt-3 font-semibold">Domains</p>
          <ul>
            <li>
              <a className="flex items-center gap-1" href="">
                <i className="ri-global-line"></i> ming.ngrok.dev
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
            https://github.com/13x54n/app.ming
          </p>
          <button className="bg-black w-[100%] text-white py-1 my-3">
            Live Preview
          </button>
        </div>
      </div>
      <hr className="my-6" />

      <p className="text-lg font-semibold">Deployment Details</p>
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p className="text-sm">Build Logs</p>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col border-2 border-gray-500 max-h-[200px] overflow-y-scroll">
              {projectDeploymentLog.map((logEntry, index) => (
                <li className="hover:bg-gray-100 py-1 px-2 flex items-center" key={index}><p className="w-[60px]">#{index}</p><p>{logEntry}</p></li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <p className="text-sm">Assigned Domain</p>
          </AccordionTrigger>
          <AccordionContent>
            <a href="https://ming.ngrok.dev" className="underline">https://ming.ngrok.dev</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
