import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaDonate, FaSmile } from "react-icons/fa";

const steps = [
    {
        icon: <FaHandHoldingHeart className="text-5xl text-blue-500" />,
        title: "Choose a Cause",
        description: "Browse and select a cause that matters most to you.",
    },
    {
        icon: <FaDonate className="text-5xl text-green-500" />,
        title: "Make a Donation",
        description: "Donate securely through our trusted platform.",
    },
    {
        icon: <FaSmile className="text-5xl text-purple-500" />,
        title: "Create an Impact",
        description: "Your support brings hope and transforms lives.",
    },
];

function HowItWorks() {
    return (
        <section className="py-16 ">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    className="text-4xl font-extrabold text-gradient mb-8"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    How It Works
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <div className="mb-4 flex justify-center">{step.icon}</div>
                            <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
