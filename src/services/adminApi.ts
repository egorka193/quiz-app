
interface User {
  name: string;
  role: 'admin' | 'guest';
}

export const checkInfo = (login: string, password: string): User | null => {
  const raw = localStorage.getItem('users');
  if (!raw) return null;

  const users = JSON.parse(raw) as { login: string; password: string; name: string; role: 'admin' | 'guest' }[];

  const found = users.find(u => u.login === login && u.password === password);
  if (found) {
    return {
      name: found.name,
      role: found.role,
    };
  }

  return null;
};
