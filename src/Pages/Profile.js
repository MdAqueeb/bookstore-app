import React, { useState, useEffect } from 'react';
import profilePic from '../assests/Default_pfp.jpg';
import { GetProfile } from './Controller/Apis';
import { useNavigate } from 'react-router-dom';
import Wishlist from './Wishlist';

const Profile = () => {
  const defaultPic = profilePic ? profilePic : null;
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('profile'); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    avator: null,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await GetProfile();
        if (data) {
          setUserData(data);
        }
      } catch (err) {
        console.error('Error:', err);

        // Check if the error is about user authentication
        if (err.message === 'User is not authenticated') {
          // Redirect to SignIn page
          navigate('/signin');
        } else {
          setError('Error fetching profile data');
          navigate("/signin")
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]); // Added navigate to the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleLogout = () => {
    // Clear the JWT token from localStorage (or sessionStorage)
    localStorage.removeItem('authToken');  // Or sessionStorage.removeItem('authToken') if using sessionStorage
    navigate("/")
    
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <div className="w-24 h-24 rounded-full mx-auto bg-gray-300 flex items-center justify-center">
            {userData.avator ? (
              <img
                src={userData.avator || defaultPic}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-xl">{userData.name?.[0] || 'U'}</span>
            )}
          </div>
          <h2 className="text-center mt-2 text-xl font-semibold">{userData.name}</h2>
          <p className="text-center text-gray-500">{userData.email}</p>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <a
                href="</EditProfile>"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSection('editprofile');
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Edit Profile
              </a>
            </li>
            <li>
              <a
                href="</Wishlist>"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSection('wishlist');
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Wishlist
              </a>
            </li>
            <li>
              <a
                href="</Orders>"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSection('orders');
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Orders
              </a>
            </li>
            <li>
              <a
                href="</Payment>"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSection('payments');
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Payments
              </a>
            </li>
            <li>
              <a
                href="#logout"
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-700 hover:bg-red-500 "
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Additional content can go here */}
        {selectedSection === 'editprofile' && <div>Your Edit Profile</div>}
        {selectedSection === 'wishlist' &&  <Wishlist></Wishlist>}
        {selectedSection === 'orders' && <div>Your orders</div>}
        {selectedSection === 'payments' && <div>Manage your payments</div>}
      </div>
    </div>
  );
};

export default Profile;
