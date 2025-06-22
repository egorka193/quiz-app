import { LocalStorageKeys, type User, type UserCredentials } from '@/services/types';
import { fakeApiRequest } from '@/services/utils';

export const checkInfo = async (login: string, password: string): Promise<User | null> => {
  const adminData = getUserFromLs(LocalStorageKeys.Admin);

  if (adminData && login === adminData.login && password === adminData.password) {
    return fakeApiRequest({ name: 'Admin', role: 'admin' });
  }

  return fakeApiRequest(null);
};


const defaultAdmin: UserCredentials = { login: 'Admin', password: '1234' };
const defaultUser: UserCredentials = { login: 'user', password: '1111' };
const defaultUsers: UserCredentials[] = [defaultAdmin, defaultUser];
const userKeys: (LocalStorageKeys.Admin)[] = [
  LocalStorageKeys.Admin,
];

export const getUserFromLs = (key: LocalStorageKeys.Admin): UserCredentials | null => {
  const lsResults = localStorage.getItem(key);
  if (!lsResults) return null;
  try {
    return JSON.parse(lsResults) as UserCredentials;
  } catch {
    return null;
  }
};

export const initDefaultUsers = () => {
  defaultUsers.forEach((user, index) => {
    const key = userKeys[index];
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(user));
    }
  });
};