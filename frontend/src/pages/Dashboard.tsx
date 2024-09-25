import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { fetchProjects } from "@/contexts/ProjectContext/ProjectActions";
import { useProjectContext } from "@/contexts/ProjectContext/ProjectContext";
import ProjectCard from "@/components/ProjectCard";
import TemplatesPage from "./Boilerplates";

export default function Dashboard() {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { projectState, projectDispatch } = useProjectContext();
  const [activeTab, setActiveTab] = useState("/dashboard");

  const handleActiveTab = (e: string) => {
    setActiveTab(e);
  };

  const RenderChild = () => {
    switch (activeTab) {
      case "/dashboard":
        return <ProjectCard />;
      case "/boilerplates":
        return (
          <TemplatesPage/>
        );
      case "/usage":
        return (
          <div className="bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Usage Statistics</h2>
            <p>Here you can view your usage statistics and analytics.</p>
            {/* Add more usage-related components or data visualization here */}
          </div>
        );
      case "/storage":
        return (
          <div className="bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Storage Management</h2>
            <p>
              Manage your storage and view storage-related information here.
            </p>
            {/* Add storage management components or information here */}
          </div>
        );
      case "/support":
        return (
          <div className="bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Support Center</h2>
            <p>Need help? Contact our support team or browse through FAQs.</p>
            {/* Add support-related components, contact forms, or FAQs here */}
          </div>
        );
      case "/settings":
        return (
          <div className="bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
            <p>Manage your account settings and preferences here.</p>
            {/* Add settings forms or components here */}
          </div>
        );
      default:
        return <ProjectCard />;
    }
  };

  useEffect(() => {
    if (authState.user) {
      fetchProjects(projectDispatch, authState.user.uid);
    }
  }, [authState.user, projectDispatch]);

  if (projectState.error) {
    console.log(projectState.error);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6 mx-[4vw]">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <p
            onClick={() => handleActiveTab("/dashboard")}
            className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
          >
            <i className="ri-box-3-line"></i> Overview
          </p>
          <p
            onClick={() => handleActiveTab("/boilerplates")}
            className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
          >
            <i className="ri-archive-2-line"></i>Boilerplates
          </p>
          <p
            onClick={() => handleActiveTab("/usage")}
            className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
          >
            <i className="ri-line-chart-line"></i>Usage
          </p>
          <p
            onClick={() => handleActiveTab("/storage")}
            className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
          >
            <i className="ri-hard-drive-3-line"></i> Storage
          </p>
          <p
            onClick={() => handleActiveTab("/support")}
            className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
          >
            <i className="ri-customer-service-line"></i> Support
          </p>
          <p
            onClick={() => handleActiveTab("/settings")}
            className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
          >
            <i className="ri-settings-4-line"></i> Settings
          </p>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <p
                onClick={() => handleActiveTab("/dashboard")}
                className="cursor-pointer hover:text-foreground"
              >
                <i className="ri-box-3-line"></i> Overview
              </p>
              <p
                onClick={() => handleActiveTab("/boilerplates")}
                className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
              >
                <i className="ri-archive-2-line"></i>Boilerplates
              </p>
              <p
                onClick={() => handleActiveTab("/usage")}
                className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
              >
                <i className="ri-line-chart-line"></i>Usage
              </p>
              <p
                onClick={() => handleActiveTab("/storage")}
                className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
              >
                <i className="ri-hard-drive-3-line"></i> Storage
              </p>
              <p
                onClick={() => handleActiveTab("/support")}
                className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
              >
                <i className="ri-customer-service-line"></i> Support
              </p>
              <p
                onClick={() => handleActiveTab("/settings")}
                className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
              >
                <i className="ri-settings-4-line"></i> Settings
              </p>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <button
            className="text-sm bg-black px-3 text-white h-10 rounded-sm cursor-pointer"
            onClick={() => navigate("/create-new")}
          >
            <i className="ri-add-line"></i> Add New
          </button>
        </div>
      </header>
      <main className="mx-[5vw] py-3">
        <RenderChild />
      </main>
    </div>
  );
}
