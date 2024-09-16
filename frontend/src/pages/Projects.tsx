import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import { RocketIcon, GearIcon, FileIcon } from "@radix-ui/react-icons";
import TemplateCard from "@/components/TemplateCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

export default function EnhancedProjects() {
  const [projectName, setProjectName] = useState("");
  const [githubUrl, setGitHubUrl] = useState("");
  const [projectFramework, setProjectFramework] = useState("");
  const [rootDirectory, setRootDirectory] = useState("");
  const [buildCommand, setBuildCommand] = useState("");
  const [outputDirectory, setOutputDirectory] = useState("");
  const [installCommand, setInstallCommand] = useState("");
  const [envVariables, setEnvVariables] = useState("");

  const navigate = useNavigate();
  const { authState } = useAuth();

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

    localStorage.setItem(
      "MING_PROJECT_DEPLOYMENT_PAYLOAD",
      JSON.stringify(data)
    );

    const payload = {
      userUid: authState.user.uid,
      ...data,
    };

    fetch(`${import.meta.env.VITE_SERVER_URI}/api/v1/create-project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem(
          "MING_PROJECT_DEPLOYMENT_ID",
          data.project.projectUid
        );
        navigate("/build");
      })
      .catch((error) => {
        console.error("Error deploying project:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Let's build something new
          </CardTitle>
          <CardDescription>
            To deploy a new Project, import an existing Git Repository or get
            started with one of our Templates.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GearIcon className="mr-2" /> Configure Project
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                placeholder="Your Amazing Project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                placeholder="https://github.com/MingInc/ming.git"
                value={githubUrl}
                onChange={(e) => setGitHubUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectFramework">Framework</Label>
              <Select
                value={projectFramework}
                onValueChange={setProjectFramework}
              >
                <SelectTrigger id="projectFramework">
                  <SelectValue placeholder="Choose framework..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vite">Vite</SelectItem>
                  <SelectItem value="React.js">React.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rootDirectory">Root Directory</Label>
              <Input
                id="rootDirectory"
                placeholder="./"
                value={rootDirectory}
                onChange={(e) => setRootDirectory(e.target.value)}
              />
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="build-settings">
                <AccordionTrigger>Build & Output Settings</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="buildCommand">Build Command</Label>
                    <Input
                      id="buildCommand"
                      placeholder="npm run build"
                      value={buildCommand}
                      onChange={(e) => setBuildCommand(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="outputDirectory">Output Directory</Label>
                    <Input
                      id="outputDirectory"
                      placeholder="dist"
                      value={outputDirectory}
                      onChange={(e) => setOutputDirectory(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="installCommand">Install Command</Label>
                    <Input
                      id="installCommand"
                      placeholder="npm install"
                      value={installCommand}
                      onChange={(e) => setInstallCommand(e.target.value)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="env-variables">
                <AccordionTrigger>Environment Variables</AccordionTrigger>
                <AccordionContent>
                  <Textarea
                    placeholder="Paste your .env content here"
                    className="min-h-[100px]"
                    value={envVariables}
                    onChange={(e) => setEnvVariables(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    TIP: Paste a .env above to populate the form
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleDeploy}>
              <RocketIcon className="mr-2" /> Deploy
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:self-start">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileIcon className="mr-2" /> Clone Template
            </CardTitle>
            <CardDescription>
              Jumpstart your app development process with our pre-built Ming
              templates, starters, and themes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="next">Next.js</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <TemplateCard />
              </TabsContent>
              <TabsContent value="react">
                <TemplateCard />
              </TabsContent>
              <TabsContent value="next">
                <TemplateCard />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Browse All Templates
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
