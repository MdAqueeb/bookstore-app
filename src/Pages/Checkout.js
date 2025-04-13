import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state.cart;  // The cart items passed from the Cart component

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    // Handle placing the order logic (e.g., save order, notify admin, etc.)
    console.log('Order placed successfully!');
    navigate('/order-confirmation'); // Redirect to an order confirmation page
  };

  return (
    <div className="p-6 mx-[94.5px] px-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="space-y-4 mb-6">
        {cart.map(item => (
          <div key={item.bookid} className="flex items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md">
            <div className="w-32 h-32">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="pl-4 flex flex-col justify-between w-full">
              <div className="flex flex-col items-start justify-center">
                <p className="text-m font-semibold">Name: {item.title}</p>
                <p className="text-m text-gray-700">Author: {item.author}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-m font-bold text-gray-900">Price: ${item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm mb-6">
        <p className="text-lg font-bold text-gray-800">Total Price: ${calculateTotalPrice()}</p>
      </div>

      {/* Shipping and Payment Form */}
      <div className="mb-6">
        <label className="block text-gray-800 mb-2">Shipping Address</label>
        <input type="text" placeholder="Enter your shipping address" className="w-full p-3 border border-gray-300 rounded-md mb-4" />
        <label className="block text-gray-800 mb-2">Payment Method</label>
        <select className="w-full p-3 border border-gray-300 rounded-md mb-4">
          <option value="credit_card">Credit Card</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>

      {/* Place Order Button */}
      <div className="flex justify-center">
        <button
          onClick={handlePlaceOrder}
          className="px-8 py-3 bg-green-600 text-white text-xl rounded-md hover:bg-green-700 focus:outline-none"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
