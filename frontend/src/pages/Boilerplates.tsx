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
import { Search, Menu } from "lucide-react";

type Template = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  githubUrl: string;
  framework: string;
};

const categories = [
  "All",
  "Next.js",
  "React",
  "Vue",
  "Nuxt",
  "Static Sites",
  "API",
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setTemplates([
        {
          id: "1",
          title: "Next.js Blog",
          description: "A simple blog built with Next.js",
          category: "Next.js",
          githubUrl: "",
          framework: "",
          image:
            "https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F1aHobcZ8H6WY48u5CMXlOe%2F560e6e93ced2d1af6d65cc6e7fbc914d%2FCleanShot_2024-01-12_at_09.png&w=384&q=75&dpl=dpl_BEuzy7pSxPAKh7mVBdP65mKfFSut",
        },
        {
          id: "2",
          title: "React Dashboard",
          description: "Admin dashboard built with React",
          category: "React",
          githubUrl: "",
          framework: "",
          image:
            "https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F3PkqiHFN4mAmCpexoBvb2B%2Fe52a778e2b4320220665c73a3b8a498a%2FCleanShot_2022-12-02_at_10.42.14_2x.png&w=384&q=75&dpl=dpl_BEuzy7pSxPAKh7mVBdP65mKfFSut",
        },
        {
          id: "3",
          title: "Vue Portfolio",
          description: "Personal portfolio site built with Vue",
          category: "Vue",
          githubUrl: "",
          framework: "",
          image:
            "https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F5RZetTd7rd1mQtoZt2fajA%2F747eabb89b6378ecfc0ef433f5e47a01%2FCleanShot_2022-12-02_at_12.07.44.png&w=384&q=75&dpl=dpl_BEuzy7pSxPAKh7mVBdP65mKfFSut",
        },
        {
          id: "4",
          title: "Nuxt E-commerce",
          description: "E-commerce site built with Nuxt",
          category: "Nuxt",
          githubUrl: "",
          framework: "",
          image: "https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F2nVaprBxxTaxjxRGce0aI7%2F18b8c412a5029d61a230edb799017666%2FScreen_Shot_2022-04-13_at_5.45.02_PM.png&w=384&q=75&dpl=dpl_BEuzy7pSxPAKh7mVBdP65mKfFSut",
        },
        {
          id: "5",
          title: "Static Landing Page",
          description: "Simple landing page with HTML/CSS",
          category: "Static Sites",
          githubUrl: "",
          framework: "",
          image: "https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F21vzT1IKJubUkzDHh24icR%2F501689ec5bdb02a068d0f26418fcb52a%2FScreen_Shot_2022-04-13_at_5.28.45_PM.png&w=384&q=75&dpl=dpl_BEuzy7pSxPAKh7mVBdP65mKfFSut",
        },
        {
          id: "6",
          title: "Express API",
          description: "RESTful API built with Express.js",
          category: "API",
          githubUrl: "",
          framework: "",
          image: "https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F5JrY1bdf9CTvLo7WRj4cIC%2F5de59a7d27979a07e24a19e71129b008%2FCleanShot_2022-08-11_at_21.10.28.png&w=384&q=75&dpl=dpl_BEuzy7pSxPAKh7mVBdP65mKfFSut",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const filteredTemplates = templates.filter(
    (template) =>
      (activeCategory === "All" || template.category === activeCategory) &&
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
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">📦 Boilerplates</h2>
          <p className="text-sm">
            Jumpstart your app development process with pre-built solutions from
            Ming and our community.
          </p>
        </div>
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="mt-6">
              <CategoriesList />
            </div>
          </SheetContent>
        </Sheet>
      </div>

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
              : filteredTemplates.map((template) => (
                  <Card className="overflow-hidden" key={template.id}>
                    <img
                      src={template.image}
                      alt={template.title}
                      className="w-full h-[100px] object-cover rounded"
                    />
                    <div className="p-3 px-4">
                      <p className="text-md font-semibold">
                        {template.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pb-2 px-4 text-sm">
                      <div className="bg-black text-white px-1 rounded text-sm">{template.category}</div>
                      <button className="px-2 py-1 rounded-md font-medium border-2">Use Template</button>
                    </div>
                  </Card>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
