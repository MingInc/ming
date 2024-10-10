import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Clock, Cloud, Globe, HardDrive, Image, Video, Zap } from "lucide-react"

export default function AccountUsageDashboard() {
  const [timePeriod, setTimePeriod] = useState('30d')

  return (
    <div className="min-h-screen mt-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total CPU Time */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total CPU Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234 hours</div>
              <p className="text-xs text-muted-foreground">+20.1% from last period</p>
            </CardContent>
          </Card>

          {/* Total Storage Used */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Storage Used</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">789 GB</div>
              <p className="text-xs text-muted-foreground">+5.3% from last period</p>
            </CardContent>
          </Card>

          {/* Bandwidth Used */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bandwidth Used</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3 TB</div>
              <p className="text-xs text-muted-foreground">+15.7% from last period</p>
            </CardContent>
          </Card>

          {/* Total Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">+3 new projects this period</p>
            </CardContent>
          </Card>
        </div>

        {/* Storage Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Storage Breakdown</CardTitle>
            <CardDescription>Distribution of storage usage by file type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Image className="h-4 w-4 text-muted-foreground" />
                  <span>Images</span>
                </div>
                <span className="font-medium">450 GB (57%)</span>
              </div>
              <Progress value={57} className="h-2" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <span>Videos</span>
                </div>
                <span className="font-medium">200 GB (25%)</span>
              </div>
              <Progress value={25} className="h-2" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  <span>Other</span>
                </div>
                <span className="font-medium">139 GB (18%)</span>
              </div>
              <Progress value={18} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Project Types and Browsers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Types */}
          <Card>
            <CardHeader>
              <CardTitle>Project Types</CardTitle>
              <CardDescription>Distribution of projects by framework</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Next.js', count: 20, percentage: 48 },
                  { name: 'React', count: 15, percentage: 36 },
                  { name: 'Svelte', count: 7, percentage: 16 },
                ].map((project) => (
                  <div key={project.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>{project.name}</span>
                      <span className="font-medium">{project.count} ({project.percentage}%)</span>
                    </div>
                    <Progress value={project.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Browsers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Browsers</CardTitle>
              <CardDescription>Most common browsers accessing your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Chrome', percentage: 60 },
                  { name: 'Firefox', percentage: 20 },
                  { name: 'Safari', percentage: 15 },
                  { name: 'Edge', percentage: 5 },
                ].map((browser) => (
                  <div key={browser.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{browser.name}</span>
                      </div>
                      <span className="font-medium">{browser.percentage}%</span>
                    </div>
                    <Progress value={browser.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Usage Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cpu">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cpu">CPU Usage</TabsTrigger>
                <TabsTrigger value="storage">Storage</TabsTrigger>
                <TabsTrigger value="bandwidth">Bandwidth</TabsTrigger>
              </TabsList>
              <TabsContent value="cpu" className="space-y-4">
                <h4 className="text-sm font-semibold mt-4">Top CPU Consuming Projects</h4>
                <div className="space-y-2">
                  {['Project A', 'Project B', 'Project C', 'Project D', 'Project E'].map((project, index) => (
                    <div key={project} className="flex justify-between items-center">
                      <span className="text-sm">{project}</span>
                      <span className="text-sm text-muted-foreground">{100 - index * 15} hours</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="storage" className="space-y-4">
                <h4 className="text-sm font-semibold mt-4">Top Storage Consuming Projects</h4>
                <div className="space-y-2">
                  {['Project X', 'Project Y', 'Project Z', 'Project W', 'Project V'].map((project, index) => (
                    <div key={project} className="flex justify-between items-center">
                      <span className="text-sm">{project}</span>
                      <span className="text-sm text-muted-foreground">{200 - index * 30} GB</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="bandwidth" className="space-y-4">
                <h4 className="text-sm font-semibold mt-4">Top Bandwidth Consuming Projects</h4>
                <div className="space-y-2">
                  {['Project M', 'Project N', 'Project O', 'Project P', 'Project Q'].map((project, index) => (
                    <div key={project} className="flex justify-between items-center">
                      <span className="text-sm">{project}</span>
                      <span className="text-sm text-muted-foreground">{500 - index * 75} GB</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}