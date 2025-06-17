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
const userKeys: LocalStorageKeys[] = [LocalStorageKeys.Admin, LocalStorageKeys.User];

export const getUserFromLs = (key: LocalStorageKeys): UserData | null => {
  const lsResults = localStorage.getItem(key);
  if (!lsResults) {
    return null; 
  }
  try {
    return JSON.parse(lsResults) as UserData;
  } catch {
    return null;
  }
};

export const setUserInLs = (key: LocalStorageKeys, data: UserData) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const setCurrentUser = (user: User) => {
  localStorage.setItem(LocalStorageKeys.User, JSON.stringify(user));
};

export const initDefaultUsers = () => {
  defaultUsers.forEach((user, index) => {
    const key = userKeys[index];
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(user));
    }
  });
};

export const getCurrentUserFromLs = (): User | null => {
  const raw = localStorage.getItem(LocalStorageKeys.User);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};