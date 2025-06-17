import { LocalStorageKeys, getUserFromLs } from '@/services/types';

export interface User {
  name: string;
  role: 'admin' | 'guest';
}

export const checkInfo = async (login: string, password: string): Promise<User | null> => {
  const admin = await getUserFromLs(LocalStorageKeys.Admin);
  const user = await getUserFromLs(LocalStorageKeys.User);

  if (login === admin.login && password === admin.password) {
    return {
      name: 'Admin',
      role: 'admin',
    };
  }

  if (login === user.login && password === user.password) {
    return {
      name: 'User',
      role: 'guest',
    };
  }

  return null;
};
