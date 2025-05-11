import React from "react";

const CompleteTask = ({ data }) => {
  return (
    <div className="min-w-[300px] bg-green-100 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-green-300 text-green-900 px-4 py-1 rounded-full text-sm font-medium">
          {data.category}
        </span>
        <span className="text-sm text-gray-600">{data.taskDate}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {data.taskTitle}
      </h3>
      <p className="text-sm text-gray-700 mb-4">{data.taskDescription}</p>
      <button className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm w-full">
        Completed
      </button>
    </div>
  );
};

export default CompleteTask;
