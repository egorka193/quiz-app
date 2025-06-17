import { LocalStorageKeys, type User } from '@/services/types';
import { fakeApiRequest, getUserFromLs } from '@/services/utils';

export const checkInfo = async (login: string, password: string): Promise<User | null> => {
  const adminData = getUserFromLs(LocalStorageKeys.Admin);
  const userData = getUserFromLs(LocalStorageKeys.User);

  if (adminData && login === adminData.login && password === adminData.password) {
    return fakeApiRequest({ name: 'Admin', role: 'admin' });
  }

  if (userData && login === userData.login && password === userData.password) {
    return fakeApiRequest({ name: 'User', role: 'user' });
  }

  return null;
};


