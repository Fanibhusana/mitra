import { motion } from "framer-motion";
import { useState } from "react";
import SignupModal from "./SignupModal"; // ✅ Import SignupModal
import { Link } from "react-router-dom";

function JoinUs() {
    const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Add state for modal

    const openModal = () => setIsModalOpen(true); // ✅ Open modal
    const closeModal = () => setIsModalOpen(false); // ✅ Close modal

    return (
        <section className="py-16 text-center">
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <motion.h2
                    className="text-4xl font-extrabold text-gradient mb-6"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Join Us & Make an Impact
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    className="text-lg text-gray-700 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1 }}
                >
                    Become a part of Mitra today. Whether you want to donate, volunteer, or support a cause—your journey starts here!
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex  sm:flex-row justify-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    <SignupModal isModalOpen={isModalOpen} closeModal={closeModal} />

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className=" px-5 py-2 rounded-lg text-white transition-all hover:scale-105 bg-button"
                        onClick={() => window.location.href = '/about'}
                    >
                        Learn More
                    </motion.button>
                </motion.div>
            </div>


        </section>
    );
}

export default JoinUs;