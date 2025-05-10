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
            setPurchases(data);
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

            {!purchases || !purchases.books || purchases.books.length === 0 ? (
            <p className="text-xl text-gray-500">No purchases found.</p>
            ) : (
            <div className="space-y-4">
                {purchases.books.map((book) => (
                <div key={book.bookid} className="flex items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md">
                    <div className="w-32 h-32">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-md" />
                    </div>

                    <div className="pl-4 flex flex-col justify-between w-full">
                    <div className="flex flex-col items-start justify-center">
                        <p className="text-m font-semibold">Title: {book.title}</p>
                        <p className="text-m text-gray-700">Author: {book.author}</p>
                        {/* <p className="text-sm text-gray-600">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p> */}
                    </div>
                    <div className='absolute button-4 right-4  w-[25%]'>
                        <button
                            className="bg-green-600 text-white px-5 py-2 rounded-md hover-md hover:bg-green-800"
                            >
                                Read Now 
                        </button>
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
