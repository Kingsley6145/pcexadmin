// src/components/AdminHeader.jsx
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle, FaBars, FaCog, FaSignOutAlt, FaEnvelope, FaPalette, FaSave } from 'react-icons/fa';

const AdminHeader = ({ toggleSidebar, setTheme, theme }) => {
  const { authState, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [message, setMessage] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setTheme(selectedTheme);
    setMessage(`Theme changed to ${selectedTheme} successfully!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    logout(); // Use AuthContext logout
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 p-4 flex justify-between items-center shadow-md relative">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-yellow-400 hover:text-yellow-300 transition p-2 rounded-lg hover:bg-gray-800"
        >
          <FaBars className="text-2xl" />
        </button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
          PCEX Admin
        </h1>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 text-white hover:text-yellow-400 transition"
        >
          <FaUserCircle className="text-yellow-400 text-2xl" />
          <span className="font-medium">Admin</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-10">
            <div className="p-2">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="w-full flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition"
              >
                <FaCog />
                <span>Settings</span>
              </button>

              {isSettingsOpen && (
                <div className="p-2">
                  {message && (
                    <div className="mb-2 p-2 bg-green-500 text-white rounded-lg text-sm">
                      {message}
                    </div>
                  )}
                  <form onSubmit={handleSave}>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-400 mb-1 flex items-center space-x-2 text-sm">
                          <FaEnvelope className="text-yellow-400" />
                          <span>Admin Email</span>
                        </label>
                        <input
                          type="email"
                          value={authState.user?.email || 'admin@example.com'}
                          className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 mb-1 flex items-center space-x-2 text-sm">
                          <FaPalette className="text-yellow-400" />
                          <span>Theme</span>
                        </label>
                        <select
                          value={selectedTheme}
                          onChange={(e) => setSelectedTheme(e.target.value)}
                          className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                        >
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-yellow-400 text-black p-2 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center justify-center space-x-2 text-sm"
                      >
                        <FaSave />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 hover:text-red-400 rounded-lg transition"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;