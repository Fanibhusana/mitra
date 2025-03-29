import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import {getRole} from "../services/authService.js";

// Sample Charity Data
const charities = [
    { name: "Hope Foundation", description: "Providing food, shelter, and education to underprivileged children.", image: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958004/mtk6hxdalvarfhwo9itd.jpg" },
    { name: "Green Earth Initiative", description: "Working towards a cleaner planet through afforestation.", image: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958061/bcwapzklpclfvtir8sil.jpg" },
    { name: "Health First", description: "Delivering essential healthcare services to underserved communities.", image: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958110/di7jifqr8elpx8kaueax.jpg" },
    { name: "Education for All", description: "Ensuring every child has access to quality education.", image: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958155/vopgxoaai2wilumcotmb.jpg" },
    { name: "Disaster Relief Fund", description: "Providing immediate assistance to natural calamity victims.", image: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958200/uaccdwpv1goifoftqcgc.jpg" },
    { name: "Water for Life", description: "Building wells to provide clean drinking water in rural areas.", image: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958236/uwoakbeqzcdaa67m54si.jpg" },
    { name: "Animal Rescue League", description: "Saving and rehabilitating stray and endangered animals.", image: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958276/ndzumdkxah4fyjdasj8i.jpg" },
    { name: "Women Empowerment Network", description: "Providing skill development and employment opportunities for women.", image: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958313/fyjselkfubgpfsegtyts.jpg" },
    { name: "Elderly Care Foundation", description: "Supporting elderly individuals with healthcare and companionship.", image: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958349/lp4dz8in4mf8bn3nynyp.jpg" },
    { name: "Tech for Good", description: "Bringing technology education to underprivileged youth.", image: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958389/qycwtuwzaaruczbl86va.jpg" },
    { name: "Food for All", description: "Delivering meals to those in need and fighting food insecurity.", image: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958425/helyr1xtskyi3nzpixxp.jpg" },
    { name: "Orphan Care Initiative", description: "Providing love, care, and education to orphaned children.", image: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958470/wotkvslaenucrkuk96cq.jpg" },
];

const CharityPage = ({ user }) => {
    const navigate = useNavigate();

    const handleDonateClick = () => {
        if (getRole() === "USER") {
            navigate("/user-dashboard");
        } else {
            navigate("/signup/user");
        }
    };

    return (
        <div className="bg-background">
        <div className="min-h-screen bg-background pt-8 pb-20 px-6">
            {/* Heading Section */}
            <section className="relative w-full min-h-[50vh] flex items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-3xl text-center"
                >
                    <h1 className="text-5xl font-extrabold text-gradient leading-tight">
                        Support a Charity, Change Lives
                    </h1>
                    <p className="mt-4 text-lg text-gray-700">
                        Your contribution makes a real difference. Choose a cause and help those in need.
                    </p>
                </motion.div>
            </section>


            {/* Charity Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {charities.map((charity, index) => (
                    <motion.div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                    >
                        <img src={charity.image} alt={charity.name} className="w-full h-48 object-cover" />
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-2xl font-bold text-gray-800">{charity.name}</h3>
                            <p className="text-gray-600 text-sm mt-2 flex-grow">{charity.description}</p>
                            <div className="mt-4 flex justify-center">
                                <motion.button
                                    onClick={handleDonateClick}
                                    className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-gradient-to-r from-blue-500 to-indigo-600"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Donate Now
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
            <Footer/>
        </div>
    );
};

export default CharityPage;
