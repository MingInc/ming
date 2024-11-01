import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GearIcon, FileIcon } from "@radix-ui/react-icons";
import TemplateCard from "@/components/TemplateCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import ConfigureProject from "@/components/ConfigureProject.component";
import useAuthProvider from "@/hooks/useAuthProvider.hooks";
import { fetchRepositories, linkGithubToGoogle, auth, saveUserData } from "@/firebase.config";
import { getAuth, GithubAuthProvider, signInWithPopup, unlink } from "firebase/auth";
import { encryptData } from "@/lib/utils";

export default function EnhancedProjects() {
  const [projectName, setProjectName] = useState("");
  const [githubUrl, setGitHubUrl] = useState("");
  const [projectFramework, setProjectFramework] = useState("");
  const [rootDirectory, setRootDirectory] = useState("");
  const [buildCommand, setBuildCommand] = useState("");
  const [outputDirectory, setOutputDirectory] = useState("");
  const [installCommand, setInstallCommand] = useState("");
  const [envVariables, setEnvVariables] = useState("");
  const allowedProviders = ["google.com", "github.com"];
  const providers = useAuthProvider();

  const isGoogleLinked = providers?.some(provider => allowedProviders.includes(provider));
  const isGithubLinked = providers?.some(provider => allowedProviders.includes(provider));

  const navigate = useNavigate();
  const { authState, login } = useAuth();
  
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

  const handleLinkToGithubAccount = async () => {
    try {
      const result = await linkGithubToGoogle();
      const user = result.user;
      const credential = GithubAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      const providerData = user?.providerData

      console.log(providerData)

      if (accessToken) {
        await saveUserData(user,accessToken)
      }
      if (user.email) {
        login(user);
        localStorage.setItem("ming_authenticated_user", JSON.stringify(user));
        // navigate("/dashboard");
      }
    } catch(error) {
      console.log("error :", error);
      console.log("error code :", error?.code);

      console.log("email :", error?.customData?.email)
      
      // const isGithubLinked = user?.providerData.some((provider) => provider.providerId === "github.com")
      
      if (error?.code === "auth/credential-already-in-use") {
        const existingEmail = error?.customData?.email 
        try {

          const response = await fetch("http://localhost:3000/api/v1/user/getFirebaseUserByEmail",{
            method:"POST",
            body:JSON.stringify({email: existingEmail})
          })
          console.log(response)
          const _data = await response.json()
          console.log(_data)
      
          console.log(_data.user)
          console.log("current user :", auth.currentUser) 
          if(response.status === 201){
            const result = await linkGithubToGoogle()
            const _user = result.user
            const credential = GithubAuthProvider.credentialFromResult(result)
            const accessToken = credential?.accessToken
            if (accessToken) {
              await saveUserData(_user,accessToken)
            }
          }
        }catch(error){
          console.log(error)
        }
        console.log("GitHub account unlinked from previous user.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="md:row-span-2 px-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GearIcon className="mr-2" /> Configure Project
            </CardTitle>
          </CardHeader>
          {/* <CardContent className="space-y-4">
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
          </CardFooter> */}
          {!isGithubLinked && isGoogleLinked ? (
            <Button onClick={handleLinkToGithubAccount}>
              Link Account with GitHub
            </Button>
          ) : (
            <ConfigureProject />
          )}
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
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                localStorage.setItem(
                  "ming_dashboard_active_tab",
                  "/boilerplates"
                );
                navigate("/");
              }}
            >
              Browse All Templates
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
