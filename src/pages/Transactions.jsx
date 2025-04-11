// src/pages/Transactions.jsx
import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import Sidebar from '../components/Sidebar';
import { FaExchangeAlt, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const Transactions = ({ setTheme, theme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <Sidebar />
      </div>
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <AdminHeader toggleSidebar={toggleSidebar} setTheme={setTheme} theme={theme} />
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-8">Transactions</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <FaExchangeAlt className="text-yellow-400" />
              <span>Transaction History</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400">
                    <th className="p-4">User</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700 hover:bg-gray-700 transition">
                    <td className="p-4 text-white">Kings</td>
                    <td className="p-4 text-white">Recharge</td>
                    <td className="p-4 text-white">$100</td>
                    <td className="p-4 text-white">Apr 7, 2025</td>
                    <td className="p-4 text-green-500 flex items-center space-x-1">
                      <FaCheckCircle />
                      <span>Completed</span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-700 hover:bg-gray-700 transition">
                    <td className="p-4 text-white">Jeff</td>
                    <td className="p-4 text-white">Withdraw</td>
                    <td className="p-4 text-white">$50</td>
                    <td className="p-4 text-white">Apr 6, 2025</td>
                    <td className="p-4 text-yellow-400 flex items-center space-x-1">
                      <FaHourglassHalf />
                      <span>Pending</span>
                    </td>
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

export default Transactions;