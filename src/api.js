import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});

export const assignTask = (task) => API.post("/api/tasks/assign", task);

export const fetchEmployeeTasks = async (employeeId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/tasks/employee/${employeeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employee tasks:", error);
    return [];
  }
};

export const updateTaskStatus = (taskId, status) =>
  API.put(`/api/tasks/${taskId}/status`, { status });
