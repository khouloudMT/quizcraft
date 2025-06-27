import { useState } from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return { token, login, logout };
}