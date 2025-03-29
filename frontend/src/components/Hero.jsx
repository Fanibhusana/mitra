import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero-bg.jpg"; // Background Image

function Hero() {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
                style={{ backgroundImage: `url(${heroImage})` }}
            ></div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 max-w-3xl text-white"
            >
                {/* Title */}
                <motion.h1
                    className="text-5xl md:text-6xl font-extrabold text-gradient leading-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    Make a Difference with <span className="text-blue-400">Mitra</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="mt-4 text-lg md:text-xl text-gray-900 font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Donate to trusted charities & bring hope to those in need.
                </motion.p>


                {/* CTA Button */}
                <Link to="/donate">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="mt-6 px-8 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button"
                    >
                        Donate Now
                    </motion.button>
                </Link>

                {/* Decorative Elements */}
                <motion.div
                    className="absolute top-10 left-10 w-16 h-16 rounded-full bg-blue-300 opacity-20 blur-3xl"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 }}
                ></motion.div>

                <motion.div
                    className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-pink-300 opacity-20 blur-3xl"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                ></motion.div>
            </motion.div>
        </section>
    );
}

export default Hero;
