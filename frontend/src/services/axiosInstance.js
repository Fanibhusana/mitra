import axios from "axios";
import { logout } from "./authService.js";

const API_BASE_URL = "http://localhost:8081/api";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// Attach token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Utility function to handle notifications
export const setupInterceptors = (showNotification) => {
    // Handle expired tokens and other errors globally
    axiosInstance.interceptors.response.use(
        (response) => response, // If the response is okay, return it
        (error) => {
            if (error.response?.status === 401) { // Unauthorized = expired token
                logout();
                window.location.assign("/login"); // Use assign instead of href
            } else {
                // Handle other errors globally
                  showNotification("An error occurred: " + (error.response?.data?.message || error.message), "error");
            }
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;