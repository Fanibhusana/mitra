import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
    {
        name: "Aarav Patel",
        role: "Regular Donor",
        text: "Mitra made it so easy to find and support trustworthy charities. I love how transparent the donation process is!",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Sanya Verma",
        role: "NGO Partner",
        text: "Our organization received so much support through Mitra. It's a game-changer for fundraising!",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Rohan Desai",
        role: "Volunteer",
        text: "I’ve never felt more connected to a cause. Mitra is doing an amazing job at making donations impactful.",
        image: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    {
        name: "Priya Sharma",
        role: "Social Activist",
        text: "The impact stories and transparency on Mitra are amazing. I trust every donation I make here.",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
];

function Testimonials() {
    return (
        <section className="py-16 ">
            <div className="max-w-6xl mx-auto text-center">
                {/* Title */}
                <motion.h2
                    className="text-4xl font-extrabold text-gradient mb-10"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    What People Say About Mitra
                </motion.h2>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 flex flex-col items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            {/* Quote Icon */}
                            <FaQuoteLeft className="text-3xl text-blue-500 mb-4" />

                            {/* Testimonial Image */}
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-16 h-16 rounded-full border-4 border-blue-400 mb-4"
                            />

                            {/* Testimonial Content */}
                            <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>

                            {/* Name & Role */}
                            <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                            <span className="text-sm text-gray-500">{testimonial.role}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
