import React from 'react';

const AcceptTask = ({ data }) => {
  return (
    <div className="min-w-[300px] bg-yellow-100 p-6 rounded-lg shadow-lg transition transform hover:scale-105">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-yellow-300 text-yellow-900 px-4 py-1 rounded-full text-sm font-medium">
          {data.category}
        </span>
        <span className="text-sm text-gray-600">{data.taskDate}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{data.taskTitle}</h3>
      <p className="text-sm text-gray-700 mb-4">{data.taskDescription}</p>
      <div className="flex justify-between gap-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm w-full transition ease-in-out duration-200">
          Mark as Completed
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm w-full transition ease-in-out duration-200">
          Mark as Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
