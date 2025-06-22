import { defineStore } from 'pinia';
import { checkInfo } from '@/services/adminApi';
import { LocalStorageKeys, type User } from '@/services/types';
import { getCurrentUserFromLs, setCurrentUser } from '@/services/utils';



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
      localStorage.removeItem(LocalStorageKeys.CurrentUser);
    },
    initializeUser() {
      const savedUser = getCurrentUserFromLs();
      if (savedUser) {
        this.user = savedUser;
      }
    },
  },
});
