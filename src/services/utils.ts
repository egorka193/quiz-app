import { LocalStorageKeys, type User, type UserData } from './types';

export const fakeApiRequest = <T>(response: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, getFakeDelay());
  });
};

export const getFakeDelay = () => {
  const minimalDelay = 200;
  const randomDelay = Math.random() * 1000;
  return Math.max(randomDelay, minimalDelay);
};

const defaultAdmin: UserData = { login: 'Admin', password: '1234' };
const defaultUser: UserData = { login: 'user', password: '1111' };
const defaultUsers: UserData[] = [defaultAdmin, defaultUser];
const userKeys: (LocalStorageKeys.Admin | LocalStorageKeys.User)[] = [
  LocalStorageKeys.Admin,
  LocalStorageKeys.User,
];

export const getUserFromLs = (key: LocalStorageKeys.Admin | LocalStorageKeys.User): UserData | null => {
  const lsResults = localStorage.getItem(key);
  if (!lsResults) return null;
  try {
    return JSON.parse(lsResults) as UserData;
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem(LocalStorageKeys.CurrentUser, JSON.stringify(user));
};

export const getCurrentUserFromLs = (): User | null => {
  const raw = localStorage.getItem(LocalStorageKeys.CurrentUser);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
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
