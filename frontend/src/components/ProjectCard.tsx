import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useProjectContext } from "@/contexts/ProjectContext/ProjectContext"
import { GitBranchIcon, GitCommitIcon, MoreVerticalIcon, ExternalLinkIcon, RocketIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function DeployedProjects() {
  const { projectState } = useProjectContext();
  const navigate = useNavigate();

  if (projectState.loading) {
    return (
      <div className="container mx-auto px-1">
        <h1 className="text-2xl font-bold mb-6">Deployed Projects</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-5 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter className="flex justify-between mt-auto">
                <Skeleton className="h-4 w-1/3" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!projectState?.projects || projectState.projects.length === 0) {
    return (
      <div className="container mx-auto px-1 flex flex-col items-center justify-center min-h-[50vh]">
        <RocketIcon className="h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-2">No projects are deployed yet</h1>
        <p className="text-muted-foreground mb-4">Start by deploying your first project</p>
        <Button onClick={() => navigate('/create-new')}>
          Deploy Your First Project
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-1">
      <h1 className="text-2xl font-bold mb-6">Deployed Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projectState.projects.map((project, index) => (
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
                  <Button onClick={() => window.open(project.projectDeploymentData.buildUrl, '_blank', 'rel=noopener noreferrer')} size="sm" variant="outline">
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