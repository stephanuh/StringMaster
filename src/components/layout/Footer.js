import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">StringMaster</h2>
            <p className="text-sm text-gray-400">Create and store your custom guitar chords</p>
          </div>
          
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} StringMaster. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;