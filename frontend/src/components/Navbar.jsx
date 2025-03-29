// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRole } from "../services/authService";
import mitraLogo from "../assets/mitra.png";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import SignupModal from "./SignupModal";
import { useAuth } from "../services/AuthContext";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            const role = getRole();
            setUserRole(role);
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isAuthenticated]);

    const handleLogout = () => {
        logout();
        navigate("/login"); // Redirect to login page after logout
    };

    const closeModal = () => setIsModalOpen(false);

    const handleDashboard = () => {
        if (userRole === "USER") {
            navigate("/user-dashboard");
        } else if (userRole === "ORG") {
            navigate("/charity-dashboard");
        } else if (userRole === "ADMIN") {
            navigate("/admin-dashboard");
        } else {
            console.log("Unknown user role.");
        }
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 w-full px-6 py-4 z-50 transition-all duration-300 ${
                scrolled ? "bg-nav-footer shadow-lg" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <img src={mitraLogo} alt="Mitra Logo" className="w-12 h-12 object-contain" />
                    <span className="text-2xl font-bold text-gradient">Mitra</span>
                </Link>

                <ul className="hidden md:flex gap-8 text-lg text-gradient">
                    <li><Link to="/" className="hover:text-blue-500 transition-all">Home</Link></li>
                    <li><Link to="/donate" className="hover:text-blue-500 transition-all">Donate</Link></li>
                    <li><Link to="/about" className="hover:text-blue-500 transition-all">About Us</Link></li>
                    <li><Link to="/contact" className="hover:text-blue-500 transition-all">Contact Us</Link></li>
                </ul>

                <div className="hidden md:flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <button
                                onClick={handleDashboard}
                                className="hover:text-blue-500 px-5 py-2 rounded-lg text-white transition-all bg-button"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={handleLogout}
                                className="hover:text-red-500 px-5 py-2 rounded-lg text-white transition-all bg-button"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-5 py-2 rounded-lg text-white transition-all hover:scale-105 bg-button"
                            >
                                Login
                            </Link>
                            <SignupModal isModalOpen={isModalOpen} closeModal={closeModal} />
                        </>
                    )}
                </div>

                <button
                    className="md:hidden text-gray-800"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={30} /> : <Menu size={30} />}
                </button>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden"
                        >
                            <ul className="flex flex-col items-center gap-4 py-4 text-lg text-gradient">
                                <li><Link to="/" className="hover:text-blue-500 transition-all" onClick={() => setMenuOpen(false)}>Home</Link></li>
                                <li><Link to="/donate" className="hover:text-blue-500 transition-all" onClick={() => setMenuOpen(false)}>Donate</Link></li>
                                <li><Link to="/about" className="hover:text-blue-500 transition-all" onClick={() => setMenuOpen(false)}>About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-blue-500 transition-all" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
                                {isAuthenticated ? (
                                    <>
                                        <li>
                                            <button onClick={handleDashboard} className="hover:text-blue-500 transition-all">
                                                Dashboard
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="hover:text-red-500 transition-all">
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                to="/login"
                                                className="px-5 py-2 rounded-lg text-white transition-all hover:scale-105 bg-button"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <SignupModal isModalOpen={isModalOpen} closeModal={closeModal} />
                                        </li>
                                    </>
                                )}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}

export default Navbar;