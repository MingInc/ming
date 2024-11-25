import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, CreditCard, Key, Lock, Menu, User } from "lucide-react";
import {  useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@/hooks";

// Define the type for navigation item
type NavigationItem = {
  id: string;
  label: string;
  icon: React.ComponentType;
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate()
  const {authState} = useAuth()
  const { user } = useUser(authState?.user?.id)

  console.log("user :",user)

  useEffect(() => {
    const storedActiveSection = localStorage.getItem("activeSection");
    if (storedActiveSection) {
      setActiveSection(storedActiveSection);
    }
  },[])

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  // useEffect(() => {
  //   setActiveSection("account")
  // },[location])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const navigationItems : NavigationItem[] = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "api", label: "API", icon: Key },
  ];

  const renderNavigation = () => (
    <nav className="space-y-2">
      {navigationItems.map((item) => (
        <Button
          key={item.id}
          variant={activeSection === item.id ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveSection(item.id)}
        >
          {/* className="mr-2 h-4 w-4" */}
          <item.icon  />
          {item.label}
        </Button>
      ))}
    </nav>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Manage your account details and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        );
      case "security":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account's security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account.
                  </p>
                </div>
                <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        );
      case "notifications":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email.
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Notification Types</Label>
                <div className="space-y-2">
                  {["Security Alerts", "Product Updates", "Newsletter"].map(
                    (item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Switch id={item.toLowerCase().replace(" ", "-")} />
                        <Label htmlFor={item.toLowerCase().replace(" ", "-")}>
                          {item}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        );
      case "billing":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage your billing details and view invoices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Plan</Label>
                <p className="text-sm font-medium">Pro Plan ($19/month)</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <p className="text-sm font-medium">Visa ending in 1234</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Billing Cycle</Label>
                <p className="text-sm font-medium">
                  Next billing date: July 1, 2023
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/dashboard/billing")} >View Invoices</Button>
              {
                user && user[0]?.premium === false && (
                  <Button onClick={() => navigate("/pricing")}>Upgrade Plan</Button>
                )
              }
            </CardFooter>
          </Card>
        );
      case "api":
        return (
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>
                Manage your API keys and access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex items-center space-x-2">
                  <Input value="••••••••••••••••" readOnly />
                  <Button variant="outline">Copy</Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>API Usage</Label>
                <p className="text-sm font-medium">
                  1,234 / 10,000 requests this month
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Generate New API Key</Button>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-sm">Manage your account settings and preferences here.</p>
        </div>
        {isSmallScreen && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">{renderNavigation()}</SheetContent>
          </Sheet>
        )}
      </div>
      <div className="flex flex-col md:flex-row">
        {!isSmallScreen && (
          <aside className="w-64 mr-8 mb-8 md:mb-0">{renderNavigation()}</aside>
        )}
        <main className="flex-1">{renderContent()}</main>
      </div>
    </div>
  );
}
