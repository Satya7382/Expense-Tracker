import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, placeholder, type, label }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="mb-5">
      {label && <label className="block text-sm mb-2">{label}</label>}

      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input"
        />

        {type === "password" && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;