
export enum LocalStorageKeys {
  Admin = 'adminData',  
  User = 'userData',   
}
export type UserData = {
  login: string;
  password: string;
};

export interface User {
  name: string;
  role: 'admin' | 'guest';
}