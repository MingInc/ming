import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TemplateCard from "@/components/TemplateCard";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function Projects() {
  const [projectName, setProjectName] = useState<string>("");
  const [githubUrl, setGitHubUrl] = useState<string>("");
  const [projectFramework, setProjectFramework] = useState<string>("");
  const [rootDirectory, setRootDirectory] = useState<string>("");
  const [buildCommand, setBuildCommand] = useState<string>("");
  const [outputDirectory, setOutputDirectory] = useState<string>("");
  const [installCommand, setInstallCommand] = useState<string>("");
  const [envVariables, setEnvVariables] = useState<string>("");

  const handleDeploy = async () => {
    const data = {
      projectName,
      githubUrl,
      projectFramework,
      rootDirectory,
      buildCommand,
      outputDirectory,
      installCommand,
      envVariables,
    };

    if (projectName == "" || githubUrl == "" || projectFramework == "") {
      return toast({
        title: "⚠️ Something's Missing!",
        description:
          "Project Name, GitHub URL, and framework are always required!",
      });
    }

    // const response = await fetch("http://localhost:3000/test"); // Get Request
    const response: any = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/api/v1/deploy-project`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const reader = response?.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      console.log(decoder.decode(value));
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  };

  return (
    <div className="mx-auto max-w-7xl container">
      <div className="my-8">
        <p className="text-2xl font-medium">Let's build something new.</p>
        <p className="text-sm text-gray-600">
          To deploy a new Project, import an existing Git Repository or get
          started with one of our Templates.
        </p>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="border p-3 px-4 rounded-md h-auto">
          <p className="text-md font-medium border-b-2 pb-2 mb-2">
            <i className="ri-settings-line"></i> Configure Project
          </p>
          <p className="text-sm font-medium my-1">Project Name</p>
          <input
            type="text"
            placeholder="Your Amazing Project"
            className="text-sm w-full border p-1 px-2"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <p className="text-sm font-medium my-1">GitHub URL</p>
          <input
            type="text"
            placeholder="https://github.com/MingInc/ming.git"
            className="w-full border p-1 px-2 text-sm"
            value={githubUrl}
            onChange={(e) => setGitHubUrl(e.target.value)}
          />
          <p className="text-sm font-medium my-1">Framework</p>
          <Select
            value={projectFramework}
            onValueChange={(e) => setProjectFramework(e)}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Choose framework..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Vite">Vite</SelectItem>
              <SelectItem value="React.js">React.js</SelectItem>
              <SelectItem value="Next.js">Next.js</SelectItem>
            </SelectContent>
          </Select>

          <p className="text-sm font-medium my-1">Root Directory</p>
          <input
            type="text"
            placeholder="./"
            className="w-full border p-1 px-2 text-sm"
            value={rootDirectory}
            onChange={(e) => setRootDirectory(e.target.value)}
          />

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm">
                Build & Output Settings
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm font-medium my-1">Build Command</p>
                <input
                  type="text"
                  placeholder="npm run build"
                  className="w-full border p-1 px-2 text-sm"
                  value={buildCommand}
                  onChange={(e) => setBuildCommand(e.target.value)}
                />
                <p className="text-sm font-medium my-1">Output Directory</p>
                <input
                  type="text"
                  placeholder="dist"
                  className="w-full border p-1 px-2 text-sm"
                  value={outputDirectory}
                  onChange={(e) => setOutputDirectory(e.target.value)}
                />
                <p className="text-sm font-medium my-1">Install Command</p>
                <input
                  type="text"
                  placeholder="npm install"
                  className="w-full border p-1 px-2 text-sm"
                  value={installCommand}
                  onChange={(e) => setInstallCommand(e.target.value)}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm">
                Environment Variables
              </AccordionTrigger>
              <AccordionContent>
                <textarea
                  rows={4}
                  className="border w-full"
                  value={envVariables}
                  onChange={(e) => setEnvVariables(e.target.value)}
                />
                <p>TIP: Paste a .env above to populate the form</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <button
            onClick={() => handleDeploy()}
            className="text-sm text-white bg-black w-full py-2 mt-4 rounded-sm"
          >
            Deploy
          </button>
        </div>
        <div className="border p-3 px-4 rounded-md">
          <div className="items-center flex justify-between border-b-2 pb-2 flex-col lg:flex-row">
            <div>
              <p className="text-md font-medium">
                <i className="ri-file-copy-line"></i> Clone Template
              </p>
              <p className="text-sm mt-1 mb-2">
                Jumpstart your app development process with our pre-built Ming
                templates, starters, and themes.
              </p>
            </div>
            <Select>
              <SelectTrigger className="lg:w-[120px] w-full mt-3 lg:mt-0 text-sm">
                <SelectValue placeholder="Framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Vite</SelectItem>
                <SelectItem value="dark">React.js</SelectItem>
                <SelectItem value="system">Next.js</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TemplateCard />

          <a className="mt-3 text-sm">
            Browse All Templates <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
