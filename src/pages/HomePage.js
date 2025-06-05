import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to StringMaster</h1>
        <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
          Create, customize, and save your own guitar chord fingerings.
          Build your personal library of custom chords and take your guitar playing to the next level.
        </p>
        
        {currentUser ? (
          <div className="mb-8">
            <p className="text-lg mb-4">Welcome back, {currentUser.username}!</p>
            <Link 
              to="/dashboard" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors duration-300"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors duration-300"
            >
              Log In
            </Link>
            <Link 
              to="/signup" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
      
      {/* Features Section */}
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">🎸</div>
            <h3 className="font-bold text-xl mb-2">Create Custom Chords</h3>
            <p className="text-gray-600">Design your own unique chord fingerings on our interactive virtual fretboard</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-green-600 text-4xl mb-4">💾</div>
            <h3 className="font-bold text-xl mb-2">Save Your Library</h3>
            <p className="text-gray-600">Build a personal collection of custom chords that suits your playing style</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-purple-600 text-4xl mb-4">🔄</div>
            <h3 className="font-bold text-xl mb-2">Edit & Organize</h3>
            <p className="text-gray-600">Easily edit existing chords and organize your chord library as it grows</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-orange-600 text-4xl mb-4">📱</div>
            <h3 className="font-bold text-xl mb-2">Mobile Friendly</h3>
            <p className="text-gray-600">Access your chord library from any device, anywhere you practice</p>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="max-w-4xl w-full mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Click the Fretboard</h3>
            <p className="text-gray-600">Click on the virtual fretboard to place your finger positions</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Name Your Chord</h3>
            <p className="text-gray-600">Give your chord a memorable name that makes sense to you</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Save & Practice</h3>
            <p className="text-gray-600">Save your chord and add it to your growing chord library</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;