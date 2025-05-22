import React from "react";

const CompleteTask = ({ data }) => (
  <div className="min-w-[300px] bg-green-100 p-6 rounded-lg shadow-lg flex flex-col gap-2">
    <div className="flex justify-between items-center mb-2">
      <span className="bg-green-300 text-green-900 px-4 py-1 rounded-full text-sm font-medium">
        {data.category}
      </span>
      <span className="text-sm text-gray-600">
        {data.dueDate ? new Date(data.dueDate).toLocaleDateString() : ""}
      </span>
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-1">{data.title}</h3>
    <p className="text-sm text-gray-700 mb-2">{data.description}</p>
    <button className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm w-full">
      Completed
    </button>
  </div>
);

export default CompleteTask;
