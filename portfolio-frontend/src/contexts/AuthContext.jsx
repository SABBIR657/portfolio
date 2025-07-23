import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Add this function to properly set user after login
  const setAuthData = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

 const login = async (email, password) => {
  try {
    const { data } = await AuthService.login(email, password);
    localStorage.setItem('token', data.token);

    const userRes = await AuthService.getMe(); // ✅ fetch user info using token
    setUser(userRes.data);

    navigate('/admin/dashboard');
    return true;
  } catch (err) {
    console.error('Login error:', err);
    return false;
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await AuthService.getMe();
        setUser(data);
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);