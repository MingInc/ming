import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GithubIcon, GlobeIcon, PackageIcon, TerminalIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'

// Mock data based on the provided schema
const projectData = {
  userUid: "user123",
  projectUid: "proj456",
  projectName: "My Awesome Project",
  githubUrl: "https://github.com/user/my-awesome-project",
  projectFramework: "Next.js",
  rootDirectory: "/",
  buildCommand: "npm run build",
  outputDirectory: ".next",
  installCommand: "npm install",
  envVariables: "API_KEY,DATABASE_URL",
  projectDeploymentData: {
    projectDeploymentLog: [
      "Installing dependencies...",
      "Building project...",
      "Deploying to Vercel...",
    ],
    buildStatus: "success",
    buildUrl: "https://vercel.com/user/my-awesome-project/deployments/dep789",
    buildTime: "1m 23s",
  },
  created_at: new Date("2023-05-15T10:30:00Z"),
}

export function ProjectPreview() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{projectData.projectName}</h1>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">{projectData.projectFramework}</Badge>
            <span className="text-sm text-gray-500">
              Created on {new Date(projectData.created_at).toLocaleDateString()}
            </span>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>Key information about your project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <GithubIcon className="w-5 h-5" />
                    <a href={projectData.githubUrl} className="text-blue-600 hover:underline">
                      GitHub Repository
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GlobeIcon className="w-5 h-5" />
                    <span>Production Domain</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PackageIcon className="w-5 h-5" />
                    <span>{projectData.projectFramework}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TerminalIcon className="w-5 h-5" />
                    <span>{projectData.buildCommand}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployments">
            <Card>
              <CardHeader>
                <CardTitle>Latest Deployment</CardTitle>
                <CardDescription>Details of the most recent deployment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {projectData.projectDeploymentData.buildStatus === 'success' ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircleIcon className="w-5 h-5 text-red-500" />
                      )}
                      <span className="font-medium">
                        {projectData.projectDeploymentData.buildStatus === 'success' ? 'Success' : 'Failed'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4" />
                      <span>{projectData.projectDeploymentData.buildTime}</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Deployment Log</h3>
                    <ul className="space-y-1 text-sm">
                      {projectData.projectDeploymentData.projectDeploymentLog.map((log, index) => (
                        <li key={index}>{log}</li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" asChild>
                    <a href={projectData.projectDeploymentData.buildUrl}>View Build Details</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>Configure your project settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Root Directory</h3>
                    <p className="text-sm text-gray-500">{projectData.rootDirectory}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Output Directory</h3>
                    <p className="text-sm text-gray-500">{projectData.outputDirectory}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Install Command</h3>
                    <p className="text-sm text-gray-500">{projectData.installCommand}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Environment Variables</h3>
                    <p className="text-sm text-gray-500">{projectData.envVariables.split(',').join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}