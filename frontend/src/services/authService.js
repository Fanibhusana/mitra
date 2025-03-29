import axiosInstance from "./axiosInstance";

// User SignupModal
export const signupUser = async (userData) => {
    try {
        const response = await axiosInstance.post("/users/register", userData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            errors: error.response?.data || { error: "Something went wrong" }
        };
    }
};

// Charity SignupModal
export const signupCharity = async (charityData) => {
    try {
        const response = await axiosInstance.post("/charities/register", charityData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            errors: error.response?.data || { error: "Something went wrong" }
        };
    }
};

// Common Login API
export const login = async (credentials) => {
    try {
        const response = await axiosInstance.post("/signin", credentials);

        const { token, email, roles } = response.data;

        if (!token) {
            throw new Error("JWT Token is missing in API response.");
        }
        if (!roles || roles.length === 0) {
            throw new Error("No roles found in API response.");
        }
        if (!response.data || !response.data.token) {
            throw new Error("Invalid response from server");
        }

        // Save to local storage
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("role", roles[0]); // Handle missing role safely

        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "An error occurred during login. Please try again later.");
        } else if (error.request) {
            throw new Error("No response from server. Please check your network connection.");
        } else {
            throw new Error("An error occurred while setting up the login request. Please try again later.");
        }
    }
};

// Logout function
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    console.log("User logged out and token removed from localStorage"); // Debug: log logout
};

// Get Token function
export const getToken = () => {
    return localStorage.getItem("token");
};

// Get User Role function
export const getRole = () => {
    return localStorage.getItem("role");
};