import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Menu,
  Package2,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Dashboard() {
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isAuthenticated) return navigate("/login");
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6 mx-[4vw]">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Ming</span>
          </a>
          <a
            href="/dashboard"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Overview
          </a>
          {/* <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Orders
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Analytics
          </a> */}
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
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Ming</span>
              </a>
              <a href="/dashboard" className="hover:text-foreground">
                Overview
              </a>
              {/* <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </a> */}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <button className="text-sm bg-black px-3 text-white h-10 rounded-sm cursor-pointer" onClick={() => navigate("/create-new")}><i className="ri-add-line"></i> Add New</button>
        </div>
      </header>
      <main className="mx-[5vw] py-3">
        <p>Projects</p>
      </main>
    </div>
  )
}
