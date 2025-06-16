// Utility functions to simulate API calls with realistic delays
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface PaymentData {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

// Simulate login API call
export const simulateLogin = async (credentials: LoginCredentials): Promise<{ success: boolean; user?: { email: string; subscription: 'free' | 'premium' } }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock validation - in real app, this would validate against backend
  if (credentials.email && credentials.password) {
    return {
      success: true,
      user: {
        email: credentials.email,
        subscription: 'free'
      }
    };
  }
  
  return { success: false };
};

// Simulate sign up API call
export const simulateSignUp = async (data: SignUpData): Promise<{ success: boolean; user?: { email: string; subscription: 'free' | 'premium' } }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock validation
  if (data.email && data.password && data.name) {
    return {
      success: true,
      user: {
        email: data.email,
        subscription: 'free'
      }
    };
  }
  
  return { success: false };
};

// Simulate payment processing
export const simulatePayment = async (paymentData: PaymentData): Promise<{ success: boolean }> => {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock payment validation
  if (paymentData.number && paymentData.expiry && paymentData.cvv && paymentData.name) {
    return { success: true };
  }
  
  return { success: false };
};

// Simulate article unlock
export const simulateUnlockArticle = async (_articleId: string): Promise<{ success: boolean }> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true };
};