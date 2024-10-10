import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Globe, Layout, Smartphone } from "lucide-react"

export default function UsageDashboard() {
  const [timePeriod, setTimePeriod] = useState('7d')

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-bold">project-name.vercel.app</h1>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main stats */}
        <Card>
          <CardHeader>
            <CardTitle>Total Requests</CardTitle>
            <CardDescription>Total number of requests in the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,234,567</p>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Requests Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] sm:h-[300px] flex items-end space-x-2">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="bg-blue-500 w-full"
                  style={{ height: `${Math.random() * 100}%` }}
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top Paths */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Paths</CardTitle>
              <Layout className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['/api/users', '/home', '/about', '/contact', '/products'].map((path, index) => (
                  <div key={path} className="flex justify-between">
                    <span className="text-sm">{path}</span>
                    <span className="text-sm text-muted-foreground">{1000 - index * 100}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Browsers */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Browsers</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['Chrome', 'Firefox', 'Safari', 'Edge', 'Others'].map((browser, index) => (
                  <div key={browser} className="flex justify-between">
                    <span className="text-sm">{browser}</span>
                    <span className="text-sm text-muted-foreground">{50 - index * 10}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status Codes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status Codes</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['200', '301', '404', '500'].map((code, index) => (
                  <div key={code} className="flex justify-between">
                    <span className="text-sm">{code}</span>
                    <span className="text-sm text-muted-foreground">{10000 - index * 2000}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}