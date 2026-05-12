import React, { useRef, useState } from 'react'

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const { previewUrl, setpreviewUrl } = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setpreviewUrl(previewUrl);
        }
    };
    const handleRemoveImage = () => {
        setImage(null);
        setpreviewUrl(null);
        inputRef.current.value = null;
    };
    const onChooseFile = () => {
        inputRef.current.click();
    };
    return (
        <div>

        </div>
    )
}

export default ProfilePhotoSelector
