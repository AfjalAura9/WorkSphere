import React from 'react';

const TaskListNumbers = ({ taskCounts, selectedFilter, setSelectedFilter }) => {
  const cards = [
    { key:'new',      label:'New',      icon:'🆕' },
    { key:'active',   label:'Active',   icon:'🚀' },
    { key:'completed',label:'Completed',icon:'✅' },
    { key:'failed',   label:'Failed',   icon:'❌' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map(c => (
        <div
          key={c.key}
          onClick={() => setSelectedFilter(c.key)}
          className={`p-6 rounded-lg shadow-lg cursor-pointer flex justify-between items-center
            ${selectedFilter===c.key ? 'ring-4 ring-offset-2 ring-blue-500' : ''}
            ${c.key==='new'?'bg-blue-500':c.key==='active'?'bg-yellow-500':c.key==='completed'?'bg-green-500':'bg-red-500'} text-white`}
        >
          <div>
            <h2 className="text-3xl font-semibold">{taskCounts[c.key]}</h2>
            <p className="text-lg">{c.label}</p>
          </div>
          <div className="text-4xl">{c.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default TaskListNumbers;
