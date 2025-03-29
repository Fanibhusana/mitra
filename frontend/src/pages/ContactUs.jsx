import { motion } from "framer-motion";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

function ContactUs() {
    return (
            <div className="bg-background text-gray-900">
                {/* Hero Section */}
                <section className="relative w-full min-h-[50vh] flex items-center justify-center text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-3xl text-center"
                    >
                        <h1 className="text-5xl font-extrabold text-gradient leading-tight">
                            Contact <span className="text-blue-500">Us</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-700">
                            We would love to hear from you. Reach out to us with any questions or feedback.
                        </p>
                    </motion.div>
                </section>

                {/* Contact Information */}
                <section className="py-16 px-6 max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-4xl font-bold text-gradient mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Our Contact Information
                    </motion.h2>
                    <p className="text-lg text-gray-700 mb-4">Address: Veerannapalya, Nagawara, Bangalore - 560045</p>
                    <p className="text-lg text-gray-700 mb-4">Phone: +91 9876543210</p>
                    <p className="text-lg text-gray-700 mb-4">Email: contact@mitra.org</p>
                </section>

                {/* Contact Form */}
                <section className="py-16 px-6 max-w-4xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-gradient mb-6 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Get in Touch
                    </motion.h2>
                    <form className="bg-white p-8 rounded-2xl shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                rows="6"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="px-8 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button"
                                type="submit"
                            >
                                Send Message
                            </motion.button>
                        </div>
                    </form>
                </section>

                {/* Map Section */}
                <section className="py-16 px-6 max-w-4xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-gradient mb-6 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Our Location
                    </motion.h2>
                    <div className="w-full h-64">

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9273922125117!2d77.60947757491965!3d13.040293587281372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17741c38281b%3A0x938c855f1502adf7!2sVeerannapalya%2C%20Nagavara%2C%20Bengaluru%2C%20Karnataka%20560045!5e0!3m2!1sen!2sin!4v1742925428033!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{border: 0}}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </section>
                <Footer/>
            </div>
    );
}

export default ContactUs;