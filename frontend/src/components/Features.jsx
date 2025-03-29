import { motion } from "framer-motion";
import { FaHandsHelping, FaShieldAlt, FaSearchLocation } from "react-icons/fa";

const features = [
    {
        icon: <FaSearchLocation className="text-5xl text-blue-500" />,
        title: "Find Charities Easily",
        description: "Search for charities based on location, name, and cause.",
    },
    {
        icon: <FaShieldAlt className="text-5xl text-green-500" />,
        title: "Secure & Transparent Donations",
        description: "Make safe and transparent donations with trusted payment methods.",
    },
    {
        icon: <FaHandsHelping className="text-5xl text-purple-500" />,
        title: "Support a Cause",
        description: "Contribute to causes that matter and make a real impact.",
    },
];

function Features() {
    return (
        <section className="py-16 ">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    className="text-4xl font-extrabold text-gradient mb-8"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Why Choose Mitra?
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <div className="mb-4 flex justify-center">{feature.icon}</div>
                            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
