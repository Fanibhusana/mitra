import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import mitraLogo from "../assets/mitra.png"; // Logo

function Footer() {
    return (
        <footer className="bg-nav-footer text-gray-800 py-12 mt-16">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Column 1 - Logo & Description */}
                <div>
                    <img src={mitraLogo} alt="Mitra Logo" className="w-20 h-20 mb-3" />
                    <p className="text-gray-600">
                        Making donations easier, transparent, and impactful. Join us in creating real change.
                    </p>
                </div>

                {/* Column 2 - Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-blue-500 transition-all">Home</Link></li>
                        <li><Link to="/about" className="hover:text-blue-500 transition-all">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-500 transition-all">Contact</Link></li>
                        <li><Link to="/donate" className="hover:text-blue-500 transition-all">Donate</Link></li>
                    </ul>
                </div>

                {/* Column 3 - Support & Policies */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-blue-500 transition-all">FAQs</Link></li>
                        <li><Link to="/" className="hover:text-blue-500 transition-all">Privacy Policy</Link></li>
                        <li><Link to="/" className="hover:text-blue-500 transition-all">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* Column 4 - Newsletter Subscription */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h3>
                    <p className="text-gray-600 mb-3">Subscribe to get the latest updates & news.</p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-button text-white rounded-r-lg hover:scale-105 transition-all"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Social Media & Copyright */}
            <div className="mt-12 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center px-6">
                <p className="text-gray-600">© {new Date().getFullYear()} Mitra. All Rights Reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <motion.a href="#" whileHover={{ scale: 1.1 }} className="text-gray-700 hover:text-blue-500">
                        <FaFacebookF size={20} />
                    </motion.a>
                    <motion.a href="#" whileHover={{ scale: 1.1 }} className="text-gray-700 hover:text-blue-500">
                        <FaTwitter size={20} />
                    </motion.a>
                    <motion.a href="#" whileHover={{ scale: 1.1 }} className="text-gray-700 hover:text-blue-500">
                        <FaInstagram size={20} />
                    </motion.a>
                    <motion.a href="#" whileHover={{ scale: 1.1 }} className="text-gray-700 hover:text-blue-500">
                        <FaLinkedin size={20} />
                    </motion.a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
