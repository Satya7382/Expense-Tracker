import React, {
  createContext,
  useState,
  useCallback,
  useEffect 
} from 'react';

import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // 2. Start loading as TRUE so the app waits for the initial auth check
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false); // Stop loading immediately if there's no token
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.AUTH.GET_USER_INFO
      );

      setUser(response.data);

    } catch (error) {
      console.log("Fetch user error:", error);
      setUser(null);
      // Optional best practice: clear the invalid token if the fetch fails
      // localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Automatically run fetchUser exactly once when the application loads
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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