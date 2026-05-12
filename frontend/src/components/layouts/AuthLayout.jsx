import React from "react";
import frontCard from "../../assets/images/frontCard.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left Side */}
      <div className="w-screen md:w-[60vw] h-screen px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">FinTrack</h2>

        {children}
      </div>

      {/* Right Side */}
      <div className="hidden md:flex w-[60vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative items-center justify-center">

        {/* Decorative Shapes */}
        <div className="absolute -top-7 -left-5 w-48 h-48 rounded-[40px] bg-purple-600"></div>

        <div className="absolute top-[30%] -right-10 w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600"></div>

        <div className="absolute -bottom-7 -left-5 w-48 h-48 rounded-[40px] bg-violet-600"></div>

        {/* Content Wrapper */}
        <div className="relative z-20 flex flex-col items-center">

          {/* Stats Card */}
          <div className="absolute -top-50 -right-10">
            <StatsInfoCard
              icon={<LuTrendingUpDown />}
              label="Track Your Income & Expenses"
              color="bg-primary"
            />
          </div>

          {/* Main Image */}
          <img
            src={frontCard}
            alt="front card"
            className="w-[120%] max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-lg">
      
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-xm text-slate-500">{label}</p>
      </div>
    </div>
  );
};