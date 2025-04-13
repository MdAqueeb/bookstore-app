import React, { useState, useEffect } from 'react';
import { GetCart, RemoveCartItem } from './Controller/Apis'; // Assuming these functions interact with your API
import { useNavigate } from 'react-router-dom';
import HeaderLogin from '../Components/HeaderLogin';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await GetCart(); // Assuming GetCart fetches cart items from an API
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        navigate('/homelogin'); // Redirect to login if there's an error fetching cart
      }
    };

    fetchCart();
  }, [navigate]);

  // Function to handle item removal
  const handleRemoveItem = async (itemId) => {
    try {
      // Remove the item from the backend
      await RemoveCartItem(itemId);
      
      // Refetch the cart to get the updated list after deletion
      const data = await GetCart();
      setCart(data);

      // Navigate to cart page (optional, based on your preference)
      navigate('/cart');
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    // Navigate to checkout page with cart data
    navigate('/checkout', { state: { cart } });
  };

  return (
    <>
    <HeaderLogin />
    <div className="p-6 mx-[94.5px] px-5">
        
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-500">Your cart is empty.</p>
          <button 
            onClick={() => navigate('/allbooks')} 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Go to Shop
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.bookid} className="flex items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md">
                {/* Left Section: Image */}
                <div className="w-32 h-32">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                </div>

                {/* Right Section: Item details */}
                <div className="pl-4 flex flex-col justify-between w-full">
                  {/* Name and Author (Centered in the middle) */}
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-m font-semibold">Name: {item.title}</p>
                    <p className="text-m text-gray-700">Author: {item.author}</p>
                  </div>

                  {/* Price and Delete Button aligned to the right */}
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-m font-bold text-gray-900">Price: ${item.price}</p>
                    {/* Delete Button */}
                    <button 
                      onClick={() => handleRemoveItem(item.bookid)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm mb-6">
            <p className="text-lg font-bold text-gray-800">Total Price: ${calculateTotalPrice()}</p>
          </div>

          {/* Order Button */}
          <div className="flex justify-center">
            <button 
              onClick={handleProceedToCheckout} 
              className="px-8 py-3 bg-green-600 text-white text-xl rounded-md hover:bg-green-700 focus:outline-none"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Cart;
