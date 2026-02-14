import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiHome, FiList } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          💰 Bellcrop Expense Tracker
        </Link>
        
        <div className="navbar-menu">
          <Link 
            to="/dashboard" 
            className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <FiHome /> Dashboard
          </Link>
          <Link 
            to="/transactions" 
            className={`navbar-link ${location.pathname === '/transactions' ? 'active' : ''}`}
          >
            <FiList /> Transactions
          </Link>
        </div>

        <div className="navbar-user">
          <span className="user-name">👤 {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
