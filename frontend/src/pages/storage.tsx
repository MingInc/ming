import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  
  File,
  Folder,
  Plus,
  Search,
  Upload,
} from "lucide-react";

type IPFSFile = {
  cid: string;
  name: string;
  size: string;
  type: "file" | "directory";
  pinned: boolean;
};

export default function IPFSStorage() {
  const [files, setFiles] = useState<IPFSFile[]>([
    {
      cid: "QmX...",
      name: "my-file.txt",
      size: "1.2 KB",
      type: "file",
      pinned: true,
    },
    {
      cid: "QmY...",
      name: "images",
      size: "15 MB",
      type: "directory",
      pinned: false,
    },
    {
      cid: "QmZ...",
      name: "data.json",
      size: "4.7 KB",
      type: "file",
      pinned: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.cid.includes(searchTerm)
  );

  const togglePin = (cid: string) => {
    setFiles(
      files.map((file) =>
        file.cid === cid ? { ...file, pinned: !file.pinned } : file
      )
    );
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Storage</h1>
          <p>Manage your storage and view storage-related information here.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add by CID
          </Button>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Storage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">23.7 GB</p>
              <p className="text-sm text-muted-foreground">
                Total Storage Used
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">142</p>
              <p className="text-sm text-muted-foreground">Pinned Items</p>
            </div>
            <div>
              <p className="text-2xl font-bold">3.2 GB</p>
              <p className="text-sm text-muted-foreground">Bandwidth Used</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or CID"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pinned">Pinned</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>CID</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Pinned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow key={file.cid}>
                  <TableCell className="font-medium">
                    {file.type === "directory" ? (
                      <Folder className="inline mr-2 h-4 w-4" />
                    ) : (
                      <File className="inline mr-2 h-4 w-4" />
                    )}
                    {file.name}
                  </TableCell>
                  <TableCell>{file.cid}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        file.type === "directory" ? "secondary" : "default"
                      }
                    >
                      {file.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={file.pinned}
                      onCheckedChange={() => togglePin(file.cid)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Node Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Peer ID:</span>
              <span className="font-mono">QmYourPeerID...</span>
            </div>
            <div className="flex justify-between">
              <span>Connected Peers:</span>
              <span>23</span>
            </div>
            <div className="flex justify-between">
              <span>IPFS Version:</span>
              <span>0.12.0</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
