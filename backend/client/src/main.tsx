// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import LoginButton from "./components/ui/LoginButton";
import LogoutButton from "./components/ui/LogoutButton";
import UserProfile from "./pages/UserProfile";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <div>
      <h1>React Context API with useReducer</h1>
      <LoginButton />
      <LogoutButton />
      <UserProfile />
    </div>
  </AuthProvider>
);
