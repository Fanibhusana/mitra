import React from "react";
import { Chart, registerables } from "chart.js";
import { Line, Pie } from "react-chartjs-2";

// Register all necessary components
Chart.register(...registerables);

const DonationTrendsGraph = ({ donations }) => {
    const data = {
        labels: donations.map(donation => new Date(donation.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: "Donations",
                data: donations.map(donation => donation.amount),
                fill: false,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
            },
        ],
    };

    return <Line data={data} />;
};

const TopCharitiesGraph = ({ charityDonations, charities }) => {
    const labels = Object.keys(charityDonations).map(id => {
        const matchedCharity = charities.find(c => c.id.toString() === id);
        return matchedCharity ? matchedCharity.name : "Unknown Charity";
    });
    const data = {
        labels: labels,
        datasets: [
            {
                data: Object.values(charityDonations),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
            },
        ],
    };

    return <Pie data={data} />;
};

export { DonationTrendsGraph, TopCharitiesGraph };