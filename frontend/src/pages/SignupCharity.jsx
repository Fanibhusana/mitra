import React, { useState } from "react";
import { signupCharity } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../NotificationContext.jsx";
import { motion } from "framer-motion";
import projectLogo from "../assets/mitra.png"; // Replace with your project logo path

const SignupCharity = () => {
    const navigate = useNavigate();
    const showNotification = useNotification();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        description: "",
        contact: "",
        country: "",
        state: "",
        city: "",
        zip: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signupCharity(formData);
            if (result.success) {
                showNotification("Charity registered successfully! Please log in.", "success");
                navigate("/login");
            } else {
                showNotification(result.errors.error || "Please correct the highlighted errors and try again.", "error");
            }
        } catch (error) {
            let errorMessage = "An unexpected error occurred. Please try again later.";
            if (error.message.includes("DataIntegrityViolationException")) {
                errorMessage = "Data integrity violation. Please ensure your input is correct.";
            }
            showNotification(errorMessage, "error");
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-background pt-38 pb-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg max-w-4xl w-full overflow-hidden">
                {/* Form Section */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="p-8 md:w-1/2"
                    initial={{ opacity: 0, x: -100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                >
                    <motion.h2
                        className="text-4xl font-bold text-gradient mb-4 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    >
                        Organization Sign Up
                    </motion.h2>
                    <p className="text-center text-gray-600 mb-8">"Giving is not just about making a donation. It is about making a difference." - Kathy Calvin</p>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="contact">Contact</label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="zip">Zip Code</label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="text-center">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="px-8 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button"
                            type="submit"
                        >
                            Sign Up
                        </motion.button>
                    </div>
                </motion.form>
                {/* Image Section */}
                <motion.div
                    className="md:w-1/2 p-4 flex items-center justify-center"
                    initial={{ opacity: 0, x: 100, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                >
                    <img src={projectLogo} alt="Project Logo" className="w-3/4 h-3/4 object-contain" />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SignupCharity;