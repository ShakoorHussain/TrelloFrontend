import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// REGISTER new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

// LOGIN user
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// LOGOUT user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// GET current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

// CHECK if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};