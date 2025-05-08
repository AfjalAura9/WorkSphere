import React from 'react';

const NewTask = ({ data }) => {
  return (
    <div className="min-w-[300px] bg-blue-100 p-6 rounded-lg shadow-lg transition transform hover:scale-105">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-blue-300 text-blue-900 px-4 py-1 rounded-full text-sm font-medium">
          {data.category}
        </span>
        <span className="text-sm text-gray-600">{data.taskDate}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{data.taskTitle}</h3>
      <p className="text-sm text-gray-700 mb-4">{data.taskDescription}</p>
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm w-full transition ease-in-out duration-200">
        Accept Task
      </button>
    </div>
  );
};

export default NewTask;
