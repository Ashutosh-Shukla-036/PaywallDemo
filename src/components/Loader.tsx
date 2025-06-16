import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animation-delay-150"></div>
      </div>
    </div>
  );
};