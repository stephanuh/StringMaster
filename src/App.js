import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChordProvider } from './context/ChordContext';
import PrivateRoute from './components/layout/PrivateRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ChordProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ChordProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;