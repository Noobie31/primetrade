import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'USER' | 'ADMIN';
}

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    clearAuth: () => void;
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    setAuth: (user, token) => set({ user, token }),
    clearAuth: () => set({ user: null, token: null }),
    isAuthenticated: () => !!get().token,
}));
