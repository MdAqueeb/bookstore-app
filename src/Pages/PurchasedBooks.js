import React, { useState, useEffect } from 'react';
import { GetPurchasedBooks } from './Controller/Apis'; 
import { useNavigate } from 'react-router-dom';

const PurchasedBooks = () => {
    const [purchases, setPurchases] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPurchases = async () => {
        try {
            const data = await GetPurchasedBooks(); // Should return list of orders with book info
            setPurchases(data.filter(order => order.status === 'PAID'));
        } catch (error) {
            console.error("Error fetching purchased books:", error);
            navigate('/homelogin');
        }
        };

        fetchPurchases();
    }, [navigate]);

    return (
        <>
        <div className="p-6 mx-[94.5px] px-5">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Purchased Books</h1>

            {purchases.length === 0 ? (
            <p className="text-xl text-gray-500">No purchases found.</p>
            ) : (
            <div className="space-y-4">
                {purchases.map((order) => (
                <div key={order.orderid} className="flex items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md">
                    <div className="w-32 h-32">
                    <img src={order.book?.image} alt={order.book?.title} className="w-full h-full object-cover rounded-md" />
                    </div>

                    <div className="pl-4 flex flex-col justify-between w-full">
                    <div className="flex flex-col items-start justify-center">
                        <p className="text-m font-semibold">Title: {order.book?.title}</p>
                        <p className="text-m text-gray-700">Author: {order.book?.author}</p>
                        <p className="text-sm text-gray-600">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>

                    <div className="mt-2">
                        <p className="text-m font-bold text-gray-900">Price: ${order.totalAmount}</p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        </>
    );
};

export default PurchasedBooks;
