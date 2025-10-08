import { create } from "zustand";

type UserProfile = {
  name?: string;
  email?: string;
  picture?: string;
};

type AuthState = {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));


