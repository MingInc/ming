  export interface ProjectState {
    projects: any[];
    loading: boolean;
    error: string | null;
  }
  
  export type ProjectActions =
    | { type: "FETCH_PROJECTS_START" }
    | { type: "FETCH_PROJECTS_SUCCESS"; payload: any[] }
    | { type: "FETCH_PROJECTS_ERROR"; payload: string }
    | { type: "ADD_PROJECT"; payload: any }
    | { type: "UPDATE_PROJECT"; payload: any }
    | { type: "DELETE_PROJECT"; payload: string };
  
  export const projectReducer = (state: ProjectState, action: ProjectActions): ProjectState => {
    switch (action.type) {
      case "FETCH_PROJECTS_START":
        return { ...state, loading: true, error: null };
      case "FETCH_PROJECTS_SUCCESS":
        return { ...state, loading: false, projects: action.payload };
      case "FETCH_PROJECTS_ERROR":
        return { ...state, loading: false, error: action.payload };
      case "ADD_PROJECT":
        return { ...state, projects: [...state.projects, action.payload] };
      case "UPDATE_PROJECT":
        return {
          ...state,
          projects: state.projects.map((project) =>
            project._id === action.payload._id ? action.payload : project
          ),
        };
      case "DELETE_PROJECT":
        return {
          ...state,
          projects: state.projects.filter((project) => project._id !== action.payload),
        };
      default:
        return state;
    }
  };
  