import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    inputRef.current.value = null;
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div className="w-16 h-16 flex items-center justify-center bg-yellow-100 relative rounded-full -bottom-1 -right-1">
          <LuUser size={40} />

          <button type="button" onClick={onChooseFile}>
            <LuUpload size={24} className="absolute mt-3 bg-primary rounded-full p-1" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile preview"
            className="w-24 h-24 rounded-full object-cover"
          />

          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;