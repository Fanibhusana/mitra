import React, { useState } from "react";

const EditProfileForm = ({ profileInfo, onSave, onCancel }) => {
    const [formData, setFormData] = useState(profileInfo);
    const [passwordError, setPasswordError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.password) {
            setPasswordError("Password cannot be blank");
            return;
        }
        setPasswordError("");
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
            />
            {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}
            <button type="submit" className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button">Save</button>
            <button type="button" onClick={onCancel} className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-gray-500 ml-4">Cancel</button>
        </form>
    );
};

export default EditProfileForm;