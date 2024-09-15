// Action to fetch all projects
export const fetchProjects = async (dispatch: any, userUid: string) => {
  dispatch({ type: "FETCH_PROJECTS_START" });
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_SERVER_URI
      }/api/v1/get-projects?userUid=${userUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );


    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await response.json();
    console.log(data)
    dispatch({ type: "FETCH_PROJECTS_SUCCESS", payload: data.projects });
  } catch (error:any) {
    dispatch({ type: "FETCH_PROJECTS_ERROR", payload: error.message });
  }
};

// Action to add a new project
export const addProject = async (dispatch: any, project: any) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/api/v1/create-project`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      }
    );
    const data = await response.json();
    dispatch({ type: "ADD_PROJECT", payload: data.project });
  } catch (error) {
    dispatch({
      type: "FETCH_PROJECTS_ERROR",
      payload: "Failed to add project",
    });
  }
};

// Action to update a project
export const updateProject = async (dispatch: any, project: any) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/api/v1/update-project`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      }
    );
    const data = await response.json();
    dispatch({ type: "UPDATE_PROJECT", payload: data.project });
  } catch (error) {
    dispatch({
      type: "FETCH_PROJECTS_ERROR",
      payload: "Failed to update project",
    });
  }
};

// Action to delete a project
export const deleteProject = async (dispatch: any, projectId: string) => {
  try {
    await fetch(
      `${import.meta.env.VITE_SERVER_URI}/api/v1/delete-project/${projectId}`,
      {
        method: "DELETE",
      }
    );
    dispatch({ type: "DELETE_PROJECT", payload: projectId });
  } catch (error) {
    dispatch({
      type: "FETCH_PROJECTS_ERROR",
      payload: "Failed to delete project",
    });
  }
};
