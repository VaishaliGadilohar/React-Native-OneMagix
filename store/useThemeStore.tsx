

import { create } from "zustand";
import mmkvStorage from "../store/storage";


type ThemeState = {
  isDark: boolean;
  toggleTheme: () => void;
};



export const useThemeStore = create<ThemeState>((set, get) => ({
  isDark: mmkvStorage.getBoolean("isDark") || false,
  toggleTheme: () => {
    const newTheme = !get().isDark;
    set({ isDark: newTheme });
    mmkvStorage.set("isDark", newTheme);
  },
}));


