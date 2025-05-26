import React, { useEffect, useState, useRef, useContext } from "react";
import Header from "../other/Header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";
import { NotificationContext } from "../../context/NotificationContext";
import axios from "axios";
import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_API_URL;

const EmployeeDashboard = ({ changeUser, data, onTaskUpdated = () => {} }) => {
  if (!data || !data._id) return null;

  const [tasks, setTasks] = useState([]);
  const [taskCounts, setTaskCounts] = useState({
    newTask: 0,
    active: 0,
    completed: 0,
    failed: 0,
  });
  const [filter, setFilter] = useState("All");
  const socketRef = useRef(null);
  const { addNotification } = useContext(NotificationContext);

  const loadEmployeeData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employees/${data._id}`
      );
      const employee = response.data;
      setTasks(employee.tasks);

      const counts = employee.tasks.reduce(
        (acc, task) => {
          acc[task.status] = (acc[task.status] || 0) + 1;
          return acc;
        },
        { newTask: 0, active: 0, completed: 0, failed: 0 }
      );
      setTaskCounts(counts);
    } catch (error) {
      console.error("Failed to fetch employee data:", error);
    }
  };

  useEffect(() => {
    loadEmployeeData();
  }, [data._id]);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.emit("join", data._id);

    socketRef.current.on("taskAssigned", (payload) => {
      if (payload.task.assignedTo === data._id) {
        loadEmployeeData();
        addNotification({
          title: "New Task Assigned",
          message: `Task "${payload.task.title}" has been assigned to you.`,
          time: Date.now(),
        });
      }
    });

    socketRef.current.on("taskEdited", () => {
      loadEmployeeData();
      addNotification({
        title: "Task Updated",
        message: "A task was updated by your admin.",
        time: Date.now(),
      });
    });

    socketRef.current.on("taskDeleted", () => {
      loadEmployeeData();
      addNotification({
        title: "Task Deleted",
        message: "A task was deleted by your admin.",
        time: Date.now(),
      });
    });

    socketRef.current.on("taskReminder", (payload) => {
      addNotification({
        title: "Task Reminder",
        message: payload.message,
        time: Date.now(),
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [data._id]);

  const updateTaskStatus = async (taskId, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}/status`,
        { status }
      );
      await loadEmployeeData();
      if (typeof onTaskUpdated === "function") onTaskUpdated();
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-8">
      <Header changeUser={changeUser} data={data} />
      <TaskListNumbers
        taskCounts={taskCounts}
        selectedFilter={filter}
        setSelectedFilter={setFilter}
      />
      <TaskList
        tasks={tasks}
        selectedFilter={filter}
        updateTaskStatus={updateTaskStatus}
      />
    </div>
  );
};

export default EmployeeDashboard;
