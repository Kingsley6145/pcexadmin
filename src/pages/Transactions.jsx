// src/pages/Transactions.jsx
import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import Sidebar from '../components/Sidebar';
import { FaExchangeAlt, FaCheckCircle, FaHourglassHalf, FaCopy } from 'react-icons/fa'; // Added FaCopy
import QRCode from 'react-qr-code';

const Transactions = ({ setTheme, theme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState(''); // State for selected currency
  const [selectedNetwork, setSelectedNetwork] = useState(''); // State for selected network
  const [copied, setCopied] = useState(false); // State to track if the address was copied

  // Transaction history data
  const transactions = [
    { user: 'Kings', type: 'Recharge', amount: '$100', date: 'Apr 7, 2025', status: 'Completed' },
    { user: 'Jeff', type: 'Withdraw', amount: '$50', date: 'Apr 6, 2025', status: 'Pending' },
  ];

  // Mapping of currency and network to wallet addresses (based on screenshots)
  const walletAddresses = {
    USDT: {
      TRC20: 'TBvePH4Mmx2Q9P5bSkn9FoWxEkjEzy',
      ERC20: '0x4F6AC9aE12B0E7483F920466C517eA0B728A832',
    },
    USDC: {
      ERC20: '0x4F6AC9aE12B0E7483F920466C517eA0B728A832',
    },
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get the wallet address based on selected currency and network
  const getWalletAddress = () => {
    if (!selectedCurrency || !selectedNetwork) return '';
    return walletAddresses[selectedCurrency]?.[selectedNetwork] || '';
  };

  const walletAddress = getWalletAddress();

  // Function to copy the wallet address to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      setCopied(true);
      // Reset the "Copied!" message after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    });
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

          {/* New Section: Recharge QR Code Generator */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <FaExchangeAlt className="text-yellow-400" />
              <span>Generate Recharge QR Code</span>
            </h3>

            {/* Step 1: Select Currency */}
            <div className="mb-6">
              <h4 className="text-lg text-white mb-2 flex items-center space-x-2">
                <span className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center">1</span>
                <span>Please select the currency you want to recharge</span>
              </h4>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setSelectedCurrency('USDT');
                    setSelectedNetwork(''); // Reset network when currency changes
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
                  <span className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center">2</span>
                  <span>Recharge network</span>
                </h4>
                <select
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value)}
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

            {/* Display QR Code and Address (only if both currency and network are selected) */}
            {selectedCurrency && selectedNetwork && walletAddress && (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {/* Wrap QRCode in a div to apply border-radius */}
                  <div className="inline-block rounded-lg overflow-hidden">
                    <QRCode value={walletAddress} size={200} />
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 cursor-pointer" onClick={copyToClipboard}>
                  <FaCopy className="text-gray-400" />
                  <p className="text-white break-all">{walletAddress}</p>
                </div>
                {copied && (
                  <p className="text-green-500 text-sm mt-2">Copied!</p>
                )}
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