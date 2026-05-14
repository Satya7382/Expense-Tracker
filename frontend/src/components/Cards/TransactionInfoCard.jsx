import React from "react";
import { LuUtensils, LuTrash2, LuTrendingUp, LuTrendingDown } from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete, 
}) => {
  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg border border-gray-100 bg-white hover:shadow-sm">
      
      {/* Icon Container */}
      <div className="w-12 h-12 flex items-center justify-center text-gray-500 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Content Container */}
      <div className="flex-1 flex items-center justify-between">
        
        {/* Title & Date */}
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        {/* Actions & Amount Badge */}
        <div className="flex items-center gap-2">
          
          {/* Delete Button */}
          {!hideDeleteBtn && (
            <button 
              className="text-gray-400 hover:text-red-500 cursor-pointer p-1" 
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          {/* Amount Badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${
              type === "income" 
                ? "bg-green-50 text-green-600" 
                : "bg-red-50 text-red-600"
            }`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} ${amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
          
        </div>
      </div>
      
    </div>
  );
};

export default TransactionInfoCard;