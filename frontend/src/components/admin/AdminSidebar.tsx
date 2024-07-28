// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4">
            <Link to="/" className="p-2 hover:bg-gray-700 rounded">Dashboard</Link>
            <Link to="/report" className="p-2 hover:bg-gray-700 rounded">Report</Link>
            <Link to="/users" className="p-2 hover:bg-gray-700 rounded">Users</Link>
            <Link to="/experts" className="p-2 hover:bg-gray-700 rounded">Experts</Link>
            <Link to="/booking-details" className="p-2 hover:bg-gray-700 rounded">Booking Details</Link>
            <Link to="/category" className="p-2 hover:bg-gray-700 rounded">Category</Link>
            <Link to="/sub-category" className="p-2 hover:bg-gray-700 rounded">Sub-Category</Link>
            <Link to="/review-rating" className="p-2 hover:bg-gray-700 rounded">Review & Rating</Link>
            <Link to="/video-call" className="p-2 hover:bg-gray-700 rounded">Video Call</Link>
            <Link to="/faq" className="p-2 hover:bg-gray-700 rounded">FAQ</Link>
            <Link to="/logout" className="p-2 hover:bg-gray-700 rounded">Logout</Link>
        </aside>
    );
};

export default Sidebar;
