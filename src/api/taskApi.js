import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// GET all tasks with optional filters
export const getTasks = async (projectId, assignedTo) => {
  try {
    const params = {};
    if (projectId) params.projectId = projectId;
    if (assignedTo) params.assignedTo = assignedTo;

    const response = await axios.get(API_URL, { params });
    return response.data.tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// CREATE new task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// UPDATE task (status, title, description, etc.)
export const updateTask = async (taskId, updates) => {
  try {
    const response = await axios.patch(`${API_URL}/${taskId}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// DELETE task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};