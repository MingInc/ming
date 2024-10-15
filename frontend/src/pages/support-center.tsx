import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Search } from "lucide-react"

type Case = {
  id: string
  title: string
  status: 'open' | 'transferred' | 'closed'
  date: string
}

export default function SupportCenter() {
  const [cases, setCases] = useState<Case[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newCaseTitle, setNewCaseTitle] = useState('')
  const [newCaseDescription, setNewCaseDescription] = useState('')

  const filteredCases = cases.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const createNewCase = () => {
    const newCase: Case = {
      id: Math.random().toString(36).substr(2, 9),
      title: newCaseTitle,
      status: 'open',
      date: new Date().toLocaleDateString()
    }
    setCases([...cases, newCase])
    setNewCaseTitle('')
    setNewCaseDescription('')
  }

  return (
    <div className="min-h-screen container">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-2xl">Support Center</CardTitle>
          <CardDescription>
            Create and view support cases for your projects. <a href="#" className="text-blue-500 hover:underline">Learn more</a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create a new case
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Support Case</DialogTitle>
                  <DialogDescription>
                    Provide details about the issue you're experiencing.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newCaseTitle}
                      onChange={(e) => setNewCaseTitle(e.target.value)}
                      placeholder="Brief description of the issue"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newCaseDescription}
                      onChange={(e) => setNewCaseDescription(e.target.value)}
                      placeholder="Provide more details about your issue"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={createNewCase}>Submit Case</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="transferred">Transferred</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
            {['all', 'open', 'transferred', 'closed'].map((status) => (
              <TabsContent key={status} value={status}>
                {filteredCases.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No cases yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Create a new case to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCases
                      .filter(c => status === 'all' || c.status === status)
                      .map(supportCase => (
                        <Card key={supportCase.id}>
                          <CardHeader>
                            <CardTitle>{supportCase.title}</CardTitle>
                            <CardDescription>Case ID: {supportCase.id}</CardDescription>
                          </CardHeader>
                          <CardFooter className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Status: {supportCase.status}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {supportCase.date}
                            </span>
                          </CardFooter>
                        </Card>
                      ))
                    }
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}