import { defineStore } from 'pinia';
import { checkInfo } from '@/services/adminApi';
import { type User } from '@/services/types';
import { getCurrentUserFromLs, setCurrentUser } from '@/services/adminApi';
import { removeCurrentUser } from '@/services/adminApi';

interface UserStore {
  user: User | null
}

export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    user: null,
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
      removeCurrentUser();
    },
    initializeUser() {
      const savedUser = getCurrentUserFromLs();
      if (savedUser) {
        this.user = savedUser;
      }
    },
  },
});
