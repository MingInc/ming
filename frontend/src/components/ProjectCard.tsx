import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useProjectContext } from "@/contexts/ProjectContext/ProjectContext"
import { GitBranchIcon, GitCommitIcon, MoreVerticalIcon, ExternalLinkIcon } from 'lucide-react'

// This would typically come from your API or state management
const projects = [
  {
    projectName: "My Awesome Project",
    projectFramework: "Next.js",
    githubUrl: "https://github.com/user/my-awesome-project",
    projectDeploymentData: {
      buildStatus: "SUCCESS",
      buildUrl: "https://my-awesome-project.vercel.app",
      buildTime: "2m 35s",
    },
    created_at: new Date("2023-06-15T10:00:00Z"),
  },
  {
    projectName: "Cool App",
    projectFramework: "React",
    githubUrl: "https://github.com/user/cool-app",
    projectDeploymentData: {
      buildStatus: "FAILED",
      buildUrl: "",
      buildTime: "1m 50s",
    },
    created_at: new Date("2023-06-14T15:30:00Z"),
  },
  {
    projectName: "API Service",
    projectFramework: "Express.js",
    githubUrl: "https://github.com/user/api-service",
    projectDeploymentData: {
      buildStatus: "BUILDING",
      buildUrl: "",
      buildTime: "1m 10s",
    },
    created_at: new Date("2023-06-13T09:45:00Z"),
  },
]

export default function DeployedProjects() {
  const { projectState, projectDispatch } = useProjectContext();

  return (
    <div className="container mx-auto px-1 py-5">
      <h1 className="text-2xl font-bold mb-6">Deployed Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projectState?.projects.map((project, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h2 className="text-lg font-semibold">{project.projectName}</h2>
              <Badge variant={project.projectDeploymentData.buildStatus === 'SUCCESS' ? 'default' : 'destructive'}>
                {project.projectDeploymentData.buildStatus}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                Framework: {project.projectFramework}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <GitBranchIcon className="mr-2 h-4 w-4" />
                <span className="truncate">{project.githubUrl.split('/').pop()}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <GitCommitIcon className="mr-2 h-4 w-4" />
                <span>{project.projectDeploymentData.buildUrl}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto">
              <div className="text-sm text-muted-foreground">
                Build time: {project.projectDeploymentData.buildTime} seconds
              </div>
              <div className="flex space-x-2">
                {project.projectDeploymentData.buildUrl && (
                  <Button onClick={() => window.open(project.projectDeploymentData.buildUrl,'_blank', 'rel=noopener noreferrer')} size="sm" variant="outline">
                    <ExternalLinkIcon className="h-4 w-4 mr-2" />
                    Visit
                  </Button>
                )}
                <Button size="sm" variant="ghost">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function formatDate(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  } else {
    return 'Just now'
  }
}