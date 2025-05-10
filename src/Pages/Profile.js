import React, { useState, useEffect } from 'react';
import profilePic from '../assests/Default_pfp.jpg';
import { GetProfile } from './Controller/Apis';
import { useNavigate } from 'react-router-dom';
import Wishlist from './Wishlist';
import RequestSellerRole from './RequestSellerRole';
import SalesOverview from './SalesOverview';
import ManageBooks from './ManageBooks';
// import ManageBooks from './ManageBooks';  // Seller specific
// import SalesOverview from './SalesOverview';  // Seller specific
import ManageUsers from './ManageUsers';  // Admin specific
import ManageSellers from './ManageSellers';  // Admin specific
import ManageAdminBooks from './ManageAdminBooks';
import OrderList from './OrderList';
import PaymentHistory from './PaymentHistory';
import PurchasedBooks from './PurchasedBooks';
// import SystemReports from './SystemReports';  // Admin specific

const Profile = () => {
  const defaultPic = profilePic ? profilePic : null;
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('wishlist'); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    avator: null,
    role: ''
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
          navigate('/signin');
        } else {
          setError('Error fetching profile data');
          navigate("/signin");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');  // Or sessionStorage.removeItem('authToken') if using sessionStorage
    navigate("/");
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
          <p className="text-center text-gray-500">Role: {userData.role}</p>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <a
                href="#wishlist"
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
                href="#Your Books"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSection('Your Books');
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                My Books
              </a>
            </li>
            <li>
              <a
                href="#orders"
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
                href="#payments"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSection('payments');
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Payments
              </a>
            </li>
            {userData.role === 'USER' && (
              <li>
                <a
                  href="#requestsellerrole"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSection('requestsellerrole');
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Request Seller Role
                </a>
              </li>
            )}
            {userData.role === 'SELLER' && (
              <>
                <li>
                  <a
                    href="#salesoverview"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSection('salesoverview');
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Sales Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#managebooks"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSection('managebooks');
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Manage Books
                  </a>
                </li>
              </>
            )}
            {userData.role === 'ADMIN' && (
              <>
                <li>
                  <a
                    href="#manageusers"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSection('manageusers');
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Manage Users
                  </a>
                </li>
                <li>
                  <a
                    href="#managesellers"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSection('managesellers');
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Manage Sellers
                  </a>
                </li>
                <li>
                  <a
                    href="#systemreports"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSection('systemreports');
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Manage Books
                  </a>
                </li>
              </>
            )}
            <li>
              <a
                href="#logout"
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-700 hover:bg-red-500"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {selectedSection === 'wishlist' && <Wishlist />}
        {selectedSection === 'Your Books' && <PurchasedBooks />}
        {selectedSection === 'orders' && <OrderList />}
        {selectedSection === 'payments' && <PaymentHistory />}
        {selectedSection === 'requestsellerrole' && userData.role === 'USER' && <RequestSellerRole />}
        {selectedSection === 'salesoverview' && userData.role === 'SELLER' && <SalesOverview />}
        {selectedSection === 'managebooks' && userData.role === 'SELLER' && <ManageBooks />}
        {selectedSection === 'manageusers' && userData.role === 'ADMIN' && <ManageUsers />}
        {selectedSection === 'managesellers' && userData.role === 'ADMIN' && <ManageSellers />}
        {selectedSection === 'systemreports' && userData.role === 'ADMIN' && <ManageAdminBooks />}

      </div>
    </div>
  );
};

export default Profile;










