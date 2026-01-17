import React from "react";
import axios from "axios";
import { Clock, CheckCircle2, Circle, User, Folder } from "lucide-react";
const TaskCard = ({ task, onStatusChange }) => {
  const handleChangeStatus = async (newStatus) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.patch(
      `https://trellobackend-8chn.onrender.com/api/tasks/${task._id}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    onStatusChange(res.data);
  } catch (err) {
    console.error("Error updating task:", err.response?.data || err.message);
  }
};


  const statusColors = {
    'Todo': 'bg-slate-50 border-slate-200',
    'In Progress': 'bg-amber-50 border-amber-200',
    'Done': 'bg-emerald-50 border-emerald-200'
  };

  const StatusIcon = {
    'Todo': Circle,
    'In Progress': Clock,
    'Done': CheckCircle2
  }[task.status];

  return (
    <div className={`${statusColors[task.status]} border rounded-xl p-4 mb-3 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer group`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-sm leading-snug pr-2">
          {task.title}
        </h3>
        <StatusIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
      </div>
      
      {task.description && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}
      
      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          <span>{task.assignedTo?.name || 'Unassigned'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Folder className="w-3.5 h-3.5" />
          <span>{task.projectId?.title || 'No Project'}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        {task.status !== "Todo" && (
          <button 
            onClick={() => handleChangeStatus("Todo")}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
          >
            To Do
          </button>
        )}
        {task.status !== "In Progress" && (
          <button 
            onClick={() => handleChangeStatus("In Progress")}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-amber-200 hover:border-amber-300 hover:bg-amber-50 transition-colors"
          >
            Progress
          </button>
        )}
        {task.status !== "Done" && (
          <button 
            onClick={() => handleChangeStatus("Done")}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;