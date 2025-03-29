// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupUser from "./pages/SignupUser";
import SignupCharity from "./pages/SignupCharity";
import UserDashboard from "./pages/UserDashboard";
import CharityDashboard from "./pages/CharityDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import ContactUs from "./pages/ContactUs";
import CharityPage from "./pages/CharityPage";
import { setupInterceptors } from "./services/axiosInstance";
import { useNotification } from "./NotificationContext";
import { useEffect } from "react";

function App() {
    const showNotification = useNotification();

    useEffect(() => {
        setupInterceptors(showNotification);
    }, [showNotification]);

    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup/user" element={<SignupUser />} />
                    <Route path="/signup/charity" element={<SignupCharity />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/donate" element={<CharityPage />} />
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
                        <Route path="/user-dashboard" element={<UserDashboard />} />
                    </Route>
                    <Route element={<ProtectedRoute allowedRoles={["ORG"]} />}>
                        <Route path="/charity-dashboard" element={<CharityDashboard />} />
                    </Route>
                    <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;