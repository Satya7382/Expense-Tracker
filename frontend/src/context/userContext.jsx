import React, {
  createContext,
  useState,
  useEffect
} from 'react';

import axiosInstance from '../utils/axiosInstance';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
    };

    const fetchUser = async () => {

        try {

            const response = await axiosInstance.get("/api/auth/getUser");

            setUser(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchUser();

    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;