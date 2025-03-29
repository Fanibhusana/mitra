import React from "react";
import { motion } from "framer-motion";

const featuredCharities = [
    {
        name: "Helping Hands",
        description: "Providing food and shelter to those in need.",
        img: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958004/mtk6hxdalvarfhwo9itd.jpg",
    },
    {
        name: "Education for All",
        description: "Ensuring access to education for underprivileged children.",
        img: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958155/vopgxoaai2wilumcotmb.jpg",
    },
    {
        name: "Health First",
        description: "Offering medical aid and healthcare services worldwide.",
        img: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958110/di7jifqr8elpx8kaueax.jpg",
    },
    {
        name: "Disaster Relief Fund",
        description: "Supporting communities affected by natural disasters.",
        img: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742958200/uaccdwpv1goifoftqcgc.jpg",
    },
];

const FeaturedCharities = () => {
    return (
        <section className="py-16 px-6 ">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    className="text-4xl font-bold text-gradient mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Featured Charities
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {featuredCharities.map((charity, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                        >
                            <img
                                src={charity.img}
                                alt={charity.name}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-bold">{charity.name}</h3>
                            <p className="text-gray-600">{charity.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCharities;
