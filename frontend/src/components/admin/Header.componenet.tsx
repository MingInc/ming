import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <p
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
        >
          <i className="ri-box-3-line"></i> Overview
        </p>
        <p
          onClick={() => navigate("boilerplates")}
          className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
        >
          <i className="ri-archive-2-line"></i>Boilerplates
        </p>
        <p
          onClick={() => navigate("usage")}
          className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
        >
          <i className="ri-line-chart-line"></i>Usage
        </p>
        <p
          onClick={() => navigate("storage")}
          className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
        >
          <i className="ri-hard-drive-3-line"></i> Storage
        </p>
        <p
          onClick={() => navigate("support")}
          className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
        >
          <i className="ri-customer-service-line"></i> Support
        </p>
        <p
          onClick={() => navigate("settings")}
          className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
        >
          <i className="ri-settings-4-line"></i> Settings
        </p>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex items-center gap-2 bg-gray-200 shrink-0 outline-none md:hidden text-sm px-3 text-black h-8 rounded-lg cursor-pointer font-medium">
            <Menu className="h-5 w-5" /> Open Pages Tabs
            <span className="sr-only">Toggle navigation menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <nav className="grid gap-6 text-lg font-medium">
            <p
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer hover:text-foreground"
            >
              <i className="ri-box-3-line"></i> Overview
            </p>
            <p
              onClick={() => navigate("boilerplates")}
              className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
            >
              <i className="ri-archive-2-line"></i>Boilerplates
            </p>
            <p
              onClick={() => navigate("usage")}
              className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
            >
              <i className="ri-line-chart-line"></i>Usage
            </p>
            <p
              onClick={() => navigate("storage")}
              className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
            >
              <i className="ri-hard-drive-3-line"></i> Storage
            </p>
            <p
              onClick={() => navigate("support")}
              className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
            >
              <i className="ri-customer-service-line"></i> Support
            </p>
            <p
              onClick={() => navigate("settings")}
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
  );
};
