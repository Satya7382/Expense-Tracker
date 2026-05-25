import React, {
  createContext,
  useState,
  useCallback
} from 'react';

import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.AUTH.GET_USER_INFO
      );

      setUser(response.data);

    } catch (error) {
      console.log("Fetch user error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }

  }, []);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        fetchUser,
        updateUser,
        clearUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;