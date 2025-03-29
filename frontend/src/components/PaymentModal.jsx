import { useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../services/axiosInstance.js";
import { useNotification } from "../NotificationContext.jsx";
import { FaCreditCard, FaLock, FaMoneyBillWave } from "react-icons/fa";
import visaLogo from "../assets/visa.png";
import mastercardLogo from "../assets/mastercard.png";

const PaymentModal = ({ charityId, onClose }) => {
    const [amount, setAmount] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [name, setName] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");
    const userEmail = localStorage.getItem("email");
    const showNotification = useNotification();

    const handlePayment = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            showNotification("Please enter a valid amount.", "error");
            return;
        }

        if (!cardNumber || cardNumber.length < 16 || !expiry || !cvv || !name) {
            showNotification("Please fill all card details.", "error");
            return;
        }

        setIsProcessing(true);
        setPaymentStatus("");

        try {
            const response = await axiosInstance.post("/transactions", {
                user: { email: userEmail },
                charity: { id: charityId },
                amount: parseFloat(amount),
                status: "SUCCESS",
                timestamp: new Date().toISOString()
            });

            if (response.data) {
                setPaymentStatus("success");
                showNotification("Payment Successful!", "success");
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setPaymentStatus("failed");
                showNotification("Payment failed. Try again.", "error");
            }
        } catch (error) {
            console.error("Payment error:", error);
            setPaymentStatus("error");
            showNotification("Something went wrong. Please try later.", "error");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full transform scale-100 transition-all duration-300"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Secure Payment</h2>

                {/* Amount Input */}
                <div className="relative mb-4">
                    <label className="block text-gray-600 mb-2">Enter Amount</label>
                    <div className="relative">
                        <FaMoneyBillWave className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="number"
                            min="1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter donation amount"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                </div>

                {/* Card Details Input */}
                <div className="relative mb-4">
                    <label className="block text-gray-600 mb-2">Card Number</label>
                    <div className="relative">
                        <FaCreditCard className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            maxLength="16"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                            placeholder="1234 5678 9012 3456"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    {/* Expiry Date */}
                    <div className="w-1/2">
                        <label className="block text-gray-600 mb-2">Expiry Date</label>
                        <input
                            type="text"
                            maxLength="5"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value.replace(/[^0-9/]/g, ""))}
                            placeholder="MM/YY"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* CVV */}
                    <div className="w-1/2">
                        <label className="block text-gray-600 mb-2">CVV</label>
                        <input
                            type="password"
                            maxLength="3"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                            placeholder="123"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                </div>

                {/* Cardholder Name */}
                <div className="mt-4">
                    <label className="block text-gray-600 mb-2">Cardholder Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {/* Payment Logos */}
                <div className="flex justify-center mt-4 space-x-4">
                    <img src={visaLogo} alt="Visa" className="w-12 h-8" />
                    <img src={mastercardLogo} alt="MasterCard" className="w-12 h-8" />
                </div>

                {/* Payment Button */}
                <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
                >
                    <FaLock />
                    {isProcessing ? "Processing..." : `Donate $${amount}`}
                </button>

                {/* Status Messages */}
                {isProcessing && <p className="text-center text-gray-600 mt-3">Processing your payment...</p>}
                {paymentStatus === "success" && <p className="text-center text-green-600 mt-3">Payment Successful!</p>}
                {paymentStatus === "failed" && <p className="text-center text-red-600 mt-3">Payment Failed. Try again.</p>}
                {paymentStatus === "error" && <p className="text-center text-red-600 mt-3">Something went wrong. Please try later.</p>}

                {/* Close Button */}
                <button
                    onClick={onClose}
                    disabled={isProcessing}
                    className="w-full mt-4 bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition-transform transform hover:scale-105"
                >
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
};

export default PaymentModal;
