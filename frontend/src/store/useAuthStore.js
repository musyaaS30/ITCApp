import { create } from 'zustand';
import api from '../utils/api';

const storedUser = localStorage.getItem('itc_user');
const storedToken = localStorage.getItem('itc_token');

export const useAuthStore = create((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedToken,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      // Save credentials in localStorage
      localStorage.setItem('itc_token', token);
      localStorage.setItem('itc_user', JSON.stringify(user));

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      const errMsg = err.response?.data?.message || 'Email atau password salah';
      return { 
        success: false, 
        message: typeof errMsg === 'object' ? errMsg[0] : errMsg 
      };
    }
  },

  logout: () => {
    localStorage.removeItem('itc_token');
    localStorage.removeItem('itc_user');
    set({ user: null, isAuthenticated: false });
  },
}));
