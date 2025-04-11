// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaExchangeAlt, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 h-screen p-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text mb-8">
        PCEX Admin
      </h2>
      <nav className="space-y-2">
        <Link
          to="/admin"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition"
        >
          <FaTachometerAlt className="text-xl" />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/admin/users"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition"
        >
          <FaUsers className="text-xl" />
          <span>Manage Users</span>
        </Link>
        <Link
          to="/admin/transactions"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition"
        >
          <FaExchangeAlt className="text-xl" />
          <span>Transactions</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;