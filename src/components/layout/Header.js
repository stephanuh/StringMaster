import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">StringMaster</Link>
        
        <nav>
          <ul className="flex space-x-4">
            {currentUser ? (
              <>
                <li>
                  <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="hover:text-blue-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-blue-200">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-blue-200">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;