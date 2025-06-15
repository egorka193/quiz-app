import { defineStore } from 'pinia';
import { checkInfo } from '@/services/adminApi';

interface User {
  name: string;
  role: 'admin' | 'guest';
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    login(login: string, password: string): boolean {
      const user = checkInfo(login, password);
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      return false;
    },
    loginAsGuest() {
      const user: User = { name: 'Гость', role: 'guest' };
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
    initFromLocalStorage() {
      const saved = localStorage.getItem('user');
      if (saved) {
        this.user = JSON.parse(saved);
      }
    },
  },
});
