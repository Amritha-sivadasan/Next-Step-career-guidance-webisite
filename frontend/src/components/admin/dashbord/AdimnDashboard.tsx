// src/pages/admin/AdminDashboard.tsx
import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <main className="flex-1 p-6 bg-gray-100">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-gray-500">Total Sales</h2>
          <p className="text-2xl font-semibold">₹ 74,000</p>
          <p className="text-red-500">2.5% Down from yesterday</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-gray-500">Completed Session</h2>
          <p className="text-2xl font-semibold">340</p>
          <p className="text-green-500">1.3% Up from yesterday</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-gray-500">Total Experts</h2>
          <p className="text-2xl font-semibold">14,537</p>
          <p className="text-green-500">1.2% Up from past week</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-2xl font-semibold">11,231</p>
          <p className="text-green-500">1.5% Up from past week</p>
        </div>
      </div>
      <div className="mt-6 bg-white p-4 shadow rounded-lg">
        <h2 className="text-gray-500">Sales Details</h2>
        {/* Replace this with a chart component */}
        <div className="h-64">[Chart]</div>
      </div>
      <div className="mt-6 bg-white p-4 shadow rounded-lg">
        <h2 className="text-gray-500">Details</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">No</th>
              <th className="py-2">Expert's Name</th>
              <th className="py-2">Industry</th>
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
              <th className="py-2">Session status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">1</td>
              <td className="py-2">Dr. Anam Rafeeq</td>
              <td className="py-2">Medical</td>
              <td className="py-2">29-07-2024</td>
              <td className="py-2">02:00 (2 Hours)</td>
              <td className="py-2">₹1007</td>
              <td className="py-2">Completed</td>
              <td className="py-2">Pending</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminDashboard;
