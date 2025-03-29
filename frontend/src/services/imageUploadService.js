// src/services/imageUploadService.js
import axiosInstance from "./axiosInstance";

// Upload Image
export const uploadImage = async (entityType, entityId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axiosInstance.post(`/upload/${entityType}/${entityId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.error("Upload failed:", error);
        throw new Error("Image upload failed.");
    }
};

// Update Image
export const updateImage = async (entityType, entityId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axiosInstance.put(`/upload/${entityType}/${entityId}/update-image`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.error("Update failed:", error);
        throw new Error("Image update failed.");
    }
};

// Delete Image
export const deleteImage = async (entityType, entityId) => {
    try {
        const response = await axiosInstance.delete(`/upload/${entityType}/${entityId}`);
        if (response.status === 200) {
            return "Image deleted successfully!";
        } else {
            throw new Error("Error deleting image!");
        }
    } catch (error) {
        console.error("Error deleting image:", error);
        throw new Error("Error deleting image!");
    }
};