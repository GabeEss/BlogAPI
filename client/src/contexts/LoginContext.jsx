import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ErrorContext } from './ErrorContext';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const { setError } = useContext(ErrorContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('/blog/user');
        setLoggedIn(response.data.user !== null);
      } catch (error) {
        console.error(error);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/blog/poster/login', { username, password });
      if (response.data.success) {
        setLoggedIn(true);
      } else {
        throw new Error("Login failed");
      }
      return response.data;
    } catch (error) {
      setError(error.message);
      return { success: false };
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get('/blog/poster/logout');
      if (response.data.success) {
        setLoggedIn(false);
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };