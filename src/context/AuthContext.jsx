// src/context/AuthContext.jsx
import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { logoutUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // { id, role }

  const setSession = ({ token: newToken, user: newUser }) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));

  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const login = useCallback((data) => {
  // data from backend login: { token, user: { id, role } }
  setSession(data);
}, []);


  const logout = useCallback(async () => {
  try {
    await logoutUser();
  } catch {
    // ignore
  } finally {
    clearSession();
  }
}, []);


 const value = useMemo(
  () => ({ token, user, login, logout }),
[token, user, login, logout]
);


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
