export enum LocalStorageKeys {
  Admin = 'adminData',  
  User = 'userData',   
}
type UserData = {
  login: string;
  password: string;
};

const defaultAdmin: UserData = { login: 'Admin', password: '1234' };
const defaultUser: UserData = { login: 'user', password: '1111' };

export const getUserFromLs = async (key: LocalStorageKeys): Promise<UserData> => {
  const lsResults = localStorage.getItem(key);
  if (!lsResults) {
    const defaultData = key === LocalStorageKeys.Admin ? defaultAdmin : defaultUser;
    localStorage.setItem(key, JSON.stringify(defaultData));
    return fakeApiRequest(defaultData);
  }
  try {
    return JSON.parse(lsResults) as UserData;
  } catch {
    return key === LocalStorageKeys.Admin ? defaultAdmin : defaultUser;
  }
};

export const setUserInLs = (key: LocalStorageKeys, data: UserData) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const setCurrentUser = (user: User) => {
  localStorage.setItem(LocalStorageKeys.User, JSON.stringify(user));
};

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