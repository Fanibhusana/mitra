import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../services/dataService.js";
import PaymentModal from "../components/PaymentModal";
import { useNotification } from "../NotificationContext.jsx";
import { motion } from "framer-motion";
import ProfileImage from "../components/ProfileImage";
import SearchForm from "../components/SearchForm";
import EditProfileForm from "../components/EditProfileForm";
import DonationList from "../components/DonationList";
import PaginationControls from "../components/PaginationControls";
import Notification from "../components/Notification";
import defaultProfilePic from "../assets/defaultProfilePic.jpg";
import { DonationTrendsGraph, TopCharitiesGraph } from "../components/DonationTrendsGraph";
import LiveCounter from "../components/LiveCounter";
import axiosInstance from "../services/axiosInstance.js";

const UserDashboard = () => {
    const [donations, setDonations] = useState([]);
    const [charities, setCharities] = useState([]);
    const [userInfo, setUserInfo] = useState({ id: 0, email: "", role: "", name: "", password: "", profileImageUrl: "" });
    const [searchParams, setSearchParams] = useState({ zip: "", city: "", state: "", country: "" });
    const [selectedCharity, setSelectedCharity] = useState(null);
    const [donationPage, setDonationPage] = useState(1);
    const [charityPage, setCharityPage] = useState(1);
    const [donationsPerPage] = useState(10);
    const [charitiesPerPage] = useState(10);
    const [editMode, setEditMode] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [sortDonations, setSortDonations] = useState("timestamp,desc");
    const [sortCharities, setSortCharities] = useState("name,asc");
    const [totalDonationPages, setTotalDonationPages] = useState(0);
    const [totalCharityPages, setTotalCharityPages] = useState(0);
    const [totalSum, setTotalSum] = useState(0);
    const [charityDonations, setCharityDonations] = useState({});
    const navigate = useNavigate();
    const showNotification = useNotification();

    useEffect(() => {
        const fetchDataForUser = async () => {
            try {
                const storedEmail = localStorage.getItem("email");
                const storedRole = localStorage.getItem("role");

                const userResponse = await fetchData(`/users/email/${storedEmail}`);
                const { id, name, email, role, profileImageUrl } = userResponse;

                const donationResponse = await fetchData(`/transactions/user/email/${storedEmail}`, {
                    page: donationPage - 1,
                    size: donationsPerPage,
                    sort: sortDonations
                });
                const updatedDonations = donationResponse.content.map(donation => ({
                    ...donation,
                    charityName: donation.charityName || "Unknown Charity",
                }));

                setDonations(updatedDonations);
                setTotalDonationPages(donationResponse.totalPages);

                const charityResponse = await fetchData("/charities/paginated", {
                    page: charityPage - 1,
                    size: charitiesPerPage,
                    sort: sortCharities
                });
                const charitiesData = charityResponse.content;

                const totalSumResponse = await fetchData(`/transactions/user/${id}/total-sum`);
                setTotalSum(totalSumResponse);

                const charityDonationsData = {};
                for (const charity of charitiesData) {
                    const charitySumResponse = await fetchData(`/transactions/user/${id}/charity/${charity.id}/total-sum`);
                    charityDonationsData[charity.id] = charitySumResponse;
                }
                setCharityDonations(charityDonationsData);

                setCharities(charitiesData);
                setTotalCharityPages(charityResponse.totalPages);

                if (storedEmail && storedRole) {
                    setUserInfo({ id, email: storedEmail, role: storedRole, name, profileImageUrl });
                }
            } catch (error) {
                let errorMessage = "An unexpected error occurred. Please try again later.";
                if (error.message.includes("DataIntegrityViolationException")) {
                    errorMessage = "Data integrity violation. Please ensure your input is correct.";
                }
                showNotification(errorMessage, "error");
            }
        };

        fetchDataForUser();
    }, [donationPage, charityPage, sortDonations, sortCharities]);

    const handleSearch = async (searchParams) => {
        try {
            const { zip, city, state, country } = searchParams;

            const response = await fetchData("/charities/search", {
                zip, city, state, country, page: charityPage - 1, size: charitiesPerPage, sort: sortCharities
            });

            setCharities(response.content);
            setTotalCharityPages(response.totalPages);
        } catch (error) {
            console.error("Error searching charities:", error);
            showNotification("An error occurred while searching for charities. Please try again later.", "error");
        }
    };

    const handleDonateClick = (charityId) => {
        setSelectedCharity(charityId);
    };

    const closePaymentModal = () => {
        setSelectedCharity(null);
    };

    const paginateDonations = (pageNumber) => setDonationPage(pageNumber);
    const paginateCharities = (pageNumber) => setCharityPage(pageNumber);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleUpdateUser = async (formData) => {
        if (!formData.password) {
            setPasswordError("Password cannot be blank");
            return;
        }
        setPasswordError("");
        try {
            const response = await axiosInstance.put(`/users/${userInfo.id}`, formData);
            setUserInfo(response);
            setEditMode(false);
            showNotification("User updated successfully.", "success");
        } catch (error) {
            console.error("Error updating user:", error);
            showNotification("An error occurred while updating user. Please try again later.", "error");
        }
    };
    return (
        <div className="bg-background from-gray-100 to-gray-200 text-gray-800 min-h-screen flex flex-col">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="container mx-auto py-16 px-6 max-w-6xl"
            >
                <h1 className="text-5xl font-extrabold text-gradient leading-tight text-center mb-8">User Dashboard</h1>
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                    <div className="ml-4 mb-4">
                        <p className="text-2xl font-bold">Name: {userInfo.name}</p>
                        <p className="text-lg text-gray-600">Email: {userInfo.email}</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <ProfileImage userId={userInfo.id} profileImageUrl={userInfo.profileImageUrl} setProfileImageUrl={(url) => setUserInfo({ ...userInfo, profileImageUrl: url })} />
                    </div>
                    <p className="text-xl font-semibold">Total Donations: ₹<LiveCounter value={totalSum} /></p>

                </div>
                {editMode ? (
                    <EditProfileForm profileInfo={userInfo} onSave={handleUpdateUser} onCancel={() => setEditMode(false)} />
                ) : (
                    <button onClick={handleEditClick} className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-transform duration-300 ease-in-out bg-button mb-8 hover:scale-105">Edit Profile</button>
                )}
                <SearchForm onSearch={handleSearch} />
                <DonationList donations={donations} title="Your Donations" />
                <PaginationControls currentPage={donationPage} totalPages={totalDonationPages} onPageChange={paginateDonations} />
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                    <h2 className="text-3xl font-bold text-gradient mb-4">Donate to a Charity</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-12 gap-8">
                        {charities.length > 0 ? (
                            charities.map((charity) => (
                                <motion.div
                                    key={charity.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between"
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <img src={charity.charityImageUrl || defaultProfilePic} alt={charity.name} className="w-full h-48 object-cover" />
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-gray-800">Name: {charity.name}</h3>
                                        <p className="text-gray-600 text-sm mt-2 flex-grow">Description: {charity.description}</p>
                                        <p className="text-gray-600 text-sm mt-2">Address:</p>
                                        <p className="text-gray-600 text-sm mt-2">Zip: {charity.zip}</p>
                                        <p className="text-gray-600 text-sm mt-2">City: {charity.city}</p>
                                        <p className="text-gray-600 text-sm mt-2">State: {charity.state}</p>
                                        <p className="text-gray-600 text-sm mt-2">Country: {charity.country}</p>
                                        <p className="text-gray-600 text-sm mt-2">Total Donated: ₹{charityDonations[charity.id] || 0}</p>
                                        <div className="mt-4 flex justify-center">
                                            <motion.button
                                                onClick={() => handleDonateClick(charity.id)}
                                                className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-transform duration-300 ease-in-out bg-button hover:scale-105"
                                            >
                                                Donate
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p>No charities available</p>
                        )}
                    </div>
                    <PaginationControls currentPage={charityPage} totalPages={totalCharityPages} onPageChange={paginateCharities} />
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-lg mb-8 border border-gray-300 rounded-lg ">
                    <h2 className="text-3xl font-bold text-gradient mb-4">Donation Trends</h2>
                    <div className="pb-10 pl-20 pr-20">
                        <DonationTrendsGraph donations={donations} />
                    </div>

                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-gray-300 rounded-lg p-4">
                    <h2 className="text-3xl font-bold text-gradient mb-4">Top Charities Contributed To</h2>
                    <div className="pb-20 pl-20 pr-20 pt-5">
                        <TopCharitiesGraph charityDonations={charityDonations} charities={charities} />
                    </div>
                </div>
                {selectedCharity && <PaymentModal charityId={selectedCharity} onClose={closePaymentModal} />}
            </motion.div>
        </div>
    );
};

export default UserDashboard;