import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { fetchProjects } from "@/contexts/ProjectContext/ProjectActions";
import { useProjectContext } from "@/contexts/ProjectContext/ProjectContext";
import ProjectCard from "@/components/ProjectCard";
import TemplatesPage from "./Boilerplates";
import AccountUsageDashboard from "./AccountUsageAndAnalytics";
import SupportCenter from "./support-center";
import SettingsPage from "./settings";
import IPFSStorage from "./storage";

export default function Dashboard() {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { projectState, projectDispatch } = useProjectContext();
  const [activeTab, setActiveTab] = useState("/dashboard");

  const handleActiveTab = (e: string) => {
    setActiveTab(e);
    localStorage.setItem("ming_dashboard_active_tab", `/${e}`)
  };

  const RenderChild = () => {
    switch (activeTab) {
      case "/dashboard":
        return <ProjectCard />;
      case "/boilerplates":
        return <TemplatesPage />;

      case "/usage":
        return (
          <div className="bg-white rounded-lg">
            <AccountUsageDashboard />
          </div>
        );
      case "/storage":
        return (
          <div className="bg-white rounded-lg">
            <IPFSStorage />
          </div>
        );
      case "/support":
        return (
          <div className="bg-white rounded-lg">
            <SupportCenter />
          </div>
        );
      case "/settings":
        return (
          <div className="bg-white rounded-lg">
            <SettingsPage />
          </div>
        );
      default:
        return <ProjectCard />;
    }
  };

  useEffect(() => {
    setActiveTab(localStorage.getItem("ming_dashboard_active_tab") || "/dashboard")
  }, [])
  useEffect(() => {
    if (authState.user) {
      fetchProjects(projectDispatch, authState.user.uid);
    }
  }, [authState.user, projectDispatch]);

  if (projectState.error) {
    console.log(projectState.error);
  }

  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
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
              className="shrink-0 outline-none md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
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
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-between">
          <form className="ml-auto flex-1 sm:flex-initial items-center gap-2 border-b-1 flex-row border rounded-md px-2 py-[3px] hidden md:flex">
            <i className="ri-search-line"></i>
            <input
              type="search"
              placeholder="Search projects."
              className="focus:outline-none sm:w-[200px] md:w-[200px] lg:w-[300px] text-sm bg-transparent"
            />
          </form>
          <button
            className="text-sm px-3 bg-gray-700 text-white h-8 rounded-lg cursor-pointer font-medium"
            onClick={() => navigate("/create-new")}
          >
            ⚡ Add New 
          </button>
        </div>
      </header>
      <main className="mx-[5vw] py-3">
        <RenderChild />
      </main>
    </div>
  );
}
