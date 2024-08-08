import React from 'react';
import { Link } from '@tanstack/react-router';

const Sidebar: React.FC = () => {
  return (
    <div className="w-60 bg-gray-800 text-white h-full">
      <ul>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/monitor" className="block">
            Home
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/dashboard" className="block">
            Dashboard
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/servicemap" className="block">
            Service Map
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/about" className="block">
            About
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/login" className="block">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
