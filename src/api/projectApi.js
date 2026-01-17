import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/projects`;

// GET all projects
export const getProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

// CREATE new project
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_URL, projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

// UPDATE project
export const updateProject = async (projectId, updates) => {
  try {
    const response = await axios.patch(`${API_URL}/${projectId}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// DELETE project
export const deleteProject = async (projectId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};