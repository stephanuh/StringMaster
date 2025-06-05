import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const user = localStorage.getItem('stringMasterUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const signup = (email, password, username) => {
    const user = { email, username, id: Date.now().toString() };
    
    const users = JSON.parse(localStorage.getItem('stringMasterUsers') || '[]');
    const userExists = users.find(u => u.email === email);
    
    if (userExists) {
      throw new Error('User already exists');
    }
    
    users.push({ ...user, password });
    localStorage.setItem('stringMasterUsers', JSON.stringify(users));
    
    // Set current user and store in localStorage
    setCurrentUser(user);
    localStorage.setItem('stringMasterUser', JSON.stringify(user));
    return user;
  };

  const login = (email, password) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('stringMasterUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Remove password before storing in state
    const { password: _, ...userWithoutPassword } = user;
    
    // Set current user and store in localStorage
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('stringMasterUser', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('stringMasterUser');
  };

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);