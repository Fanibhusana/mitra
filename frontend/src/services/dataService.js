import axiosInstance from "./axiosInstance";
import { getToken } from "./authService";

export const fetchData = async (endpoint, params = {}) => {
    try {
        const token = getToken();
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axiosInstance.get(endpoint, { headers, params });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred while fetching data.");
    }
};