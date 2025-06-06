import React, { useState } from "react";

const CARD_WIDTH = "w-[350px]";
const CARD_HEIGHT = "h-[200px]";

const AcceptTask = ({ data, updateTaskStatus }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={`bg-yellow-100 p-6 rounded-lg shadow-lg flex flex-col cursor-pointer ${CARD_WIDTH} ${CARD_HEIGHT}`}
        style={{ maxWidth: 400, minWidth: 300 }}
        onClick={() => setShowModal(true)}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="bg-yellow-300 text-yellow-900 px-4 py-1 rounded-full text-sm font-medium">
            {data.category}
          </span>
          <span className="text-sm text-gray-600">
            {data.dueDate ? new Date(data.dueDate).toLocaleDateString() : ""}
          </span>
        </div>
        <h3
          className="text-xl font-semibold text-gray-800 mb-2 truncate"
          title={data.heading}
          style={{ maxWidth: "100%" }}
        >
          {data.heading}
        </h3>
        <div className="flex justify-between gap-4 mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateTaskStatus(data._id, "completed");
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm w-full transition ease-in-out duration-200"
          >
            Mark as Completed
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateTaskStatus(data._id, "failed");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm w-full transition ease-in-out duration-200"
          >
            Mark as Failed
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-2">{data.heading}</h2>
            <div className="task-description" dangerouslySetInnerHTML={{ __html: data.description }} />
            <div className="mt-2 text-sm">
              <b>Deadline:</b>{" "};, m[=      ]
              {data.dueDate ? new Date(data.dueDate).toLocaleString() : "N/A"}
            </div>
            <div className="flex gap-4 mt-6">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AcceptTask;
