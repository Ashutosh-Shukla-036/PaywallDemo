import { atom } from 'recoil';

export interface User {
  email: string;
  subscription: 'free' | 'premium';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const authAtom = atom<AuthState>({
  key: 'authState',
  default: {
    isAuthenticated: false,
    user: null,
  },
  effects: [
    ({ setSelf, onSet }) => {
      // Load auth state from localStorage on initialization
      const savedAuth = localStorage.getItem('authState');
      if (savedAuth) {
        try {
          const parsedAuth = JSON.parse(savedAuth);
          setSelf(parsedAuth);
        } catch (error) {
          console.error('Failed to parse saved auth state:', error);
        }
      }

      // Save auth state to localStorage when it changes
      onSet((newAuth) => {
        localStorage.setItem('authState', JSON.stringify(newAuth));
      });
    },
  ],
});