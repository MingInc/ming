import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "remixicon/fonts/remixicon.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/DeployProject";

import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import CurrentBuild from "./pages/CurrentBuild";
import { ProjectProvider } from "./contexts/ProjectContext/ProjectContext";
import ProjectPreview from "./pages/ProjectPreview";
import Pricing from "./pages/Pricing";
import { RepoProvider } from "./contexts/RepoContext";
import NewProject from "./components/NewProject.component";
import TemplatesPage from "./pages/Boilerplates";
import AccountUsageDashboard from "./pages/AccountUsageAndAnalytics";
import IPFSStorage from "./pages/storage";
import SupportCenter from "./pages/support-center";
import SettingsPage from "./pages/settings";
import DeployedProjects from "./components/ProjectCard";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children:[
      {
        index:true,
        element: <Home />
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path: "/create-new",
        element: (
          // <ProtectedRoute redirectPath="/login">
              <Projects />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/new",
        element: (
            <NewProject />
        ),
      },
      {
        path: "/build",
        element: (
            <CurrentBuild />
        ),
      },
      {
        path: "/pricing",
        element: (
            <Pricing />
        ),
      },
      {
        path: "/preview",
        element: (
            <ProjectPreview />
        ),
      },
      {
        path: "/dashboard",
        element: (
          // <ProtectedRoute redirectPath="/login">
            <Dashboard />
          // </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DeployedProjects />
          },
          {
            path: "boilerplates",
            element: <TemplatesPage />,
          },
          {
            path: "usage",
            element: <AccountUsageDashboard />,
          },
          {
            path: "storage",
            element: <IPFSStorage />,
          },
          {
            path: "support",
            element: <SupportCenter />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
        ],
      },
    ]
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RepoProvider>
      <ProjectProvider>
        <RouterProvider router={router} />
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </ProjectProvider>
    </RepoProvider>
  </AuthProvider>
);
