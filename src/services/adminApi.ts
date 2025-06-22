import { LocalStorageKeys, type User, type UserCredentials } from '@/services/types';
import { fakeApiRequest } from '@/services/utils';

export const checkInfo = async (login: string, password: string): Promise<User | null> => {
  const users = getUsersFromLs(LocalStorageKeys.Users);

  const found = users.find(
    user => user.login === login && user.password === password,
  );

  if (found) {
    const role: User['role'] = found.login === 'Admin' ? 'admin' : 'user';
    return fakeApiRequest({ name: found.login, role });
  }

  return fakeApiRequest(null);
};

const defaultUsers: UserCredentials[] = [
  { login: 'Admin', password: '1234' },
  { login: 'user', password: '1111' },
];

export const getUsersFromLs = (key: LocalStorageKeys.Users): UserCredentials[] => {
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed as UserCredentials[] : [];
  } catch {
    return [];
  }
};

export const initDefaultUsers = () => {
  if (!localStorage.getItem(LocalStorageKeys.Users)) {
    localStorage.setItem(LocalStorageKeys.Users, JSON.stringify(defaultUsers));
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

export const removeCurrentUser = () => {
  localStorage.removeItem(LocalStorageKeys.CurrentUser);
};