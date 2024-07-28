// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow">
            <div className="text-xl font-bold">NextStep</div>
            <div className="flex items-center space-x-4">
                <input type="text" className="border p-2 rounded" placeholder="Search..." />
                <button className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </button>
                <div className="flex items-center space-x-2">
                    <span>Anika</span>
                    <img src="https://via.placeholder.com/150" alt="User avatar" className="h-8 w-8 rounded-full" />
                </div>
            </div>
        </header>
    );
};

export default Header;
