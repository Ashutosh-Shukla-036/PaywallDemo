import { atom } from 'recoil';

export type Theme = 'light' | 'dark';

export const themeAtom = atom<Theme>({
  key: 'themeState',
  default: 'light',
  effects: [
    ({ setSelf, onSet }) => {
      // Load theme from localStorage on initialization
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) {
        setSelf(savedTheme);
      }

      // Save theme to localStorage when it changes
      onSet((newTheme) => {
        localStorage.setItem('theme', newTheme);
        // Apply theme to document
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      });
    },
  ],
});