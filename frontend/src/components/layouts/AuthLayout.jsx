import React from "react";
import frontCard from "../../assets/images/frontCard.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">

      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 h-screen px-10 pt-8 pb-12 flex flex-col">
        <h2 className="text-lg font-medium text-black">FinTrack</h2>

        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex w-1/2 h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-center relative items-center justify-center overflow-hidden">

        {/* Decorative shapes */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-[40px] bg-purple-600"></div>
        <div className="absolute top-[35%] -right-10 w-44 h-52 rounded-[40px] border-[16px] border-fuchsia-600"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-[40px] bg-violet-600"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center">

          <div className="absolute -top-8 -right-8">
            <StatsInfoCard
              icon={<LuTrendingUpDown />}
              label="Track Income & Expenses"
              color="bg-primary"
            />
          </div>

          <img
            src={frontCard}
            alt="front card"
            className="w-[100%] max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

/* Stats Card */
const StatsInfoCard = ({ icon, label, color }) => {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-lg">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${color}`}>
        {icon}
      </div>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  );
};