import React from 'react';

const HelloWorld: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Hello World</h1>
        <p className="text-gray-600">Welcome to my Tailwind CSS component!</p>
      </div>
    </div>
  );
};

export default HelloWorld;
