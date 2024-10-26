// import { StrictMode } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    // children: [
    //   {
    //     path: "team",
    //     element: <Team />,
    //     loader: teamLoader,
    //   },
    // ],
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute redirectPath="/login">
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-new",
    element: (
      <Layout>
        <Projects />
      </Layout>
    ),
  },
  {
    path: "/build",
    element: (
      <Layout>
        <CurrentBuild />
      </Layout>
    ),
  },
  {
    path: "/pricing",
    element: (
      <Layout>
        <Pricing />
      </Layout>
    ),
  },
  {
    path: "/preview",
    element: (
      <Layout>
        <ProjectPreview />
      </Layout>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ProjectProvider>
      <RouterProvider router={router} />
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </ProjectProvider>
  </AuthProvider>
);
