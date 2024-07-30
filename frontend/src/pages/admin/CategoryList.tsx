import React from "react";

function CategoryTable() {
  return (
    <div className="mt-4 w-full">
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">No</th>
            <th className="py-2 px-4">Cat Id</th>
            <th className="py-2 px-4">Category Image</th>
            <th className="py-2 px-4">Category Name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4">1</td>
            <td className="py-2 px-4">784365</td>
            <td className="py-2 px-4">
              <img src="https://via.placeholder.com/50" alt="Category" />
            </td>
            <td className="py-2 px-4">Technology</td>
            <td className="py-2 px-4">web development...</td>
            <td className="py-2 px-4">
              <button className="px-2 py-1 bg-green-500 text-white rounded mr-2">
                Edit
              </button>
              <button className="px-2 py-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4">2</td>
            <td className="py-2 px-4">784365</td>
            <td className="py-2 px-4">
              <img src="https://via.placeholder.com/50" alt="Category" />
            </td>
            <td className="py-2 px-4">Technology</td>
            <td className="py-2 px-4">web development...</td>
            <td className="py-2 px-4">
              <button className="px-2 py-1 bg-green-500 text-white rounded mr-2">
                Edit
              </button>
              <button className="px-2 py-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;
