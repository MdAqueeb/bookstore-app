import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPayments } from './Controller/Apis'; // Replace with actual path

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayments = async () => {
        try {
            const data = await GetPayments(); // API call to fetch payments
            setPayments(data);
        } catch (error) {
            console.error("Error fetching payments:", error);
            navigate('/homelogin');
        }
        };

        fetchPayments();
    }, [navigate]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Payment History</h1>
        {payments.length === 0 ? (
            <p className="text-xl text-gray-500">No payment history available.</p>
        ) : (
            <div className="space-y-4">
            {payments.map(payment => (
                <div key={payment.paymentid} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md">
                {/* Payment Details */}
                <div className="mb-2">
                    <p className="text-lg font-semibold">Payment ID: {payment.paymentid}</p>
                    <p className="text-sm text-gray-600">Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-800">Amount: ${payment.amount}</p>
                    <p className="text-sm">
                    Status: <span className={`font-semibold ${
                        payment.paymentStatus === 'PAID'
                        ? 'text-green-600'
                        : payment.paymentStatus === 'FAILED'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}>
                        {payment.paymentStatus}
                    </span>
                    </p>
                </div>

                {/* Razorpay IDs */}
                <div className="mt-2 text-xs text-gray-600">
                    <p>Razorpay Order ID: {payment.razorpayOrderid}</p>
                    {payment.razorpayPaymentid && (
                    <p>Razorpay Payment ID: {payment.razorpayPaymentid}</p>
                    )}
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default PaymentHistory;
