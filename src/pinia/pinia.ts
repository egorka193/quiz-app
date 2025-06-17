import { defineStore } from 'pinia';
import { checkInfo, type User } from '@/services/adminApi';
import { getUserFromLs, setCurrentUser } from '@/services/types';



export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async login(login: string, password: string): Promise<boolean> {
      const user = await checkInfo(login, password);
      if (user) {
        this.user = user;
        setCurrentUser(user);
        return true;
      }
      return false;
    },
    loginAsGuest() {
      const user: User = { name: 'Гость', role: 'guest' };
      this.user = user;
      setCurrentUser(user);
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
    async initFromLocalStorage() {
      const saved = await getUserFromLs('user');
      if (saved) {
        this.user = JSON.parse(saved);
      }
    },
  },
});
