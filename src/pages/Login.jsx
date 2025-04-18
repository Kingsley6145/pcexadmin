// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // New state for success message
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const defaultEmail = 'example@gmail.com';
    const defaultPassword = 'Password1';

    if (email.toLowerCase() === defaultEmail && password === defaultPassword) {
      const response = {
        message: 'Login successful.',
        status: 'success',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzQ1MDQ1Nzc2fQ.n56NN4dPJ5WA3bDTyli_aQLr51tqMXEELNA_9LuHFhw',
        user: {
          email: email.toLowerCase(),
          role: 'admin',
        },
      };

      // Set success message and update auth state
      setSuccess(response.message);
      login(response.token, response.user);

      // Redirect to /admin after 2 seconds to show the message
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } else {
      setError('Invalid email or password');
      setSuccess(''); // Clear success message on error
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center" data-theme="dark">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text mb-6 text-center">
          PCEX Admin Login
        </h2>
        {error && (
          <div className="bg-red-500 text-white p-2 rounded-lg mb-4 text-center">{error}</div>
        )}
        {success && (
          <div className="bg-green-500 text-white p-2 rounded-lg mb-4 text-center">{success}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-gray-400 mb-2 flex items-center space-x-2">
              <FaEnvelope />
              <span>Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="text-gray-400 mb-2 flex items-center space-x-2">
              <FaLock />
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black p-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;