import React from 'react';

const UserTaskStats = ({ taskCounts, onStatusClick }) => {
  const cards = [
    {
      label: 'Accepted',
      count: taskCounts.active,
      bg: 'bg-yellow-500',
      icon: '📥',
      status: 'active',
    },
    {
      label: 'Completed',
      count: taskCounts.completed,
      bg: 'bg-green-500',
      icon: '✅',
      status: 'completed',
    },
    {
      label: 'Failed',
      count: taskCounts.failed,
      bg: 'bg-red-500',
      icon: '❌',
      status: 'failed',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-lg shadow-lg text-white ${card.bg} flex items-center justify-between cursor-pointer`}
          onClick={() => onStatusClick(card.status)}
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

export default UserTaskStats;
