import React from "react";

const TaskListNumbers = ({ data }) => {
  const cards = [
    {
      label: "New Tasks",
      count: data.taskCounts.newTask,
      bg: "bg-blue-500",
      icon: "🆕",
    },
    {
      label: "Completed",
      count: data.taskCounts.completed,
      bg: "bg-green-500",
      icon: "✅",
    },
    {
      label: "Accepted",
      count: data.taskCounts.active,
      bg: "bg-yellow-500",
      icon: "📥",
    },
    {
      label: "Failed",
      count: data.taskCounts.failed,
      bg: "bg-red-500",
      icon: "❌",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-lg shadow-lg text-white ${card.bg} flex items-center justify-between`}
        >
          <div>
            <h2 className="text-3xl font-semibold">{card.count}</h2>
            <p className="text-lg">{card.label}</p>
          </div>
          <div className="text-4xl">{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default TaskListNumbers;
