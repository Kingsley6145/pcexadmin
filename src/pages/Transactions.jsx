// src/pages/Transactions.jsx
import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import Sidebar from '../components/Sidebar';
import { FaExchangeAlt, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import dummyImage from '../assets/dummy.png'; // Import the specific image

const Transactions = ({ setTheme, theme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState(''); // State for selected currency
  const [selectedNetwork, setSelectedNetwork] = useState(''); // State for selected network
  const [pastedAddress, setPastedAddress] = useState(''); // State for the pasted address

  // Transaction history data
  const transactions = [
    { user: 'Kings', type: 'Recharge', amount: '$100', date: 'Apr 7, 2025', status: 'Completed' },
    { user: 'Jeff', type: 'Withdraw', amount: '$50', date: 'Apr 6, 2025', status: 'Pending' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle the Save button click
  const handleSave = () => {
    console.log('Saved Address:', pastedAddress);
    // Add your save functionality here (e.g., API call, download QR code, etc.)
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden bg-gray-900`} // Added bg-gray-900
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-6' : 'ml-0'
        }`} // Updated to ml-6 for 24px gap
      >
        <AdminHeader toggleSidebar={toggleSidebar} setTheme={setTheme} theme={theme} />
        <div className="p-8 pl-0"> {/* Added pl-0 to remove left padding */}
          <h2 className="text-3xl font-bold text-white mb-8">Transactions</h2>

          {/* New Section: Recharge QR Code Generator */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <FaExchangeAlt className="text-yellow-400" />
              <span>Generate Recharge QR Code</span>
            </h3>

            {/* Step 1: Select Currency */}
            <div className="mb-6">
              <h4 className="text-lg text-white mb-2 flex items-center space-x-2">
                <span className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center">
                  1
                </span>
                <span>Please select the currency you want to recharge</span>
              </h4>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setSelectedCurrency('USDT');
                    setSelectedNetwork(''); // Reset network when currency changes
                    setPastedAddress(''); // Reset pasted address when currency changes
                  }}
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    selectedCurrency === 'USDT' ? 'bg-gray-700' : 'bg-gray-600'
                  } hover:bg-gray-700 transition text-white`}
                >
                  <span className="w-6 h-6 bg-green-500 rounded-full"></span>
                  <span>USDT</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedCurrency('USDC');
                    setSelectedNetwork(''); // Reset network when currency changes
                    setPastedAddress(''); // Reset pasted address when currency changes
                  }}
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    selectedCurrency === 'USDC' ? 'bg-gray-700' : 'bg-gray-600'
                  } hover:bg-gray-700 transition text-white`}
                >
                  <span className="w-6 h-6 bg-blue-500 rounded-full"></span>
                  <span>USDC</span>
                </button>
              </div>
            </div>

            {/* Step 2: Select Network (only show if a currency is selected) */}
            {selectedCurrency && (
              <div className="mb-6">
                <h4 className="text-lg text-white mb-2 flex items-center space-x-2">
                  <span className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center">
                    2
                  </span>
                  <span>Recharge network</span>
                </h4>
                <select
                  value={selectedNetwork}
                  onChange={(e) => {
                    setSelectedNetwork(e.target.value);
                    setPastedAddress(''); // Reset pasted address when network changes
                  }}
                  className="w-full sm:w-1/3 p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Select network</option>
                  {selectedCurrency === 'USDT' && (
                    <>
                      <option value="TRC20">TRC20</option>
                      <option value="ERC20">ERC20</option>
                    </>
                  )}
                  {selectedCurrency === 'USDC' && <option value="ERC20">ERC20</option>}
                </select>
              </div>
            )}

            {/* Step 3: Paste Address (only show if a network is selected) */}
            {selectedNetwork && (
              <div className="mb-6">
                <h4 className="text-lg text-white mb-2 flex items-center space-x-2">
                  <span className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center">
                    3
                  </span>
                  <span>Paste wallet address</span>
                </h4>
                <input
                  type="text"
                  value={pastedAddress}
                  onChange={(e) => setPastedAddress(e.target.value)}
                  placeholder="Paste your wallet address here"
                  className="w-full sm:w-1/2 p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            )}

            {/* Display Dummy Image or QR Code (only if a network is selected) */}
            {selectedNetwork && (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {pastedAddress ? (
                    // Show QR Code if an address is pasted
                    <div className="inline-block rounded-lg overflow-hidden">
                      <QRCode value={pastedAddress} size={200} />
                    </div>
                  ) : (
                    // Show Dummy Image if no address is pasted
                    <div className="inline-block rounded-lg overflow-hidden">
                      <img
                        src={dummyImage}
                        alt="Dummy Person"
                        className="w-[200px] h-[200px] object-cover"
                      />
                    </div>
                  )}
                </div>
                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="bg-yellow-400 text-black p-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                  disabled={!pastedAddress} // Disable the button if no address is pasted
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Existing Section: Transaction History */}
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
                  {transactions.map((tx, index) => (
                    <tr key={index} className="border-t border-gray-700 hover:bg-gray-700 transition">
                      <td className="p-4 text-white">{tx.user}</td>
                      <td className="p-4 text-white">{tx.type}</td>
                      <td className="p-4 text-white">{tx.amount}</td>
                      <td className="p-4 text-white">{tx.date}</td>
                      <td
                        className={`p-4 flex items-center space-x-1 ${
                          tx.status === 'Completed' ? 'text-green-500' : 'text-yellow-400'
                        }`}
                      >
                        {tx.status === 'Completed' ? <FaCheckCircle /> : <FaHourglassHalf />}
                        <span>{tx.status}</span>
                      </td>
                    </tr>
                  ))}
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