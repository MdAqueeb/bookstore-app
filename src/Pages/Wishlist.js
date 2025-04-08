import React, { useState, useEffect } from 'react';
import { GetWishlist } from './Controller/Apis'; // Assuming there's a function to delete the item
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Fetch wishlist items on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await GetWishlist(); // Assuming GetWishlist fetches wishlist items from an API
        setWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        navigate('/homelogin');
      }
    };

    fetchWishlist();
  }, [navigate]);

  // Function to handle item removal
  const handleRemoveItem = async (itemId) => {
    // try {
    //   await DeleteWishlistItem(itemId); // Assuming DeleteWishlistItem deletes an item by its ID
    //   setWishlist(wishlist.filter(item => item.id !== itemId)); // Remove the item from the state
    // } catch (error) {
    //   console.error("Error removing item:", error);
    // }
  };

  return (
    <div className="p-6">
      {wishlist.length === 0 ? (
        <p className="text-xl text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map(item => (
            <div key={item.id} className="flex items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md">
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
                    onClick={() => handleRemoveItem(item.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
