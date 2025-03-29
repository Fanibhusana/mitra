import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { getToken } from "../services/authService";
import { useNotification } from "../NotificationContext";
import { fetchData } from "../services/dataService";
import ProfileImage from "../components/ProfileImage";
import PaginationControls from "../components/PaginationControls";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [charities, setCharities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userPage, setUserPage] = useState(1);
    const [charityPage, setCharityPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [charitiesPerPage] = useState(10);
    const [totalUserPages, setTotalUserPages] = useState(0);
    const [totalCharityPages, setTotalCharityPages] = useState(0);
    const [userEmail, setUserEmail] = useState("");
    const [charityEmail, setCharityEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [charityId, setCharityId] = useState("");
    const [donationsGiven, setDonationsGiven] = useState([]);
    const [donationsReceived, setDonationsReceived] = useState([]);
    const [charityTotal, setCharityTotal] = useState(0);
    const [userTotal, setUserTotal] = useState(0);
    const [donationsGivenPage, setDonationsGivenPage] = useState(1);
    const [donationsReceivedPage, setDonationsReceivedPage] = useState(1);
    const [totalDonationsGivenPages, setTotalDonationsGivenPages] = useState(0);
    const [totalDonationsReceivedPages, setTotalDonationsReceivedPages] = useState(0);
    const navigate = useNavigate();
    const showNotification = useNotification();

    useEffect(() => {
        const fetchDataForAdmin = async () => {
            try {
                const usersResponse = await fetchData(`/users/paginated`, { page: userPage - 1, size: usersPerPage });
                setUsers(usersResponse.content);
                setTotalUserPages(usersResponse.totalPages);

                const charitiesResponse = await fetchData(`/charities/paginated`, { page: charityPage - 1, size: charitiesPerPage });
                setCharities(charitiesResponse.content);
                setTotalCharityPages(charitiesResponse.totalPages);
            } catch (error) {
                showNotification(error.message, "error");
            } finally {
                setLoading(false);
            }
        };

        fetchDataForAdmin();
    }, [userPage, charityPage]);

    const handleDeleteUser = async (userId) => {
        try {
            const token = getToken();
            const headers = { Authorization: `Bearer ${token}` };

            await axiosInstance.delete(`/users/${userId}`, { headers });
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
            showNotification("Failed to delete user. Please try again later.", "error");
        }
    };

    const handleDeleteCharity = async (charityId) => {
        try {
            const token = getToken();
            const headers = { Authorization: `Bearer ${token}` };

            await axiosInstance.delete(`/charities/${charityId}`, { headers });
            setCharities(charities.filter(charity => charity.id !== charityId));
        } catch (error) {
            console.error("Error deleting charity:", error);
            showNotification("Failed to delete charity. Please try again later.", "error");
        }
    };

    const fetchDonationsByUser = async () => {
        try {
            const token = getToken();
            const headers = { Authorization: `Bearer ${token}` };

            const donationGivenResponse = await axiosInstance.get(`/transactions/user/email/${userEmail}`, {
                headers,
                params: { page: donationsGivenPage - 1, size: charitiesPerPage }
            });
            setDonationsGiven(donationGivenResponse.data.content);
            setTotalDonationsGivenPages(donationGivenResponse.data.totalPages);
        } catch (error) {
            console.error("Error fetching donations by user:", error);
            showNotification("An error occurred while fetching donations by user. Please try again later.", "error");
        }
    };

    const fetchDonationsForCharity = async () => {
        try {
            const token = getToken();
            const headers = { Authorization: `Bearer ${token}` };

            const donationReceivedResponse = await axiosInstance.get(`/transactions/charity/email/${charityEmail}`, {
                headers,
                params: { page: donationsReceivedPage - 1, size: charitiesPerPage }
            });
            setDonationsReceived(donationReceivedResponse.data.content);
            setTotalDonationsReceivedPages(donationReceivedResponse.data.totalPages);
        } catch (error) {
            console.error("Error fetching donations for charity:", error);
            showNotification("An error occurred while fetching donations for charity. Please try again later.", "error");
        }
    };

    const fetchCharityTotal = async () => {
        try {
            const token = getToken();
            const headers = { Authorization: `Bearer ${token}` };
            const totalSumResponse = await axiosInstance.get(`/admin/charity/${charityId}/total-sum`, { headers });
            setCharityTotal(totalSumResponse.data);
        } catch (error) {
            showNotification("Error fetching charity total", "error");
            console.error("Error fetching charity total:", error);
        }
    };

    const fetchUserTotal = async () => {
        try {
            const token = getToken();
            const headers = { Authorization: `Bearer ${token}` };
            const totalSumResponse = await axiosInstance.get(`/admin/user/${userId}/total-sum`, { headers });
            setUserTotal(totalSumResponse.data);
        } catch (error) {
            showNotification("Error fetching user total", "error");
            console.error("Error fetching user total:", error);
        }
    };

    useEffect(() => {
        if (userEmail) {
            fetchDonationsByUser();
        }
    }, [donationsGivenPage]);

    useEffect(() => {
        if (charityEmail) {
            fetchDonationsForCharity();
        }
    }, [donationsReceivedPage]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-background text-gray-900 min-h-screen">
            <div className="container mx-auto py-16 px-6">
                <h1 className="text-5xl font-extrabold text-gradient leading-tight text-center mb-8">Admin Dashboard</h1>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-bold text-gradient mb-4">All Users</h2>
                            <ul>
                                {users.map(user => (
                                    <li key={user.id} className="mb-2 flex items-center justify-between">
                                        <ProfileImage userId={user.id} profileImageUrl={user.profileImageUrl} />
                                        <div className="ml-4">
                                            <p className="text-lg font-semibold">{user.name}</p>
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                        </div>
                                        <button onClick={() => handleDeleteUser(user.id)} className="px-4 py-2 bg-red-500 text-white rounded-full">Delete</button>
                                    </li>
                                ))}
                            </ul>
                            <PaginationControls currentPage={userPage} totalPages={totalUserPages} onPageChange={setUserPage} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-bold text-gradient mb-4">All Charities</h2>
                            <ul>
                                {charities.map(charity => (
                                    <li key={charity.id} className="mb-2 flex items-center justify-between">
                                        <ProfileImage userId={charity.id} profileImageUrl={charity.charityImageUrl} />
                                        <div className="ml-4">
                                            <p className="text-lg font-semibold">{charity.name}</p>
                                            <p className="text-sm text-gray-600">{charity.email}</p>
                                        </div>
                                        <button onClick={() => handleDeleteCharity(charity.id)} className="px-4 py-2 bg-red-500 text-white rounded-full">Delete</button>
                                    </li>
                                ))}
                            </ul>
                            <PaginationControls currentPage={charityPage} totalPages={totalCharityPages} onPageChange={setCharityPage} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-bold text-gradient mb-4">Donations Given by User</h2>
                            <input
                                type="text"
                                placeholder="Enter user email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
                            />
                            <button onClick={fetchDonationsByUser} className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button mb-8">
                                Fetch Donations
                            </button>
                            <ul>
                                {donationsGiven.length > 0 ? (
                                    donationsGiven.map((donation) => (
                                        <li key={donation.id} className="mb-2">
                                            Donated ₹{donation.amount} to {donation.charityName} on {new Date(donation.timestamp).toLocaleDateString()}
                                        </li>
                                    ))
                                ) : (
                                    <p>No donations given</p>
                                )}
                            </ul>
                            <PaginationControls currentPage={donationsGivenPage} totalPages={totalDonationsGivenPages} onPageChange={setDonationsGivenPage} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-bold text-gradient mb-4">Donations Received by Charity</h2>
                            <input
                                type="text"
                                placeholder="Enter charity email"
                                value={charityEmail}
                                onChange={(e) => setCharityEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
                            />
                            <button onClick={fetchDonationsForCharity} className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button mb-8">
                                Fetch Donations
                            </button>
                            <ul>
                                {donationsReceived.length > 0 ? (
                                    donationsReceived.map((donation) => (
                                        <li key={donation.id} className="mb-2">
                                            Received ₹{donation.amount} from {donation.userName} on {new Date(donation.timestamp).toLocaleDateString()}
                                        </li>
                                    ))
                                ) : (
                                    <p>No donations received</p>
                                )}
                            </ul>
                            <PaginationControls currentPage={donationsReceivedPage} totalPages={totalDonationsReceivedPages} onPageChange={setDonationsReceivedPage} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-bold text-gradient mb-4">Total Donations Given by User</h2>
                            <input
                                type="text"
                                placeholder="Enter user ID"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
                            />
                            <button onClick={fetchUserTotal} className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button mb-8">
                                Fetch Total
                            </button>
                            <p>Total Donations Given: ₹{userTotal}</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-bold text-gradient mb-4">Total Donations Received by Charity</h2>
                            <input
                                type="text"
                                placeholder="Enter charity ID"
                                value={charityId}
                                onChange={(e) => setCharityId(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
                            />
                            <button onClick={fetchCharityTotal} className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button mb-8">
                                Fetch Total
                            </button>
                            <p>Total Donations Received: ₹{charityTotal}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;