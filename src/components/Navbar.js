// src/components/Navbar.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <h1 className="text-white font-bold">Leaderboard App</h1>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-white">{user.firstName}</span>
            <button onClick={handleLogout} className="text-white bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-white">Login</Link>
            <Link to="/register" className="text-white">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
