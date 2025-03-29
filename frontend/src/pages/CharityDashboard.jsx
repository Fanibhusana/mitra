import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchData } from "../services/dataService.js";
import PaymentModal from "../components/PaymentModal";
import { useNotification } from "../NotificationContext.jsx";
import { motion } from "framer-motion";
import ProfileImage from "../components/ProfileImage";
import PaginationControls from "../components/PaginationControls";
import LiveCounter from "../components/LiveCounter";
import EditProfileFormCharity from "../components/EditProfileFormCharity.jsx";
import CharityDonationList from "../components/CharityDonationList.jsx";
import axiosInstance from "../services/axiosInstance.js";

const CharityDashboard = () => {
    const [donations, setDonations] = useState([]);
    const [charityInfo, setCharityInfo] = useState({
        id: 0,
        email: "",
        name: "",
        password: "",
        description: "",
        contact: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        charityImageUrl: ""
    });
    const [donationPage, setDonationPage] = useState(1);
    const [donationsPerPage] = useState(10);
    const [editMode, setEditMode] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [totalDonationPages, setTotalDonationPages] = useState(0);
    const [totalSum, setTotalSum] = useState(0);
    const [userDonations, setUserDonations] = useState({});
    const [selectedCharity, setSelectedCharity] = useState(null);
    const navigate = useNavigate();
    const showNotification = useNotification();

    useEffect(() => {
        const fetchDataForCharity = async () => {
            try {
                const storedEmail = localStorage.getItem("email");

                const charityResponse = await fetchData(`/charities/email/${storedEmail}`);
                const { id, name, email, description, contact, country, state, city, zip, charityImageUrl } = charityResponse;

                const donationResponse = await fetchData(`/transactions/charity/email/${storedEmail}`, {
                    page: donationPage - 1,
                    size: donationsPerPage,
                    sort: "timestamp,desc"
                });
                const updatedDonations = donationResponse.content.map(donation => ({
                    ...donation,
                    donorName: donation.donorName || donation.userName || "Anonymous Donor",
                    userId: donation.user?.id
                }));

                setDonations(updatedDonations);
                setTotalDonationPages(donationResponse.totalPages);

                const totalSumResponse = await fetchData(`/transactions/charity/${id}/total-sum`);
                setTotalSum(totalSumResponse);

                const usersResponse = await fetchData(`/transactions/charity/${id}/users`);
                const users = usersResponse;

                const userDonationsData = {};
                for (const user of users) {
                    const userSumResponse = await fetchData(`/transactions/charity/${id}/user/${user.id}/total-sum`);
                    userDonationsData[user.id] = { name: user.name, total: userSumResponse };
                }
                setUserDonations(userDonationsData);

                if (storedEmail) {
                    setCharityInfo({ id, email: storedEmail, name, description, contact, country, state, city, zip, charityImageUrl });
                }
            } catch (error) {
                let errorMessage = "An unexpected error occurred. Please try again later.";
                if (error.message.includes("DataIntegrityViolationException")) {
                    errorMessage = "Data integrity violation. Please ensure your input is correct.";
                }
                showNotification(errorMessage, "error");
            }
        };

        fetchDataForCharity();
    }, [donationPage]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleUpdateCharity = async (formData) => {
        if (!formData.password) {
            setPasswordError("Password cannot be blank");
            return;
        }
        setPasswordError("");
        try {
            const response = await axiosInstance.put(`/charities/${charityInfo.id}`, formData);
            setCharityInfo(response);
            setEditMode(false);
            showNotification("Charity updated successfully.", "success");
        } catch (error) {
            showNotification("An error occurred while updating charity. Please try again later.", "error");
        }
    };

    const paginateDonations = (pageNumber) => setDonationPage(pageNumber);

    const closePaymentModal = () => {
        setSelectedCharity(null);
    };

    return (
        <div className="bg-background text-gray-900 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="container mx-auto py-16 px-6"
            >
                <h1 className="text-5xl font-extrabold text-gradient leading-tight text-center mb-8">Charity Dashboard</h1>
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                    <div className="ml-4 mb-4">
                        <p className="text-2xl font-bold">Name: {charityInfo.name}</p>
                        <p className="text-lg text-gray-600">Email: {charityInfo.email}</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <ProfileImage userId={charityInfo.id} profileImageUrl={charityInfo.charityImageUrl} setProfileImageUrl={(url) => setCharityInfo({ ...charityInfo, charityImageUrl: url })} />
                    </div>
                    <p className="text-xl font-semibold">Total Donations Received:₹<LiveCounter value={totalSum} /></p>

                </div>
                {editMode ? (
                    <EditProfileFormCharity profileInfo={charityInfo} onSave={handleUpdateCharity} onCancel={() => setEditMode(false)} />
                ) : (
                    <button onClick={handleEditClick} className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button mb-8">Edit Profile</button>
                )}
                <CharityDonationList donations={donations} title="Donations Received" />
                <PaginationControls currentPage={donationPage} totalPages={totalDonationPages} onPageChange={paginateDonations} />

                <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                    <h2 className="text-3xl font-bold text-gradient mb-4">Total Donations from Individual Users</h2>
                    <ul className="space-y-4">
                        {Object.keys(userDonations).length > 0 ? (
                            Object.entries(userDonations).map(([userId, { name, total }]) => (
                                <li key={userId} className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                                    <p className="text-lg font-semibold">User Name: <span className="text-blue-600">{name}</span></p>
                                    <p className="text-lg">Total Donated: <span className="text-green-600">₹{total}</span></p>
                                </li>
                            ))
                        ) : (
                            <p className="text-red-500">No donations from individual users</p>
                        )}
                    </ul>
                </div>
                {selectedCharity && <PaymentModal charityId={selectedCharity} onClose={closePaymentModal} />}
            </motion.div>
        </div>
    );
};

export default CharityDashboard;