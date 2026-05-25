import React from "react";
import {
  LuUtensils,
  LuTrash2,
  LuTrendingUp,
  LuTrendingDown,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn = true,
  onDelete,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg border border-gray-100 bg-white hover:shadow-sm transition"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden">
        {icon ? (
          <img
            src={icon}
            alt={title}
            className="w-6 h-6 object-contain"
          />
        ) : (
          <LuUtensils className="text-gray-500 text-xl" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-between">
        
        {/* Left Section */}
        <div>
          <p className="text-sm font-medium text-gray-800">
            {title}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {date}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Delete Button */}
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="p-1 text-gray-400 hover:text-red-500 transition cursor-pointer"
            >
              <LuTrash2 size={18} />
            </button>
          )}

          {/* Amount Badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              type === "income"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            <h6 className="text-xs font-semibold">
              {type === "income" ? "+" : "-"}${amount}
            </h6>

            {type === "income" ? (
              <LuTrendingUp size={16} />
            ) : (
              <LuTrendingDown size={16} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;