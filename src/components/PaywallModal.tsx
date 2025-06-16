import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../store/authAtom';
import { Article } from '../data/mockArticles';
import { X, Lock, Crown, Star, Check } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
  onSubscribe: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  article,
  onSubscribe,
}) => {
  const auth = useRecoilValue(authAtom);

  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative animate-in fade-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
              <Lock className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Premium Content
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            "{article.title}" is premium content. {auth.isAuthenticated ? 'Subscribe' : 'Sign in or subscribe'} to unlock this article and thousands more.
          </p>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-3">
              <Crown className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Premium Benefits
              </span>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Unlimited access to all premium articles
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Ad-free reading experience
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Early access to new content
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Exclusive premium-only articles
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            {auth.isAuthenticated ? (
              <button
                onClick={onSubscribe}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Star className="h-5 w-5" />
                <span>Subscribe for $9.99/month</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  onClick={onClose}
                >
                  <span>Sign Up & Subscribe</span>
                </Link>
                <Link
                  to="/signin"
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={onClose}
                >
                  Already have an account? Sign In
                </Link>
              </>
            )}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Cancel anytime. No commitment required.
          </p>
        </div>
      </div>
    </div>
  );
};