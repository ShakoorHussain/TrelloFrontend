import React from "react";
import TaskCard from "./TaskCard";
import { Circle } from "lucide-react";

const TaskColumn = ({ title, tasks, onStatusChange }) => {
  const getColumnColor = () => {
    switch(title) {
      case "Todo":
        return { bg: "slate", badge: "bg-slate-100 text-slate-700" };
      case "In Progress":
        return { bg: "amber", badge: "bg-amber-100 text-amber-700" };
      case "Done":
        return { bg: "emerald", badge: "bg-emerald-100 text-emerald-700" };
      default:
        return { bg: "gray", badge: "bg-gray-100 text-gray-700" };
    }
  };

  const colors = getColumnColor();

  return (
    <div className="flex-1 min-w-[320px]">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <span className={`${colors.badge} text-xs font-semibold px-2.5 py-1 rounded-full`}>
            {tasks.length}
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-1 space-y-0 min-h-[400px]">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Circle className="w-12 h-12 mb-3 opacity-20" />
              <p className="text-sm">No tasks yet</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onStatusChange={onStatusChange} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;