"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search } from "lucide-react";
import { useGitHubRepos } from "@/hooks/useGithubRepositories.hooks";
import { useNavigate } from "react-router-dom";

type Template = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  githubUrl: string;
  framework: string;
  fullname: string
  owner:{
    avatar_url: string
    login: string
  },
  name: string
  defaultBranch: string
};


const categories = [
  "All",
  "Next.js",
  "React",
  // "Vue",
  // "Nuxt",
  // "Static Sites",
  // "API",
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { repos } = useGitHubRepos(['next.js', 'react']);
  const navigate = useNavigate()
  // const {repos} = useGitHubRepos("next.js")

  console.log("next js repos :",repos)

  useEffect(() => {
    if (repos.length > 0) {
      const formattedRepos = repos.map(repo => ({
        id: repo.id,
        title: repo.name,
        description: repo.description || "No description available",
        category: repo.category, // Use category from useGitHubRepos
        githubUrl: repo.html_url, // Assuming you want to link to the repo
        image: repo.owner.avatar_url, // Use owner avatar or repo image
        framework: repo.category,
        name: repo.name,
        owner: repo.owner,
        fullname: repo.full_name,
        defaultBranch:  repo.default_branch
      }));
      setTemplates(formattedRepos);
      setLoading(false);
    }
  }, [repos]);

  const filteredTemplates = templates.filter(
    (template) =>
      (activeCategory === "All" || template.category === activeCategory.toLowerCase()) &&
      template.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setIsDrawerOpen(false);
  };

  const CategoriesList = () => (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold mb-2">Categories</h2>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => handleCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">📦 Boilerplates</h2>
          <p className="text-sm">
            Jumpstart your app development process with pre-built solutions from
            Ming and our community.
          </p>
        </div>
      </div>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden w-full mb-2">
            🗃️ Filter Categories
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <div className="mt-2">
            <CategoriesList />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/5 hidden md:block">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground text-sm" />
              <Input
                type="search"
                placeholder="Search templates..."
                className="pl-8 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <CategoriesList />
        </div>

        <div className="w-full md:w-3/4">
          <div className="mb-6 md:hidden">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search templates..."
                className="pl-8 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <Skeleton className="h-4 w-2/3" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-[100px] w-full mb-4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3 mt-2" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-8 w-24" />
                      </CardFooter>
                    </Card>
                  ))
              : filteredTemplates.map((template) => {
                const handleUseTemplate = () => {
                  const repoSrcUrl = template.githubUrl;
                  const fullName = template.fullname;
                  const owner = template.owner.login;
                  const defaultBranch = template.defaultBranch;
                  const name = template.name;
                  navigate(
                    `/new?s=${encodeURIComponent(
                      repoSrcUrl
                    )}&name=${name}&fullname=${fullName}&owner=${owner}&default_branch=${defaultBranch}`
                  );
                };
                return (
                <Card className="overflow-hidden" key={template.id}>
                  <img
                    src={template.owner.avatar_url}
                    alt={template.name}
                    className="w-full h-[180px] object-cover rounded"
                  />
                  <div className="p-3 px-4">
                    <p className="text-md font-semibold">{template.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {`${template.description}`.slice(0,80)}{`...`}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pb-2 px-4 text-sm">
                    <div className="bg-black text-white px-1 rounded text-sm">
                      {template.category}
                    </div>
                    <button className="px-2 py-1 rounded-md font-medium border-2" onClick={handleUseTemplate}>
                      Use Template
                    </button>
                  </div>
                </Card>
                )
              })}
              
          </div>
        </div>
      </div>
    </div>
  );
}
