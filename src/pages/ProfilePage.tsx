import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from '../store/authAtom';
import { MockPaymentModal } from '../components/MockPaymentModal';
import { User, Crown, Star, Settings, CreditCard } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const [auth, _setAuth] = useRecoilState(authAtom);
  const [showPayment, setShowPayment] = useState(false);

  const handleSubscribe = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    // Payment success is handled in the MockPaymentModal component
  };

  if (!auth.isAuthenticated || !auth.user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Please sign in to view your profile.</p>
      </div>
    );
  }

  const isPremium = auth.user.subscription === 'premium';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {auth.user.email}
              </p>
              <div className="flex items-center mt-2">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                  isPremium
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                }`}>
                  {isPremium ? (
                    <>
                      <Crown className="h-4 w-4" />
                      <span>Premium Member</span>
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4" />
                      <span>Free Member</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Subscription Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <CreditCard className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Subscription
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Status</span>
                <span className={`font-semibold ${
                  isPremium ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {isPremium ? 'Premium' : 'Free'}
                </span>
              </div>
              
              {isPremium ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Plan</span>
                    <span className="font-semibold text-gray-900 dark:text-white">$9.99/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Next billing</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You have unlimited access to all premium content. Enjoy!
                    </p>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Upgrade to Premium to unlock all articles and exclusive content.
                  </p>
                  <button
                    onClick={handleSubscribe}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Star className="h-5 w-5" />
                    <span>Subscribe to Premium</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Account Settings
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={auth.user.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Member Since
                </label>
                <input
                  type="text"
                  value={new Date().toLocaleDateString()}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                  Change Password
                </button>
                <button className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                  Email Preferences
                </button>
                <button className="w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Benefits */}
        {!isPremium && (
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-8">
            <div className="text-center">
              <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Unlock Premium Benefits
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get unlimited access to premium articles, ad-free reading, and exclusive content.
              </p>
              <button
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Start Premium Trial
              </button>
            </div>
          </div>
        )}

        <MockPaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    </div>
  );
};