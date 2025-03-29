import { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = "info") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <NotificationContext.Provider value={showNotification}>
            {children}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-80 px-6 py-3 rounded-lg shadow-lg text-white text-center ${
                            notification.type === "error" ? "bg-red-500" : "bg-blue-500"
                        }`}
                    >
                        {notification.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </NotificationContext.Provider>
    );
};