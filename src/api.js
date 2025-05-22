import axios from "axios";

// base URL may be set via VITE_ENV or package.json proxy
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});

export const assignTask = (task) => API.post("/api/tasks/assign", task);

export const fetchEmployeeTasks = async (employeeId) => {
  try {
    const response = await axios.get(`/api/tasks/employee/${employeeId}`);
    return response.data; // Return the fetched tasks
  } catch (error) {
    console.error("Error fetching employee tasks:", error);
    return [];
  }
};

export const updateTaskStatus = (taskId, status) =>
  API.put(`/api/tasks/${taskId}/status`, { status });
