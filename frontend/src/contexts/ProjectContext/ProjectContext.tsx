import { createContext, useReducer, useContext, ReactNode, Dispatch } from "react";
import { projectReducer, ProjectState, ProjectActions } from "./ProjectReducer.ts";

// Initial state for the project context
const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

// Create the ProjectContext
const ProjectContext = createContext<{
  projectState: ProjectState;
  projectDispatch: Dispatch<ProjectActions>;
}>({
  projectState: initialState,
  projectDispatch: () => undefined,
});

// Custom hook to use the ProjectContext
export const useProjectContext = () => {
  return useContext(ProjectContext);
};

// Provider component to wrap around your app
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectState, projectDispatch] = useReducer(projectReducer, initialState);

  return (
    <ProjectContext.Provider value={{ projectState, projectDispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
