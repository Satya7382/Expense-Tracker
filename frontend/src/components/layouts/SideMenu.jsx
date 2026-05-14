import React, { useContext } from 'react';
import SIDE_MENU_DATA from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {

    const { user, clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        localStorage.clear();
        navigate('/login');
    };

    const handleClick = (route) => {

        if (route === '/logout') {
            handleLogout();
            return;
        }

        navigate(route);
    };

    return (

        <div className="w-64 h-screen bg-white shadow-xl border-r border-slate-200 p-5 flex flex-col fixed">

            {/* User Info */}

            <div className="border-b border-slate-200 pb-5">

                <h5 className="text-lg font-semibold text-slate-800">
                    {user?.name || "User"}
                </h5>

                <p className="text-sm text-slate-500 mt-1">
                    {user?.email || ""}
                </p>

            </div>

            {/* Menu Items */}

            <ul className="mt-6 flex flex-col gap-2">

                {SIDE_MENU_DATA.map((item) => {

                    const Icon = item.icon;

                    return (

                        <li
                            key={item.id}
                            onClick={() => handleClick(item.path)}
                            className="
                                flex items-center gap-3
                                px-4 py-3
                                rounded-xl
                                text-slate-700
                                hover:bg-primary
                                hover:text-white
                                cursor-pointer
                                transition-all
                                duration-200
                                font-medium
                            "
                        >

                            <Icon className="text-xl" />

                            <span>
                                {item.label}
                            </span>

                        </li>

                    );
                })}

            </ul>

        </div>
    );
};

export default SideMenu;