import React, { useContext } from 'react';
import Navbar from '../layouts/Navbar';
import { UserContext } from '../../context/userContext';
import SideMenu from '../layouts/SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {

    const { user } = useContext(UserContext);

    return (

        <div className="min-h-screen bg-slate-50">

            <Navbar activeMenu={activeMenu} />

            <div className="flex">

                {/* Sidebar */}

                <div className="hidden lg:block w-64">

                    (
                        <SideMenu activeMenu={activeMenu} />
                    )

                </div>

                {/* Main Content */}

                <div className="flex-1 p-5">
                    {children}
                </div>

            </div>

        </div>
    );
};

export default DashboardLayout;