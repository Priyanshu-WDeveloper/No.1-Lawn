import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, _password: string) => {
    // Mock login - no backend integration
    // Simulate a small delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, accept any credentials
    set({
      isAuthenticated: true,
      user: { email, name: 'Admin' },
    });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));