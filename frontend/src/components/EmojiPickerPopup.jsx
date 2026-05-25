import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-4 mb-4">

      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-violet-100 text-violet-600 overflow-hidden">
          {icon ? (
            <img
              src={icon}
              alt="Selected Icon"
              className="w-7 h-7 object-cover"
            />
          ) : (
            <LuImage size={20} />
          )}
        </div>

        <p className="text-sm font-medium text-gray-700">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </button>

      {/* Emoji Picker */}
      {isOpen && (
        <div className="absolute top-16 left-0 z-50">

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-3 -right-3 z-50 shadow-md hover:bg-red-50 hover:text-red-500 transition-all duration-200 cursor-pointer"
          >
            <LuX size={18} />
          </button>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <EmojiPicker
              open={isOpen}
              onEmojiClick={(emojiObject) => {
                onSelect(emojiObject?.imageUrl || "");
                setIsOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;