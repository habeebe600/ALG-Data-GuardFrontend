// src/context/AuthContext.jsx
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { logoutUser } from '../services/authService';
import { getMyProfile } from '../services/profileService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  const setSession = useCallback(({ token: newToken, user: newUser }) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  }, []);

  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const login = useCallback(
    (data) => {
      setSession(data);
    },
    [setSession]
  );

  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }, []);

  const fetchMe = useCallback(async () => {
    try {
      const data = await getMyProfile();
      if (data?.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch (error) {
      console.error('FETCH ME ERROR:', error);
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // ignore logout request failure
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    if (token) {
      fetchMe();
    } else {
      setLoading(false);
    }
  }, [token, fetchMe]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      logout,
      updateUser,
      fetchMe,
      isAuthenticated: !!token,
    }),
    [token, user, loading, login, logout, updateUser, fetchMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);