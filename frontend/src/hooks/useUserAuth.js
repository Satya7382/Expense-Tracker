import { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';

const useUserAuth = () => {

    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if (response.data) {
                    updateUser(response.data);
                } else {
                    clearUser();
                    navigate("/login");
                }

            } catch (error) {
                console.error("Failed to fetch user info:", error);
                clearUser();
                navigate("/login");
            }
        };

        fetchUserInfo();
    }, []);

};

export default useUserAuth;