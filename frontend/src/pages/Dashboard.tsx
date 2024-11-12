import { useEffect } from "react";

import { fetchProjects } from "@/contexts/ProjectContext/ProjectActions";
import { useProjectContext } from "@/contexts/ProjectContext/ProjectContext";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks";

export default function Dashboard() {
  const { authState } = useAuth();
  const { projectState, projectDispatch } = useProjectContext();

  useEffect(() => {
    if (authState.user) {
      fetchProjects(projectDispatch, authState.user.uid);
    }
  }, [authState.user, projectDispatch]);

  if (projectState.error) {
    console.log(projectState.error);
  }

  return (
    <div className="flex w-full flex-col">
      <main className="mx-[5vw] py-3">
        <Outlet />
      </main>
    </div>
  );
}
