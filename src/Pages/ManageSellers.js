import React, { useState, useEffect } from 'react';
import {
  GetAllSellers,
  ChangeSellerToUser,
  DeleteUser,
  GetSellersBooks,
  ApproveBook,
  DisapproveBook
} from './Controller/Apis';

const ManageSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [Books, SetBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellersData = await GetAllSellers();
        setSellers(sellersData);
      } catch (err) {
        setError('Error fetching sellers');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const sellersData = await GetSellersBooks();
        SetBooks(sellersData);
      } catch (err) {
        setError('Error fetching Books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleChangeRoleToUser = async (sellerId) => {
    try {
      await ChangeSellerToUser(sellerId);
      setSellers(prev =>
        prev.map(seller =>
          seller.id === sellerId ? { ...seller, role: 'user' } : seller
        )
      );
      alert("Role Changed!");
    } catch (err) {
      setError('Error changing role');
    }
  };

  const handleDeleteSeller = async (sellerId) => {
    try {
      await DeleteUser(sellerId);
      setSellers(prev => prev.filter(seller => seller.id !== sellerId));
      alert("Delete User Successfully!");
    } catch (err) {
      setError('Error deleting seller');

    }
  };

  const handleApproveBookSale = async (bookId) => {
    try {
      await ApproveBook(bookId,'ACCEPTED');
      SetBooks(prevBooks =>
        prevBooks.map(book =>
          book.bookid === bookId ? { ...book, approved: "ACCEPTED" } : book
        )
      );
      alert("Book approved!");
    } catch (err) {
      setError('Error approving book');
    }
  };

  const handleRejectBookSale = async (bookId) => {
    try {
      await ApproveBook(bookId,'REJECTED');
      SetBooks(prevBooks =>
        prevBooks.map(book =>
          book.bookid === bookId ? { ...book, approved: "REJECTED" } : book
        )
      );
      alert("Book disapproved!");
    } catch (err) {
      setError('Error disapproving book');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800">Manage Sellers</h1>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-600">Sellers List</h3>
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-middle">Name</th>
              <th className="px-4 py-2 text-middle">Email</th>
              <th className="px-4 py-2 text-middle">Role</th>
              <th className="px-4 py-2 text-middle">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers && Array.isArray(sellers) && sellers.map((seller) => (
              <tr key={seller.userid}>
                <td className="px-4 py-2">{seller.name}</td>
                <td className="px-4 py-2">{seller.email}</td>
                <td className="px-4 py-2">{seller.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleChangeRoleToUser(seller.userid)}
                    className="text-yellow-500 hover:text-yellow-700 mr-4"
                  >
                    Change to User
                  </button>
                  <button
                    onClick={() => handleDeleteSeller(seller.userid)}
                    className="text-red-500 hover:text-red-700 mr-4"
                  >
                    Delete Seller
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Seller's Books Management */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-600">Manage Seller's Books</h3>
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-middle">Book Title</th>
              <th className="px-4 py-2 text-middle">Status</th>
              <th className="px-4 py-2 text-middle">Action</th>
            </tr>
          </thead>
          <tbody>
            {Books.map((book) => (
              <tr key={book.bookid}>
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">
                  {book.approved === "ACCEPTED" ? 'For Sale' : 'Not For Sale'}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleApproveBookSale(book.bookid)}
                    className="text-green-500 hover:text-green-700 mr-4"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectBookSale(book.bookid)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Disapprove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSellers;
