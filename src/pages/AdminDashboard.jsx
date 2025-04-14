// src/pages/AdminDashboard.jsx
import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import Sidebar from '../components/Sidebar';
import { FaUsers, FaExchangeAlt, FaClock } from 'react-icons/fa';

const AdminDashboard = ({ setTheme, theme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden bg-gray-900`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-6' : 'ml-0'
        }`} // Added ml-6 when sidebar is open to match gap-6
      >
        <AdminHeader toggleSidebar={toggleSidebar} setTheme={setTheme} theme={theme} />
        <div className="p-8 pl-0">
          <h2 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h2>
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <FaClock className="text-yellow-400" />
              <span>Quick Stats</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex items-center space-x-3 mb-4">
                  <FaUsers className="text-yellow-400 text-3xl" />
                  <h4 className="text-lg font-medium text-white">Total Users</h4>
                </div>
                <p className="text-3xl font-bold text-white">1,245</p>
                <p className="text-green-500 mt-2">+5%</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex items-center space-x-3 mb-4">
                  <FaExchangeAlt className="text-yellow-400 text-3xl" />
                  <h4 className="text-lg font-medium text-white">Total Transactions</h4>
                </div>
                <p className="text-3xl font-bold text-white">$12,345</p>
                <p className="text-green-500 mt-2">+3%</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex items-center space-x-3 mb-4">
                  <FaClock className="text-yellow-400 text-3xl" />
                  <h4 className="text-lg font-medium text-white">Pending Approvals</h4>
                </div>
                <p className="text-3xl font-bold text-white">15</p>
                <p className="text-gray-400 mt-2">—%</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <FaExchangeAlt className="text-yellow-400" />
              <span>Recent Activity</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400">
                    <th className="p-4">User</th>
                    <th className="p-4">Action</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700 hover:bg-gray-700 transition">
                    <td className="p-4 text-white">Kings</td>
                    <td className="p-4 text-white">Recharge $100</td>
                    <td className="p-4 text-white">Apr 7, 2024</td>
                  </tr>
                  <tr className="border-t border-gray-700 hover:bg-gray-700 transition">
                    <td className="p-4 text-white">Jeff</td>
                    <td className="p-4 text-white">Withdraw $50</td>
                    <td className="p-4 text-white">Apr 6, 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;