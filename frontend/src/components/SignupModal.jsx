import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SignupModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <button onClick={openModal} className="px-5 py-2 rounded-lg text-white transition-all hover:scale-105 bg-button">
                Signup
            </button>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg p-8"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                            <div className="flex flex-col gap-4">
                                <Link to="/signup/user" onClick={closeModal} className="px-5 py-2 rounded-lg text-white transition-all hover:scale-105 bg-button">
                                    Sign up as User
                                </Link>
                                <Link to="/signup/charity" onClick={closeModal} className="px-5 py-2 rounded-lg text-white transition-all hover:scale-105 bg-button">
                                    Sign up as Organization
                                </Link>
                                <button onClick={closeModal} className="mt-4 px-5 py-2 rounded-lg text-gray-700 transition-all hover:scale-105 bg-gray-200">
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SignupModal;