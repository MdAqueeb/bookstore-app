// import React, { useState, useEffect } from 'react';

// // Simulated data for users and role change requests
// const initialUsers = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', roleChangeRequestStatus: 'pending', reason: 'Interested in selling products' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', roleChangeRequestStatus: 'pending', reason: 'Has a business to run' },
//   { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', roleChangeRequestStatus: null, reason: '' },
// ];

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [roleChangeRequests, setRoleChangeRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Simulating fetching users and role change requests from an API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         // Simulate fetching data from an API
//         setUsers(initialUsers);

//         // Simulate filtering role change requests (those with 'pending' status)
//         const roleRequestsData = initialUsers.filter(user => user.roleChangeRequestStatus === 'pending');
//         setRoleChangeRequests(roleRequestsData);
        
//       } catch (err) {
//         setError('Error fetching users');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle Delete User
//   const handleDeleteUser = (userId) => {
//     try {
//       setUsers(users.filter(user => user.id !== userId)); // Remove user from state
//     } catch (err) {
//       setError('Error deleting user');
//     }
//   };

//   // Handle Accept Role Change Request
//   const handleAcceptRoleChangeRequest = (userId) => {
//     try {
//       setUsers(users.map(user => 
//         user.id === userId ? { ...user, role: 'seller', roleChangeRequestStatus: 'accepted' } : user
//       ));
//       setRoleChangeRequests(roleChangeRequests.filter(request => request.id !== userId)); // Remove accepted request
//     } catch (err) {
//       setError('Error accepting request');
//     }
//   };

//   // Handle Reject Role Change Request
//   const handleRejectRoleChangeRequest = (userId) => {
//     try {
//       setRoleChangeRequests(roleChangeRequests.filter(request => request.id !== userId)); // Remove rejected request
//     } catch (err) {
//       setError('Error rejecting request');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-gray-800">Manage Users</h1>

//       {/* Users List Table */}
//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-semibold text-gray-600">All Users</h3>
//         <table className="min-w-full mt-4 table-auto">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Role</th>
//               <th className="px-4 py-2 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td className="px-4 py-2">{user.name}</td>
//                 <td className="px-4 py-2">{user.email}</td>
//                 <td className="px-4 py-2">{user.role}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleDeleteUser(user.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Role Change Requests Table */}
//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-semibold text-gray-600">Role Change Requests</h3>
//         <table className="min-w-full mt-4 table-auto">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Reason</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {roleChangeRequests.map((request) => (
//               <tr key={request.id}>
//                 <td className="px-4 py-2">{request.email}</td>
//                 <td className="px-4 py-2">{request.reason}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleAcceptRoleChangeRequest(request.id)}
//                     className="text-green-500 hover:text-green-700 mr-4"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleRejectRoleChangeRequest(request.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;
























import React, { useState, useEffect } from 'react';
import { GetAllUsers, DeleteUser, AcceptRequestRole, RejectRequestRole, GetAllRequest } from './Controller/Apis';  // Assuming APIs to fetch, delete users, and handle role requests
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleChangeRequests, setRoleChangeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Fetch users and role change requests from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersData = await GetAllUsers();
        setUsers(usersData);
        
        // Fetch role change requests (assuming role change requests are different from regular users)
        // const roleRequestsData = usersData.filter(user => user.roleChangeRequestStatus === 'PENDING');
        // setRoleChangeRequests(roleRequestsData);
        
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const requestData = await GetAllRequest();
        setRoleChangeRequests(requestData);
        
        // Fetch role change requests (assuming role change requests are different from regular users)
        // const roleRequestsData = usersData.filter(user => user.roleChangeRequestStatus === 'PENDING');
        // setRoleChangeRequests(roleRequestsData);
        
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await DeleteUser(userId); // Call API to delete user
      setUsers(users.filter(user => user.id !== userId)); // Remove user from state
    } catch (err) {
      setError('Error deleting user');
    }
  };

  const handleAcceptRoleChangeRequest = async (userId) => {
    try {
      await AcceptRequestRole(userId); // Call API to accept the role change request
      setRoleChangeRequests(roleChangeRequests.filter(request => request.id !== userId)); // Remove accepted request from state
      // setUsers(users.map(user => 
      //   user.id === userId ? { ...user, role: 'SELLER', roleChangeRequestStatus: 'ACCEPTED' } : user
      // ));
      // localStorage.removeItem('authToken');  // Or sessionStorage.removeItem('authToken') if using sessionStorage
      alert("Accepted Seller Role!")
    } catch (err) {
      setError('Error accepting request');

    }
  };

  const handleRejectRoleChangeRequest = async (userId) => {
    try {
      await RejectRequestRole(userId); // Call API to reject the role change request
      setRoleChangeRequests(roleChangeRequests.filter(request => request.id !== userId)); // Remove rejected request from state
    } catch (err) {
      setError('Error rejecting request');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800">Manage Users</h1>

      {/* Users List Table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-600">All Users</h3>
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-middle">Name</th>
              <th className="px-4 py-2 text-middle">Email</th>
              <th className="px-4 py-2 text-middle">Role</th>
              <th className="px-4 py-2 text-middle">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteUser(user.userid)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Change Requests Table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-600">Role Change Requests</h3>
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-middle">Email</th>
              <th className="px-4 py-2 text-middle">Reason</th>
              <th className="px-4 py-2 text-middle">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roleChangeRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-4 py-2">{request.email}</td>
                <td className="px-4 py-2">{request.reason}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleAcceptRoleChangeRequest(request.userid.userid)}
                    className="text-green-500 hover:text-green-700 mr-4"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectRoleChangeRequest(request.userid.userid)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Reject
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

export default ManageUsers;

