import React, { useEffect, useState, useCallback } from "react";
import TaskColumn from "./TaskColumn";
import { getTasks } from "../api/taskApi";
import CreateTaskModal from "./CreateTaskModal";
import axios from "axios";
import { Plus } from "lucide-react";

const TaskBoard = ({ filterProjectId, filterUserId }) => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    const data = await getTasks(filterProjectId, filterUserId);
    setTasks(data);
    setLoading(false);
  }, [filterProjectId, filterUserId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Now fetchTasks is stable and can be in dependencies

  useEffect(() => {
    // fetch projects and users for dropdowns
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchProjects();
    fetchUsers();
  }, []);

  const handleTaskCreated = (task) => {
    setTasks(prev => [...prev, task]);
  };

  const handleStatusChange = (updatedTask) => {
    setTasks(prev =>
      prev.map(task => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const todoTasks = tasks.filter((task) => task.status === "Todo");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Task Board</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track your team's progress
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {showModal && (
        <CreateTaskModal
          projects={projects}
          users={users}
          onTaskCreated={handleTaskCreated}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="flex gap-6 overflow-x-auto pb-4">
        <TaskColumn 
          title="Todo" 
          tasks={todoTasks} 
          onStatusChange={handleStatusChange}
        />
        <TaskColumn 
          title="In Progress" 
          tasks={inProgressTasks} 
          onStatusChange={handleStatusChange}
        />
        <TaskColumn 
          title="Done" 
          tasks={doneTasks} 
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default TaskBoard;