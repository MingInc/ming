import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Search } from "lucide-react";
import { useAuth, useFileInput, useSupport } from "@/hooks";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";

export default function SupportCenter() {
  const [support, setSupport] = useState<Component.Ticket[]>([]);
  const [newCaseTitle, setNewCaseTitle] = useState("");
  const [newCaseDescription, setNewCaseDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");  // Declare `searchTerm` state here
  const { authState } = useAuth();
  const { file, handleFileChange, fileName, fileURL, handleRemoveFile } =
    useFileInput();
  const { creating , createCase } = useSupport(support); 
    // Declare filteredCases as a reactive state
    const [filteredCases, setFilteredCases] = useState<Component.Ticket[]>([]);

  // Recalculate filteredCases whenever support or searchTerm is updated
  useEffect(() => {
    // Filter cases based on searchTerm
    setFilteredCases(
      support.filter((ticket) =>
        ticket.ticketInfo?.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [support, searchTerm]); 

  // Fetching the support cases from the server
  const fetchSupport = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/support?id=${authState?.user?.id}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch support tickets");
      }

      const data = await response.json();
      console.log("fetched support :",data)
      setSupport(data?.tickets || []);
    } catch (error) {
      console.error("Error fetching support tickets:", error);
    }
  },[authState?.user?.id]);
  useEffect(() => {
    fetchSupport();
  }, [fetchSupport]); 

  // Function to handle new case creation
  const createNewCase = async () => {
    const formData = new FormData();

    const ticketInfo = {
      title: newCaseTitle,
      description: newCaseDescription,
    };
    formData.append("ticketInfo", JSON.stringify(ticketInfo));
    formData.append("userInfo", authState.user?.id);
    formData.append("status", "open");
    if (file) {
      formData.append("image", file);
    }

    // Call createCase with the formData and handle the response to update the state
     createCase(formData, (newTicket: Component.Ticket) => {
      // Add the new ticket to support state immutably
      setSupport((prev) => [...prev, newTicket]);

      fetchSupport()
    });

    // Clear the form after submitting
    setNewCaseTitle("");
    setNewCaseDescription("");
    handleRemoveFile();
  };

  return (
    <div className="min-h-screen">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-2xl">Support Center</CardTitle>
          <CardDescription>
            Create and view support cases for your projects.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Learn more
            </a>
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
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm here
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
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image</Label>
                    <Input
                      id="image"
                      type="file"
                      onChange={handleFileChange}
                      placeholder="Provide more details about your issue"
                    />
                    {/* Image Preview and Filename Display */}
                    {fileURL && (
                      <div className="relative mt-2 w-40 h-40">
                        <img
                          src={fileURL}
                          alt={fileName || "Selected file"}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute top-1 right-1 px-2 py-1 bg-red-500 text-white rounded-full text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    {fileName && (
                      <input
                        type="text"
                        className={cn(
                          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        value={fileName}
                        readOnly
                      />
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose
                    type="button"
                    disabled={creating}
                    onClick={createNewCase}
                  >
                    Submit Case
                  </DialogClose>
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
            {["all", "open", "transferred", "closed"].map((status) => (
              <TabsContent key={status} value={status}>
                {filteredCases.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No cases yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create a new case to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCases
                      .filter((c) => status === "all" || c.status === status)
                      .reverse()
                      .map((supportCase) => {
                        const date = new Date(String(supportCase?.createdAt));
                        const formattedDate = date.toLocaleString();

                        return (
                          <Card key={supportCase._id}>
                            <CardHeader>
                              <CardTitle>
                                {supportCase.ticketInfo.title}
                              </CardTitle>
                              <CardDescription>
                                Case ID: {supportCase._id}
                              </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Status: {supportCase.status}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {formattedDate}
                              </span>
                            </CardFooter>
                          </Card>
                        );
                      })}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
