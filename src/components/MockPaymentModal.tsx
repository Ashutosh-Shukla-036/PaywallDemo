import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from '../store/authAtom';
import { X, CreditCard, Check, Loader2 } from 'lucide-react';

interface MockPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const MockPaymentModal: React.FC<MockPaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  useEffect(() => {
    if (!isOpen) {
      setProcessing(false);
      setSuccess(false);
      setCardData({ number: '', expiry: '', cvv: '', name: '' });
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setProcessing(false);
    setSuccess(true);

    // Update user subscription
    if (auth.user) {
      setAuth({
        ...auth,
        user: { ...auth.user, subscription: 'premium' },
      });
    }

    // Show success state briefly, then close
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative animate-in fade-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          disabled={processing}
        >
          <X className="h-6 w-6" />
        </button>

        {success ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome to Premium! You now have access to all premium content.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                  <CreditCard className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Subscribe to Premium
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                $9.99/month • Cancel anytime
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                  disabled={processing}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => handleInputChange('expiry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                    disabled={processing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                    disabled={processing}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                  disabled={processing}
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Subscribe Now</span>
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              This is a demo. No real payment will be processed.
            </p>
          </>
        )}
      </div>
    </div>
  );
};