import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from '../store/authAtom';
import { simulatePayment } from '../utils/api';
import { X, CreditCard, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

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
  const [errors, setErrors] = useState<{
    number?: string;
    expiry?: string;
    cvv?: string;
    name?: string;
  }>({});

  useEffect(() => {
    if (!isOpen) {
      setProcessing(false);
      setSuccess(false);
      setCardData({ number: '', expiry: '', cvv: '', name: '' });
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!cardData.number) {
      newErrors.number = 'Card number is required';
    } else if (cardData.number.replace(/\s/g, '').length < 16) {
      newErrors.number = 'Please enter a valid card number';
    }
    
    if (!cardData.expiry) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
    }
    
    if (!cardData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    if (!cardData.name.trim()) {
      newErrors.name = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    // Format card number with spaces
    if (field === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }
    
    // Format expiry date
    if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }
    
    // Format CVV
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setCardData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setProcessing(true);

    try {
      const result = await simulatePayment(cardData);
      
      if (result.success) {
        setProcessing(false);
        setSuccess(true);

        // Update user subscription
        if (auth.user) {
          setAuth({
            ...auth,
            user: { ...auth.user, subscription: 'premium' },
          });
        }

        toast.success('Subscription activated successfully!');

        // Show success state briefly, then close
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      } else {
        setProcessing(false);
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      setProcessing(false);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleClose = () => {
    if (!processing) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !processing) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative animate-in fade-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          disabled={processing}
          aria-label="Close payment modal"
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
            <h2 id="payment-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
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
              <h2 id="payment-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Subscribe to Premium
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                $9.99/month • Cancel anytime
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label 
                  htmlFor="card-number"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Card Number
                </label>
                <input
                  id="card-number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                    errors.number 
                      ? 'border-red-300 dark:border-red-600' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                  disabled={processing}
                  aria-describedby={errors.number ? 'card-number-error' : undefined}
                  aria-invalid={!!errors.number}
                />
                {errors.number && (
                  <p id="card-number-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                    {errors.number}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="expiry"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Expiry
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => handleInputChange('expiry', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                      errors.expiry 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    required
                    disabled={processing}
                    aria-describedby={errors.expiry ? 'expiry-error' : undefined}
                    aria-invalid={!!errors.expiry}
                  />
                  {errors.expiry && (
                    <p id="expiry-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.expiry}
                    </p>
                  )}
                </div>
                <div>
                  <label 
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                      errors.cvv 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    required
                    disabled={processing}
                    aria-describedby={errors.cvv ? 'cvv-error' : undefined}
                    aria-invalid={!!errors.cvv}
                  />
                  {errors.cvv && (
                    <p id="cvv-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label 
                  htmlFor="cardholder-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Cardholder Name
                </label>
                <input
                  id="cardholder-name"
                  type="text"
                  placeholder="John Doe"
                  value={cardData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                    errors.name 
                      ? 'border-red-300 dark:border-red-600' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                  disabled={processing}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
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