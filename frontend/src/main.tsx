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
import Projects from "./pages/Projects";

import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
import CurrentBuild from "./pages/CurrentBuild";

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
      <Layout>
        <Dashboard />
      </Layout>
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
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
    <Toaster />
    <Analytics />
    <SpeedInsights />
  </AuthProvider>
);
