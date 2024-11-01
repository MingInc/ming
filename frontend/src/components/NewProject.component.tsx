import { useState } from "react";
import { ChevronDown, Github, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";

export default function NewProject() {
  const [searchParams] = useSearchParams();
  const [projectName, setProjectName] = useState(
    searchParams.get("name") || ""
  );
  const [rootDirectory, setRootDirectory] = useState("./");
  const [buildCommand, setBuildCommand] = useState(
    "npm run build or vite build"
  );
  const [outputDirectory, setOutputDirectory] = useState("dist");
  const [installCommand, setInstallCommand] = useState(
    "yarn install , pnpm install , npm install, or bun install"
  );
  const [envVariables, setEnvVariables] = useState([
    { key: "EXAMPLE_NAME", value: "19JU23NF394R6HH" },
  ]);
  const [showBuildOutputSettings, setShowBuildOutputSettings] =
    useState<boolean>(false);
  const [showEnvVariable, setShowEnvVariable] = useState<boolean>(false);
  const fullname = searchParams.get("fullname");
  const src = searchParams.get("s");

  const addEnvVariable = () => {
    setEnvVariables([...envVariables, { key: "", value: "" }]);
  };

  const updateEnvVariable = (index: number, key: string, value: string) => {
    const newEnvVariables = [...envVariables];
    newEnvVariables[index] = { key, value };
    setEnvVariables(newEnvVariables);
  };

  const removeEnvVariable = (index: number) => {
    setEnvVariables(envVariables.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full max-w-2xl m-auto mt-5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">New Project</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className=" bg-gray-300 p-4 rounded-md">
          <p className="text-sm text-zinc-400 mb-2">Importing from GitHub</p>
          <div className="flex items-center space-x-2 text-sm">
            <Github size={16} />
            <a href={`${src}`} target="_blank">
              <span>{fullname}</span>
            </a>
            <span className="text-zinc-500">main</span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm">
            Choose where you want to create the project and give it a name.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-400 mb-1">Ming Team</p>
              <Select>
                <SelectTrigger className="w-full bg-gray-300 border-zinc-700">
                  <SelectValue placeholder="surajgaire14's projects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">
                    surajgaire14's projects
                  </SelectItem>
                  <SelectItem value="team">Team Projects</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-xs text-zinc-400 mb-1">Project Name</p>
              <Input
                className="w-full bg-gray-300 border-zinc-700"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-zinc-400 mb-1">Framework Preset</p>
          <Select>
            <SelectTrigger className="w-full bg-gray-300 border-zinc-700">
              <SelectValue placeholder="Vite" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vite">Vite</SelectItem>
              <SelectItem value="next">Next.js</SelectItem>
              <SelectItem value="react">Create React App</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-xs text-zinc-400 mb-1">Root Directory</p>
          <div className="flex">
            <Input
              className="flex-grow bg-gray-300 border-zinc-700"
              value={rootDirectory}
              onChange={(e) => setRootDirectory(e.target.value)}
            />
            <Button
              variant="outline"
              className="ml-2 border-zinc-700 bg-gray-300"
            >
              Edit
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Button
              variant="outline"
              className="w-full justify-between bg-gray-300 border-zinc-700"
              onClick={() => setShowBuildOutputSettings((prev) => !prev)}
            >
              Build and Output Settings
              <ChevronDown size={16} />
            </Button>
            {showBuildOutputSettings && (
              <div className="mt-2 space-y-2">
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Build Command</p>
                  <div className="flex items-center">
                    <Input
                      className="flex-grow bg-gray-300 border-zinc-700"
                      value={buildCommand}
                      onChange={(e) => setBuildCommand(e.target.value)}
                    />
                    <Info size={16} className="ml-2 text-zinc-400" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Output Directory</p>
                  <div className="flex items-center">
                    <Input
                      className="flex-grow bg-gray-300 border-zinc-700"
                      value={outputDirectory}
                      onChange={(e) => setOutputDirectory(e.target.value)}
                    />
                    <Info size={16} className="ml-2 text-zinc-400" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Install Command</p>
                  <div className="flex items-center">
                    <Input
                      className="flex-grow bg-gray-300 border-zinc-700"
                      value={installCommand}
                      onChange={(e) => setInstallCommand(e.target.value)}
                    />
                    <Info size={16} className="ml-2 text-zinc-400" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <Button
              variant="outline"
              className="w-full justify-between bg-gray-300 border-zinc-700"
              onClick={() => setShowEnvVariable((prev) => !prev)}
            >
              Environment Variables
              <ChevronDown size={16} />
            </Button>
            {showEnvVariable && (
              <div className="mt-2 space-y-2">
                {envVariables.map((variable, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      className="flex-grow bg-gray-300 border-zinc-700"
                      placeholder="Key"
                      value={variable.key}
                      onChange={(e) =>
                        updateEnvVariable(index, e.target.value, variable.value)
                      }
                    />
                    <Input
                      className="flex-grow bg-gray-300 border-zinc-700"
                      placeholder="Value"
                      value={variable.value}
                      onChange={(e) =>
                        updateEnvVariable(index, variable.key, e.target.value)
                      }
                    />
                    <Button
                      variant="outline"
                      className=" bg-gray-300 border-zinc-700"
                      onClick={() => removeEnvVariable(index)}
                    >
                      -
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full  bg-gray-300 border-zinc-700"
                  onClick={addEnvVariable}
                >
                  + Add More
                </Button>
                <p className="text-xs text-zinc-400">
                  Tip: Paste an .env above to populate the form.{" "}
                  <a href="#" className="text-blue-400">
                    Learn more
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        <Button className="w-full bg-white text-black hover:bg-zinc-200">
          Deploy
        </Button>
      </CardContent>
    </Card>
  );
}
