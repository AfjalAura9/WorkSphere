import React from "react";

const TaskListNumbers = ({ taskCounts, selectedFilter, setSelectedFilter }) => {
  const cards = [
    {
      label: "New Tasks",
      count: taskCounts.newTask,
      bg: "bg-blue-500",
      icon: "🆕",
      filterKey: "New Tasks",
    },
    {
      label: "Completed",
      count: taskCounts.completed,
      bg: "bg-green-500",
      icon: "✅",
      filterKey: "Completed",
    },
    {
      label: "Accepted",
      count: taskCounts.active,
      bg: "bg-yellow-500",
      icon: "📥",
      filterKey: "Accepted",
    },
    {
      label: "Failed",
      count: taskCounts.failed,
      bg: "bg-red-500",
      icon: "❌",
      filterKey: "Failed",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          onClick={() => setSelectedFilter(card.filterKey)}
          className={`transition transform hover:scale-105 p-6 rounded-lg shadow-lg text-white ${card.bg} flex items-center justify-between cursor-pointer ${
            selectedFilter === card.filterKey
              ? "ring-4 ring-offset-2 ring-white"
              : ""
          }`}
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
