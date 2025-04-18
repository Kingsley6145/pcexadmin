// src/pages/AdminUsers.jsx
import { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import Sidebar from '../components/Sidebar';
import { FaEdit, FaTrash, FaUsers } from 'react-icons/fa';

const AdminUsers = ({ setTheme, theme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers
      ? JSON.parse(storedUsers)
      : [
          { id: 1, username: 'Kings', email: 'kings@gmail.com', balance: '$0.00' },
          { id: 2, username: 'Jeff', email: 'jeff@gmail.com', balance: '$150.00' },
        ];
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...editingUser,
      username: e.target.username.value,
      email: e.target.email.value,
      balance: e.target.balance.value,
    };
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
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
        }`}
      >
        <AdminHeader toggleSidebar={toggleSidebar} setTheme={setTheme} theme={theme} />
        <div className="p-4 sm:p-8 pl-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
            Manage Users
          </h2>

          {editingUser ? (
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-10">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <FaEdit className="text-yellow-400" />
                <span>Edit User</span>
              </h3>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={editingUser.username}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingUser.email}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Balance</label>
                  <input
                    type="text"
                    name="balance"
                    defaultValue={editingUser.balance}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    type="submit"
                    className="bg-yellow-400 text-black p-3 rounded-lg font-semibold hover:bg-yellow-500 transition w-full sm:w-auto"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-500 transition w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <FaUsers className="text-yellow-400" />
                <span>User List</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="text-gray-400 text-sm sm:text-base">
                      <th className="p-2 sm:p-4">Username</th>
                      <th className="p-2 sm:p-4 hidden sm:table-cell">Email</th>
                      <th className="p-2 sm:p-4 hidden md:table-cell">Balance</th>
                      <th className="p-2 sm:p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-t border-gray-700 hover:bg-gray-700 transition flex flex-col sm:table-row"
                      >
                        <td className="p-2 sm:p-4 text-white flex justify-between sm:table-cell">
                          <span className="sm:hidden font-semibold">Username:</span>
                          {user.username}
                        </td>
                        <td className="p-2 sm:p-4 text-white hidden sm:table-cell">
                          <span className="sm:hidden font-semibold">Email:</span>
                          {user.email}
                        </td>
                        <td className="p-2 sm:p-4 text-white hidden md:table-cell">
                          <span className="sm:hidden font-semibold">Balance:</span>
                          {user.balance}
                        </td>
                        <td className="p-2 sm:p-4 flex justify-between sm:table-cell">
                          <div className="flex space-x-2 sm:space-x-4">
                            <button
                              onClick={() => handleEdit(user)}
                              className="text-yellow-400 hover:text-yellow-300 transition flex items-center space-x-1"
                            >
                              <FaEdit />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="text-red-500 hover:text-red-400 transition flex items-center space-x-1"
                            >
                              <FaTrash />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;