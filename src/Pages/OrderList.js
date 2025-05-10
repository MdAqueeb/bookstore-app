import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetOrders, CancelOrder, InitiatePayment } from './Controller/Apis'; 
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
        try {
        const data = await GetOrders(); 
        setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            navigate('/homelogin');
        }
        };

        fetchOrders();
    }, [navigate]);

    // Cancel order handler
    const handleCancelOrder = async (orderId) => {
        try {
        await CancelOrder(orderId); // API call to cancel order
        const updatedOrders = await GetOrders(); // Refresh the list
        setOrders(updatedOrders);
        } catch (error) {
        console.error("Error cancelling order:", error);
        }
    };

    const handlePayNow = async (orderId) => {
        try {
        const result = await InitiatePayment(orderId); // custom API to get Razorpay order data
        
        const options = {
            key: "rzp_test_B2OeZIQXQ0nF8q",
            amount: result.amount,
            currency: 'INR',
            name: 'Book Store',
            description: 'Complete your pending order',
            order_id: result.razorpayOrderId,
            handler: async function (res) {
            try {
                await axios.post(`http://localhost:8080/api/orders/verify-payment`, {
                razorpayPaymentId: res.razorpay_payment_id,
                razorpayOrderId: res.razorpay_order_id,
                razorpaySignature: res.razorpay_signature
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
                });
                alert('Payment Successful');
                const updatedOrders = await GetOrders();
                setOrders(updatedOrders);
            } catch (err) {
                console.error('Verification failed', err);
                alert('Payment failed');
            }
            },
            prefill: {
            email: result.email
            },
            theme: {
            color: '#3399cc'
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        } catch (error) {
        console.error("Error initiating payment:", error);
        alert("Payment initiation failed.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Order History</h1>
            {orders.length === 0 ? (
            <p className="text-xl text-gray-500">No orders found.</p>
            ) : (
            <div className="space-y-4">
            {orders.map(order => (
                <div key={order.orderid} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md">
                {/* Order Info */}
                <div className="mb-2">
                    <p className="text-lg font-semibold">Order ID: {order.orderid}</p>
                    <p className="text-sm text-gray-600">Date: {new Date(order.orderDate).toISOString().split('T')[0]}</p>
                </div>

                {/* Status and Total */}
                <div className="flex justify-between items-center">
                    <p className="text-sm">
                    Status: <span className={`font-semibold ${order.status === 'PAID' ? 'text-green-600' : order.status === 'CANCELLED' ? 'text-red-600' : 'text-yellow-600'}`}>
                        {order.status}
                    </span>
                    </p>
                    <p className="text-sm font-medium text-gray-800">Total: ${order.totalAmount}</p>
                </div>

                {/* Razorpay Order ID */}
                <div className="mt-1">
                    <p className="text-xs text-gray-500">Razorpay Order ID: {order.razorpayOrderId}</p>
                </div>

                {/* Cancel Button (Only if Pending) */}
                {order.status === 'PENDING' && (
                <div className="mt-3 flex gap-3">
                    <button
                        onClick={() => handlePayNow(order.razorpayOrderId)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Pay Now
                    </button>
                    <button
                        onClick={() => handleCancelOrder(order.razorpayOrderId)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Cancel Order
                    </button>
                    </div>
                )}
                </div>
            ))}
            </div>
        )}
        </div>
    );
    };

    export default OrderList;
