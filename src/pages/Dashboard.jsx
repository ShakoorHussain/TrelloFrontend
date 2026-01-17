import React, { useState, useEffect } from "react";
import TaskBoard from "../components/TaskBoard";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";
import axios from "axios";

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://trellobackend-8chn.onrender.com/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://trellobackend-8chn.onrender.com/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchProjects();
    fetchUsers();
  }, []);

  const handleClearFilters = () => {
    setSelectedProject("");
    setSelectedUser("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task Management Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what your team is working on today.
          </p>
        </div>

        <Filters
          projects={projects}
          users={users}
          selectedProject={selectedProject}
          selectedUser={selectedUser}
          onProjectChange={setSelectedProject}
          onUserChange={setSelectedUser}
          onClearFilters={handleClearFilters}
        />
        
        <TaskBoard 
          filterProjectId={selectedProject}
          filterUserId={selectedUser}
        />
      </div>
    </div>
  );
};

export default Dashboard;