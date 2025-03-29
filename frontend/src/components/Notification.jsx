import React, { useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {message}
            <button onClick={onClose} className="ml-4 text-lg font-bold">X</button>
        </div>
    );
};

export default Notification;