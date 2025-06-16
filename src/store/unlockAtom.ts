import { atom } from 'recoil';

export const unlockAtom = atom<string[]>({
  key: 'unlockedArticles',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      // Load unlocked articles from localStorage
      const savedUnlocked = localStorage.getItem('unlockedArticles');
      if (savedUnlocked) {
        setSelf(JSON.parse(savedUnlocked));
      }

      // Save to localStorage when it changes
      onSet((newUnlocked) => {
        localStorage.setItem('unlockedArticles', JSON.stringify(newUnlocked));
      });
    },
  ],
});