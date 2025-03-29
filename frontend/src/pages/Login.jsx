import { useState } from "react";
import { login as loginService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../NotificationContext.jsx";
import { motion } from "framer-motion";
import projectLogo from "../assets/mitra.png"; // Replace with your project logo path
import { useAuth } from "../services/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const showNotification = useNotification();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await loginService({ email, password });
            localStorage.setItem("token", data.token);
            login();
            const role = data.roles[0];

            if (role === "USER") {
                navigate("/user-dashboard");
            } else if (role === "ORG") {
                navigate("/charity-dashboard");
            } else if (role === "ADMIN") {
                navigate("/admin-dashboard");
            } else {
                showNotification("Unknown user role.", "error");
            }
        } catch (error) {
            let errorMessage = "An unexpected error occurred. Please try again later.";
            if (error.message.includes("UserNotFoundException")) {
                errorMessage = "User not found. Please check your email and try again.";
            } else if (error.message.includes("CharityNotFoundException")) {
                errorMessage = "Charity not found. Please check your email and try again.";
            } else if (error.message.includes("MethodArgumentNotValidException")) {
                errorMessage = "Invalid input. Please check your details and try again.";
            } else if (error.message.includes("DataIntegrityViolationException")) {
                errorMessage = "Data integrity violation. Please ensure your input is correct.";
            }
            showNotification(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-background"
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
                    transition={{ duration: 2, ease: "easeInOut" }}
                >
                    <motion.h2
                        className="text-4xl font-bold text-gradient mb-4 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    >
                        Login
                    </motion.h2>
                    <p className="text-center text-gray-600 mb-8">"The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi</p>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text-center">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="px-8 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
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
}

export default Login;