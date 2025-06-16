import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authAtom } from '../store/authAtom';
import { ThemeToggle } from './ThemeToggle';
import { User, LogOut, Crown, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const Header: React.FC = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, user: null });
    setIsMobileMenuOpen(false);
    toast.success('Signed out successfully');
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              aria-label="PaywallDemo homepage"
            >
              <Crown className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                PaywallDemo
              </span>
            </Link>
            
            <nav className="hidden md:flex space-x-6" role="navigation" aria-label="Main navigation">
              <Link
                to="/content"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/content')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
                aria-current={isActive('/content') ? 'page' : undefined}
              >
                Content
              </Link>
              {auth.isAuthenticated && (
                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/profile')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  aria-current={isActive('/profile') ? 'page' : undefined}
                >
                  Profile
                </Link>
              )}
            </nav>
          </div>

          {/* Desktop Auth and Theme */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {auth.isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 max-w-32 truncate">
                    {auth.user?.email}
                  </span>
                  {auth.user?.subscription === 'premium' && (
                    <Crown className="h-4 w-4 text-yellow-500" aria-label="Premium member" />
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
              <Link
                to="/content"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/content')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
                aria-current={isActive('/content') ? 'page' : undefined}
              >
                Content
              </Link>
              
              {auth.isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/profile')
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}
                    aria-current={isActive('/profile') ? 'page' : undefined}
                  >
                    Profile
                  </Link>
                  
                  <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-2 pt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {auth.user?.email}
                      </span>
                      {auth.user?.subscription === 'premium' && (
                        <Crown className="h-4 w-4 text-yellow-500" aria-label="Premium member" />
                      )}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                      aria-label="Sign out"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-2 pt-4 space-y-2">
                  <Link
                    to="/signin"
                    onClick={closeMobileMenu}
                    className="block w-full px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="block w-full px-4 py-2 text-center text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};