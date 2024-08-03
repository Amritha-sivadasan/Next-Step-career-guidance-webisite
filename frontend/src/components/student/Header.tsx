import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
