import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // Get role from localStorage

    if (!token) {
        return <Navigate to="/login" replace />; // Redirect to login if no token
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />; // Redirect to unauthorized page if role is unauthorized
    }

    return <Outlet />;
};

export default ProtectedRoute;