import React from "react";

const FailedTask = ({ data }) => (
  <div className="min-w-[300px] bg-red-100 p-6 rounded-lg shadow-lg flex flex-col gap-2">
    <div className="flex justify-between items-center mb-2">
      <span className="bg-red-300 text-red-900 px-4 py-1 rounded-full text-sm font-medium">
        {data.category}
      </span>
      <span className="text-sm text-gray-600">
        {data.dueDate ? new Date(data.dueDate).toLocaleDateString() : ""}
      </span>
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-1">{data.title}</h3>
    <p className="text-sm text-gray-700 mb-2">{data.description}</p>
    <button className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm w-full">
      Failed
    </button>
  </div>
);

export default FailedTask;
