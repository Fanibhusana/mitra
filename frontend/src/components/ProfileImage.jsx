import React, { useState } from "react";
import { uploadImage, updateImage, deleteImage } from "../services/imageUploadService";
import defaultProfilePic from "../assets/defaultProfilePic.jpg";
import { useNotification } from "../NotificationContext.jsx";

const ProfileImage = ({ userId, profileImageUrl, setProfileImageUrl }) => {
    const [file, setFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const showNotification = useNotification();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.size > 2 * 1024 * 1024) { // 2MB limit
            alert("File size exceeds 2MB. Please upload a smaller image.");
            return;
        }
        setFile(selectedFile);
    };

    const handleUploadImage = async () => {
        if (!file) {
            alert("Please select an image first.");
            return;
        }

        try {
            const imageUrl = await uploadImage("user", userId, file);
            setProfileImageUrl(imageUrl);
            showNotification("Image uploaded successfully!", "success");
            setIsEditing(false);
        } catch (error) {
            console.error(error.message);
            showNotification("Image upload failed.", "error");
        }
    };

    const handleUpdateImage = async () => {
        if (!file) {
            alert("Please select a new image first.");
            return;
        }

        try {
            const imageUrl = await updateImage("user", userId, file);
            setProfileImageUrl(imageUrl);
            showNotification("Image updated successfully!", "success");
            setIsEditing(false);
        } catch (error) {
            console.error(error.message);
            showNotification("Image update failed.", "error");
        }
    };

    const handleDeleteImage = async () => {
        if (!window.confirm("Are you sure you want to delete this image?")) return;

        try {
            await deleteImage("user", userId);
            setProfileImageUrl("");
            showNotification("Image deleted successfully!", "success");
            setIsEditing(false);
        } catch (error) {
            console.error(error.message);
            showNotification("Image deletion failed.", "error");
        }
    };

    return (
        <div className="flex items-center mb-4">
            <div className="relative">
                <img
                    src={profileImageUrl || defaultProfilePic}
                    alt="Profile"
                    className="w-32 h-32 rounded-full shadow-md object-cover"
                />
                {isEditing && (
                    <div className="mt-4 flex items-center space-x-2">
                        <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
                        <label htmlFor="fileInput" className="cursor-pointer bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-all">
                            <i className="fas fa-camera"></i> Click to select a file
                        </label>
                        {file && (
                            <button onClick={() => setFile(null)} className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-all">
                                Cancel
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="ml-4 flex flex-col space-y-2 mt-4">
                {isEditing ? (
                    <>
                        <button type="button" onClick={handleUploadImage} disabled={!!profileImageUrl} className={`px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all ${profileImageUrl ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}>Upload Image</button>
                        <button type="button" onClick={handleUpdateImage} disabled={!profileImageUrl} className={`px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all ${profileImageUrl ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-400 cursor-not-allowed'}`}>Update Image</button>
                        <button type="button" onClick={handleDeleteImage} className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-red-500 hover:bg-red-600">Delete Image</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-gray-500">Cancel</button>
                    </>
                ) : (
                    <button type="button" onClick={() => setIsEditing(true)} className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button">Edit Image</button>
                )}
            </div>
            {file && (
                <div className="mt-4">
                    <p>Selected file:</p>
                    <img src={URL.createObjectURL(file)} alt="Selected" className="w-32 h-32 rounded-full shadow-md object-cover" />
                </div>
            )}
        </div>
    );
};

export default ProfileImage;