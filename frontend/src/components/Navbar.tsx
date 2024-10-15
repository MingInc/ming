// eslint-disable-next-line no-use-before-define
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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
  PlusCircle,
  User,
  UserPlus,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("ming_authenticated_user");
    navigate("/");
    logout();
  };

  return (
    <nav className="flex items-center justify-between flex-wrap py-3 mx-[2vw]">
      <div
        onClick={() => {
          localStorage.setItem("ming_dashboard_active_tab", `/dashboard`);

          navigate("/");
        }}
        className="flex items-center gap-1 cursor-pointer"
      >
        <img
          className="w-6"
          src="https://ik.imagekit.io/lexy/Ming/3.png?updatedAt=1724359838994"
          alt="Ming Logo"
        />
        <p className="text-sm font-semibold">Ming</p>
      </div>
      {authState.isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-1 cursor-pointer border-[2px] rounded-xl py-1 pl-1 pr-2">
              <Avatar className="w-6 object-contain h-6">
                <AvatarImage src={authState && authState?.user?.photoURL} />
                <AvatarFallback>
                  <AvatarImage src="https://images.unsplash.com/photo-1644912325393-cb31907c98f0?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </AvatarFallback>
              </Avatar>
              <p className="text-sm">
                {authState && authState?.user?.email.split("@")[0]}
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
  );
}
