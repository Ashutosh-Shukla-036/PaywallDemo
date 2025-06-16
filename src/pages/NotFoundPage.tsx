import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl sm:text-9xl font-bold text-gray-200 dark:text-gray-700 mb-4">
            404
          </div>
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
              <Search className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            Sorry, we couldn't find the page you're looking for. 
            The page might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            aria-label="Go back to homepage"
          >
            <Home className="h-5 w-5 mr-2" />
            <span>Back to Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You might be looking for:
          </p>
          <div className="space-y-2">
            <Link
              to="/content"
              className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm font-medium"
            >
              Browse Content Library
            </Link>
            <Link
              to="/signin"
              className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm font-medium"
            >
              Sign In to Your Account
            </Link>
            <Link
              to="/signup"
              className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm font-medium"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};