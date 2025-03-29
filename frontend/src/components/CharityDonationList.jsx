import React from "react";

const CharityDonationList = ({ donations, title }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-4">{title}</h2>
            <ul className="space-y-4">
                {donations.length > 0 ? (
                    donations.map((donation) => (
                        <li key={donation.id} className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center justify-between">
                            <p className="text-lg font-semibold text-gray-800">
                                { `Received ₹${donation.amount} from ${donation.donorName}` }
                            </p>
                            <p className="text-sm text-gray-600">
                                on {new Date(donation.timestamp).toLocaleDateString()}
                            </p>

                        </li>
                    ))
                ) : (
                    <p className="text-gray-600">No donations available</p>
                )}
            </ul>
        </div>
    );
};

export default CharityDonationList;