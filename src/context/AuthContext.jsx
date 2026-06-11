import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { authService } from '../api';
import { demoCredentials } from '../mock/mockData';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user';
const TOKEN_TIMESTAMP_KEY = 'token_timestamp';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const refreshTimerRef = useRef(null);

  const getTokenAge = useCallback(() => {
    const timestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY);
    if (!timestamp) return Infinity;
    return Date.now() - parseInt(timestamp, 10);
  }, []);

  const isTokenExpired = useCallback(() => {
    return getTokenAge() > SESSION_TIMEOUT;
  }, [getTokenAge]);

  const storeSession = useCallback((token, userData) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_TIMESTAMP_KEY, Date.now().toString());
    setUser(userData);
  }, []);

  const extractUserData = useCallback((raw) => {
    if (!raw || typeof raw !== 'object') return null;
    if (raw.name && raw.email && raw.role) return raw;
    const inner = raw.data?.user || raw.data;
    if (inner?.name && inner?.email && inner?.role) return inner;
    return null;
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_TIMESTAMP_KEY);
    setUser(null);
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;

    try {
      const response = await authService.me();
      const payload = response.data?.data || response.data;
      const userData = extractUserData(payload) || payload;
      storeSession(token, userData);
      return true;
    } catch {
      clearSession();
      setSessionExpired(true);
      return false;
    }
  }, [storeSession, clearSession, extractUserData]);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (token && storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          const validUser = extractUserData(parsed);
          if (validUser) {
            if (isTokenExpired()) {
              const success = await refreshToken();
              if (!success) {
                setSessionExpired(true);
              }
            } else {
              setUser(validUser);
              if (validUser !== parsed) {
                localStorage.setItem(USER_KEY, JSON.stringify(validUser));
              }
            }
          } else {
            clearSession();
          }
        } catch {
          clearSession();
        }
      }

      setLoading(false);
    };

    init();
  }, [isTokenExpired, refreshToken, clearSession, extractUserData]);

  useEffect(() => {
    if (user && !isTokenExpired()) {
      const timeLeft = SESSION_TIMEOUT - getTokenAge();
      refreshTimerRef.current = setTimeout(() => {
        refreshToken();
      }, Math.max(timeLeft, 0));
    }

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [user, getTokenAge, isTokenExpired, refreshToken]);

  const login = useCallback(async (email, password) => {
    const mockUser = Object.values(demoCredentials).find(
      (u) => u.email === email && u.password === password
    );
    if (mockUser) {
      const token = `mock_${btoa(email)}_${Date.now()}`;
      const userData = {
        id: 'usr_' + Math.random().toString(36).slice(2, 10),
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
      };
      storeSession(token, userData);
      setSessionExpired(false);
      return { token, user: userData };
    }
    try {
      const response = await authService.login(email, password);
      const data = response.data;
      const payload = data.data || data;
      const token = payload.token || payload.access_token;
      const userData = extractUserData(payload) || payload.user || payload;
      storeSession(token, userData);
      setSessionExpired(false);
      return { token, user: userData };
    } catch {
      throw new Error('Identifiants incorrects');
    }
  }, [storeSession, extractUserData]);

  const register = useCallback(async (userData) => {
    const response = await authService.register(userData);
    const data = response.data;
    const payload = data.data || data;
    const token = payload.token;
    const returnedUser = extractUserData(payload) || payload.user || payload;
    storeSession(token, returnedUser);
    setSessionExpired(false);
    return data;
  }, [storeSession, extractUserData]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Silently ignore logout errors
    } finally {
      clearSession();
      setSessionExpired(false);
      setPendingAction(null);
    }
  }, [clearSession]);

  const hasRole = useCallback((roles) => {
    if (!user) return false;
    return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
  }, [user]);

  const getRedirectPath = useCallback(() => {
    if (!user) return '/';
    const rolePaths = {
      ADMIN: '/admin',
      PHARMACY: '/pharmacy',
      DISTRIBUTOR: '/distributor',
      USER: '/user',
    };
    return rolePaths[user.role] || '/';
  }, [user]);

  const dismissSessionExpired = useCallback(() => {
    setSessionExpired(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      sessionExpired,
      pendingAction,
      login,
      register,
      logout,
      hasRole,
      getRedirectPath,
      refreshToken,
      dismissSessionExpired,
      setPendingAction,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
