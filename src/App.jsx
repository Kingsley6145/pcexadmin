// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import Transactions from './pages/Transactions';
import Login from './pages/Login';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const ProtectedRoute = ({ children }) => {
    const { authState } = useContext(AuthContext);
    return authState.isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black text-white" data-theme={theme}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminDashboard setTheme={setTheme} theme={theme} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard setTheme={setTheme} theme={theme} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminUsers setTheme={setTheme} theme={theme} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/transactions"
              element={
                <ProtectedRoute>
                  <Transactions setTheme={setTheme} theme={theme} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div className="text-white p-8">404 - Page Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;