
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Cloud,
  CreditCard,
  Github,
  LogOut,
  Mail,
  Menu,
  PlusCircle,
  User,
  UserPlus,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useAuth, useUser } from "@/hooks";
import { Badge } from "./ui";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState, logout } = useAuth();
  const { user } = useUser(authState?.user?.uid)

  const isDashboardRoute =
    location.pathname === "/dashboard" ||
    location.pathname.startsWith("/dashboard");

  const handleLogout = () => {
    localStorage.removeItem("ming_authenticated_user");
    navigate("/");
    logout();
  };

  console.log("auth state user:",authState.user)

  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap py-3 mx-[2vw]">
        <div
          onClick={() => {
            if(authState.isAuthenticated){
              navigate("/dashboard")
            }else{
              navigate("/")
            }
          }}
          className="flex items-center gap-1 cursor-pointer relative"
        >
          <img
            className="w-6"
            src="https://ik.imagekit.io/lexy/Ming/3.png?updatedAt=1724359838994"
            alt="Ming Logo"
          />
          <p className="text-sm font-semibold">Ming</p>
          {
            user && user[0]?.premium && (
              <Badge className=" bg-green-500 absolute -top-[16px] left-10 text-xs" >Pro</Badge>
            )
          }
        </div>
        {authState.isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer border-[2px] rounded-xl py-1 pl-1 pr-2">
                <Avatar className="w-6 object-contain h-6">
                  <AvatarImage src={authState && authState?.user?.avatar_url} />
                  <AvatarFallback>
                    <AvatarImage src="https://images.unsplash.com/photo-1644912325393-cb31907c98f0?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">
                  {(authState && authState?.user?.email.split("@")[0]) ||
                    authState.user.data.email}
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/pricing")}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem> */}
                {/* <DropdownMenuItem>
                <Keyboard className="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem> */}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/* <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Team</span>
              </DropdownMenuItem> */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Invite users</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>Refer Friends</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                {/* <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem> */}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem> */}
              <DropdownMenuItem disabled>
                <Cloud className="mr-2 h-4 w-4" />
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleLogout()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-sm text-white px-2 py-1 rounded-sm font-semibold"
          >
            🔒 Login
          </button>
        )}
      </nav>
      {isDashboardRoute && (
        <div className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <p
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
            >
              <i className="ri-box-3-line"></i> Overview
            </p>
            <p
              onClick={() => navigate("/dashboard/boilerplates")}
              className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
            >
              <i className="ri-archive-2-line"></i>Boilerplates
            </p>
            <p
              onClick={() => navigate("/dashboard/usage")}
              className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
            >
              <i className="ri-line-chart-line"></i>Usage
            </p>
            <p
              onClick={() => navigate("/dashboard/storage")}
              className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
            >
              <i className="ri-hard-drive-3-line"></i> Storage
            </p>
            <p
              onClick={() => navigate("/dashboard/support")}
              className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
            >
              <i className="ri-customer-service-line"></i> Support
            </p>
            <p
              onClick={() => navigate("/dashboard/settings")}
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
                  onClick={() => navigate("/dashboard/boilerplates")}
                  className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
                >
                  <i className="ri-archive-2-line"></i>Boilerplates
                </p>
                <p
                  onClick={() => navigate("/dashboard/usage")}
                  className="cursor-pointer text-foreground transition-colors hover:text-foreground flex items-center gap-1"
                >
                  <i className="ri-line-chart-line"></i>Usage
                </p>
                <p
                  onClick={() => navigate("/dashboard/storage")}
                  className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
                >
                  <i className="ri-hard-drive-3-line"></i> Storage
                </p>
                <p
                  onClick={() => navigate("/dashboard/support")}
                  className="cursor-pointer flex items-center gap-1 text-foreground transition-colors hover:text-foreground"
                >
                  <i className="ri-customer-service-line"></i> Support
                </p>
                <p
                  onClick={() => navigate("/dashboard/settings")}
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
        </div>
      )}
    </header>
  );
}
