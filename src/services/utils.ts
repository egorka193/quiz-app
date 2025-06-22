import { LocalStorageKeys, type User } from './types';

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

export const findSaveUsers = () => {
  return fakeApiRequest(localStorage.getItem('tests'));
};

