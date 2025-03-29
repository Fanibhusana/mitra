import { motion } from "framer-motion";
import { FaHandshake, FaSeedling, FaChartLine  } from "react-icons/fa";
import Footer from "../components/Footer.jsx";
import team from "../assets/team.jpg"
function AboutUs() {
    return (
        <div className="bg-background text-gray-900">
            {/* Hero Section */}
            <section className="relative w-full min-h-[70vh] flex items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-3xl text-center"
                >
                    <h1 className="text-5xl font-extrabold text-gradient leading-tight">
                        About <span className="text-blue-500">Mitra</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-700">
                        At Mitra, we believe that every act of kindness has the power to change lives. Our mission is to create a world where generosity is seamless, transparent, and impactful, ensuring that help reaches those who need it the most. Whether it's supporting education, healthcare, disaster relief, or community development, we make giving easy and meaningful.
                    </p>
                </motion.div>
            </section>

            {/* Our Mission & Vision */}
            <section className="py-16 px-6 max-w-6xl mx-auto text-center">
                <motion.h2
                    className="text-4xl font-bold text-gradient mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Our Mission & Vision
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    At Mitra, we believe in the power of compassion and collective action. Our mission
                    is to create a seamless, secure, and transparent platform where people can donate to causes
                    they care about with full confidence.
                    <br /> <br />
                    Our vision is to foster a world where no one is left behind—where generosity knows no
                    boundaries, and every act of kindness leads to a better tomorrow.
                </motion.p>
            </section>

            {/* Core Values */}
            <section className="py-16 px-6 ">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2
                        className="text-4xl font-bold text-gradient mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Our Core Values
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <FaHandshake />, title: "Integrity & Trust", text: "We prioritize honesty and transparency in every donation." },
                            { icon: <FaSeedling />, title: "Sustainable Impact", text: "We focus on long-term solutions that create lasting change." },
                            { icon: <FaChartLine />, title: "Empowerment", text: "We empower donors and charities to make meaningful contributions." },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                            >
                                <div className="text-5xl text-blue-500 mb-4 flex justify-center">{item.icon}</div>
                                <h3 className="text-2xl font-bold">{item.title}</h3>
                                <p className="text-gray-600 mt-2">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2
                        className="text-4xl font-bold text-gradient mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Meet Our Team
                    </motion.h2>

                    {/* Team Members Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {[
                            { name: "Fanibhusana", role: "Java Full Stack Developer", img: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742967639/b3bxi9mjdblbf9cdfocc.jpg" },
                            { name: "Prathap Gowda", role: "Software Developer", img: "https://img.icons8.com/?size=100&id=108652&format=png&color=000000" },
                            { name: "Srinivasan B", role: "Frontend Developer", img: "https://img.icons8.com/?size=100&id=108652&format=png&color=000000" },
                            { name: "Sowmya NM", role: "UI UX Developer", img: "https://res.cloudinary.com/drxtrwjvr/image/upload/v1742967686/gzoujothpxjrvgm0m2ao.jpg" },
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                            >
                                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-bold">{member.name}</h3>
                                <p className="text-gray-600">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Team Photo Section */}
                    <motion.div
                        className="max-w-4xl mx-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            src={team}
                            alt="Mitra Team"
                            className="w-full rounded-2xl shadow-lg"
                        />
                    </motion.div>
                </div>
            </section>


            {/* Call to Action */}
            <section className="py-16 px-6 text-center bg-blue-500 text-white">
                <motion.h2
                    className="text-4xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Join Us in Making a Difference
                </motion.h2>
                <motion.p
                    className="text-lg mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    Be a part of a movement that brings real change.
                    Sign up now and start making an impact today.
                </motion.p>
                <motion.a
                    href="/signup/user"
                    className="mt-6 inline-block px-6 py-3 rounded-full bg-white text-blue-500 font-semibold shadow-lg hover:shadow-2xl transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Sign Up Now
                </motion.a>
            </section>
            <Footer/>
        </div>
    );
}

export default AboutUs;
