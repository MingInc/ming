// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import "remixicon/fonts/remixicon.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";

import { Toaster } from "@/components/ui/toaster";

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
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
    <Toaster />
    <Analytics />
  </AuthProvider>
);
