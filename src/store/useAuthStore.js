import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Dummy validation
    if (email === 'admin@itc.com' && password === 'admin123') {
      set({
        user: { id: 1, name: 'Admin ITC', email, role: 'admin' },
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true };
    } else if (email === 'user@itc.com' && password === 'user123') {
      set({
        user: { id: 2, name: 'Siswa ITC', email, role: 'member' },
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true };
    }
    
    set({ isLoading: false });
    return { success: false, message: 'Email atau password salah' };
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
