import React, { useState, useEffect } from 'react';

// Mocked API functions
const GetSellers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'seller',
          status: 'active',
          books: [
            { id: 101, title: 'Book One', isForSale: true },
            { id: 102, title: 'Book Two', isForSale: false }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'seller',
          status: 'active',
          books: [
            { id: 103, title: 'Book Three', isForSale: true },
            { id: 104, title: 'Book Four', isForSale: true }
          ]
        }
      ]);
    }, 1000);
  });
};

const ChangeSellerToUser = (sellerId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Seller ${sellerId} changed to user`);
    }, 500);
  });
};

const DeleteSeller = (sellerId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Seller ${sellerId} deleted`);
    }, 500);
  });
};

const ManageBookSale = (bookId, action) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Book ${bookId} ${action === 'approve' ? 'approved' : 'disapproved'}`);
    }, 500);
  });
};

const GetSellerOrders = (sellerId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, orderNumber: 'ORD001', sellerId: sellerId, status: 'pending' },
        { id: 2, orderNumber: 'ORD002', sellerId: sellerId, status: 'shipped' }
      ]);
    }, 500);
  });
};

const ManagePayment = (sellerId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Payments for seller ${sellerId} processed`);
    }, 500);
  });
};

const ManageSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellersData = await GetSellers();
        setSellers(sellersData);
      } catch (err) {
        setError('Error fetching sellers');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle changing role from seller to user
  const handleChangeRoleToUser = async (sellerId) => {
    try {
      await ChangeSellerToUser(sellerId);
      setSellers(sellers.map(seller => 
        seller.id === sellerId ? { ...seller, role: 'user' } : seller
      ));
    } catch (err) {
      setError('Error changing role');
    }
  };

  // Handle deleting a seller account
  const handleDeleteSeller = async (sellerId) => {
    try {
      await DeleteSeller(sellerId);
      setSellers(sellers.filter(seller => seller.id !== sellerId));
    } catch (err) {
      setError('Error deleting seller');
    }
  };

  // Handle managing book sale (approve/disapprove)
  const handleManageBookSale = async (bookId, action) => {
    try {
      await ManageBookSale(bookId, action);
      // Update UI to reflect the change
      setSellers(sellers.map(seller => {
        if (seller.books) {
          seller.books = seller.books.map(book => 
            book.id === bookId ? { ...book, isForSale: action === 'approve' } : book
          );
        }
        return seller;
      }));
    } catch (err) {
      setError('Error managing book sale');
    }
  };

  // Handle managing seller's orders
  const handleManageSellerOrders = async (sellerId) => {
    try {
      const orders = await GetSellerOrders(sellerId);
      console.log('Seller Orders:', orders);
      // Logic for displaying or managing orders (e.g., mark as shipped, etc.)
    } catch (err) {
      setError('Error fetching orders');
    }
  };

  // Handle managing seller's payments
  const handleManageSellerPayments = async (sellerId) => {
    try {
      const payments = await ManagePayment(sellerId);
      console.log('Seller Payments:', payments);
      // Logic for displaying or managing payments (e.g., release payment, etc.)
    } catch (err) {
      setError('Error managing payments');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800">Manage Sellers</h1>

      {/* Seller List Table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-600">Sellers List</h3>
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller.id}>
                <td className="px-4 py-2">{seller.name}</td>
                <td className="px-4 py-2">{seller.email}</td>
                <td className="px-4 py-2">{seller.role}</td>
                <td className="px-4 py-2">{seller.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleChangeRoleToUser(seller.id)}
                    className="text-yellow-500 hover:text-yellow-700 mr-4"
                  >
                    Change to User
                  </button>
                  <button
                    onClick={() => handleDeleteSeller(seller.id)}
                    className="text-red-500 hover:text-red-700 mr-4"
                  >
                    Delete Seller
                  </button>
                  <button
                    onClick={() => handleManageSellerOrders(seller.id)}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Manage Orders
                  </button>
                  <button
                    onClick={() => handleManageSellerPayments(seller.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Manage Payments
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
              <th className="px-4 py-2 text-left">Book Title</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.flatMap(seller => seller.books?.map(book => (
              <tr key={book.id}>
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.isForSale ? 'For Sale' : 'Not For Sale'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleManageBookSale(book.id, 'approve')}
                    className="text-green-500 hover:text-green-700 mr-4"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleManageBookSale(book.id, 'disapprove')}
                    className="text-red-500 hover:text-red-700"
                  >
                    Disapprove
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSellers;



















// import React, { useState, useEffect } from 'react';
// import { GetSellers, ChangeSellerToUser, DeleteSeller, ManageBookSale, GetSellerOrders, ManagePayment } from './Controller/Apis';

// const ManageSellers = () => {
//   const [sellers, setSellers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const sellersData = await GetSellers();
//         setSellers(sellersData);
//       } catch (err) {
//         setError('Error fetching sellers');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle changing role from seller to user
//   const handleChangeRoleToUser = async (sellerId) => {
//     try {
//       await ChangeSellerToUser(sellerId);
//       setSellers(sellers.map(seller => 
//         seller.id === sellerId ? { ...seller, role: 'user' } : seller
//       ));
//     } catch (err) {
//       setError('Error changing role');
//     }
//   };

//   // Handle deleting a seller account
//   const handleDeleteSeller = async (sellerId) => {
//     try {
//       await DeleteSeller(sellerId);
//       setSellers(sellers.filter(seller => seller.id !== sellerId));
//     } catch (err) {
//       setError('Error deleting seller');
//     }
//   };

//   // Handle managing book sale (approve/disapprove)
//   const handleManageBookSale = async (bookId, action) => {
//     try {
//       await ManageBookSale(bookId, action);
//       // Update UI to reflect the change
//       setSellers(sellers.map(seller => {
//         if (seller.books) {
//           seller.books = seller.books.map(book => 
//             book.id === bookId ? { ...book, isForSale: action === 'approve' } : book
//           );
//         }
//         return seller;
//       }));
//     } catch (err) {
//       setError('Error managing book sale');
//     }
//   };

//   // Handle managing seller's orders
//   const handleManageSellerOrders = async (sellerId) => {
//     try {
//       const orders = await GetSellerOrders(sellerId);
//       console.log('Seller Orders:', orders);
//       // Logic for displaying or managing orders (e.g., mark as shipped, etc.)
//     } catch (err) {
//       setError('Error fetching orders');
//     }
//   };

//   // Handle managing seller's payments
//   const handleManageSellerPayments = async (sellerId) => {
//     try {
//       const payments = await ManagePayment(sellerId);
//       console.log('Seller Payments:', payments);
//       // Logic for displaying or managing payments (e.g., release payment, etc.)
//     } catch (err) {
//       setError('Error managing payments');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-gray-800">Manage Sellers</h1>

//       {/* Seller List Table */}
//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-semibold text-gray-600">Sellers List</h3>
//         <table className="min-w-full mt-4 table-auto">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Role</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sellers.map((seller) => (
//               <tr key={seller.id}>
//                 <td className="px-4 py-2">{seller.name}</td>
//                 <td className="px-4 py-2">{seller.email}</td>
//                 <td className="px-4 py-2">{seller.role}</td>
//                 <td className="px-4 py-2">{seller.status}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleChangeRoleToUser(seller.id)}
//                     className="text-yellow-500 hover:text-yellow-700 mr-4"
//                   >
//                     Change to User
//                   </button>
//                   <button
//                     onClick={() => handleDeleteSeller(seller.id)}
//                     className="text-red-500 hover:text-red-700 mr-4"
//                   >
//                     Delete Seller
//                   </button>
//                   <button
//                     onClick={() => handleManageSellerOrders(seller.id)}
//                     className="text-blue-500 hover:text-blue-700 mr-4"
//                   >
//                     Manage Orders
//                   </button>
//                   <button
//                     onClick={() => handleManageSellerPayments(seller.id)}
//                     className="text-green-500 hover:text-green-700"
//                   >
//                     Manage Payments
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Seller's Books Management */}
//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-semibold text-gray-600">Manage Seller's Books</h3>
//         <table className="min-w-full mt-4 table-auto">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left">Book Title</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sellers.flatMap(seller => seller.books?.map(book => (
//               <tr key={book.id}>
//                 <td className="px-4 py-2">{book.title}</td>
//                 <td className="px-4 py-2">{book.isForSale ? 'For Sale' : 'Not For Sale'}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleManageBookSale(book.id, 'approve')}
//                     className="text-green-500 hover:text-green-700 mr-4"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleManageBookSale(book.id, 'disapprove')}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Disapprove
//                   </button>
//                 </td>
//               </tr>
//             )))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageSellers;
