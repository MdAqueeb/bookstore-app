import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import HomeLogin from './Pages/HomeLogin';
import About from './Pages/About';
import Contact from './Pages/Contact';
import BookLanding from './Pages/BookLanding';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import Profile from './Pages/Profile';
import BookLanded from './Pages/BookLanded'
import Wishlist from './Pages/Wishlist';
import Cart from './Pages/Cart';
import ResetPassword from './Pages/ResetPassword';
// import Header from './Components/Header'
import RequestSellerRole from './Pages/RequestSellerRole';
import Checkout from './Pages/Checkout';

function App() {
  return (
    <Router>
      <div className="App">
      {/* <h1 className="text-3xl font-bold underline bg-red-100">Welcome </h1> */}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomeLogin />} />
          <Route path='/allbooks' element={<BookLanded />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/books" element={<BookLanding />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/book" element={<Navigate replace to="/books" />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/requestsellerrole' element={<RequestSellerRole />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='resetPassword' element={<ResetPassword />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// 21716072





// Creating a dashboard with role-based access for users (user, seller, admin) requires different levels of access and features depending on the role of the user logged in. Here's how you could structure the dashboard and the functionality for each user type:

// ### Key Requirements

// 1. **Roles:**
//    - **User**: Regular users who browse and purchase books. They should only have access to their own profile and can request an upgrade to a seller role.
//    - **Seller**: Users who have been upgraded to sellers. They should have access to manage their books, view orders, etc.
//    - **Admin**: Admins have full control over users, sellers, and the system. They can manage users, approve sellers, and more.

// 2. **Functionality**:
//    - **User Dashboard**: View personal info, order history, and upgrade request to seller.
//    - **Seller Dashboard**: Manage books (add, update, delete), view sales and orders, update their profile.
//    - **Admin Dashboard**: Manage users, sellers, approve seller requests, and perform system-wide admin tasks.

// ---

// ### 1. **User Dashboard**

// #### **Features for Users**:
// - **Profile View**: Display user details (email, name, etc.).
// - **Order History**: Users can see their previous orders and track their status.
// - **Request Seller Role**: If the user is eligible, provide a button or option to request an upgrade to a seller role.

// #### **Components**:
// - **Profile Section**: Display user details with the ability to update basic profile information (name, email, password).
// - **Order History**: A table to show the books they’ve purchased, order date, and current status.
// - **Upgrade Request**: If the user is not a seller, display an option like "Request Seller Role". Once clicked, this should trigger an approval flow where the admin or the system reviews the request.

// #### **User Dashboard Example** (UI Design):
// ```text
// +------------------------+
// |  User Dashboard        |
// +------------------------+
// | Name: Aqueeb           |
// | Email: aqueeb@gmail.com|
// | Role: User             |
// +------------------------+
// | Order History:         |
// | - Book Title 1         |
// | - Book Title 2         |
// | - Book Title 3         |
// +------------------------+
// | Request Seller Role    |
// +------------------------+
// ```

// ---

// ### 2. **Seller Dashboard**

// #### **Features for Sellers**:
// - **Profile View**: Sellers can see and edit their personal and seller details.
// - **Book Management**: Add, update, or delete books from their catalog.
// - **Sales Overview**: View all their orders, sales reports, and reviews.

// #### **Components**:
// - **Profile Section**: Similar to the user dashboard but with additional seller-specific info, such as seller rating and store details.
// - **Book Management**: A section for adding new books (with details such as title, description, price, etc.), updating or deleting existing books.
// - **Sales & Orders**: Display sales reports, orders received, and order statuses.

// #### **Seller Dashboard Example** (UI Design):
// ```text
// +------------------------+
// |  Seller Dashboard      |
// +------------------------+
// | Name: Aqueeb           |
// | Email: aqueeb@gmail.com|
// | Role: Seller           |
// +------------------------+
// | Manage Books:          |
// | - Add New Book         |
// | - View All Books       |
// +------------------------+
// | Sales Overview:        |
// | - Order #1: Completed  |
// | - Order #2: Pending    |
// +------------------------+
// ```

// ---

// ### 3. **Admin Dashboard**

// #### **Features for Admin**:
// - **Manage Users**: View and manage all users in the system. Admin can delete, suspend, or edit user profiles.
// - **Manage Sellers**: Approve or reject requests for seller roles. Admin can also manage sellers, e.g., suspend their selling rights.
// - **System Management**: Admin can view overall system reports, manage products, or perform other administrative tasks.

// #### **Components**:
// - **User Management**: A list of all users with options to view, suspend, or delete.
// - **Seller Management**: Admin can approve or deny seller role requests.
// - **System Settings**: Admin can view sales, orders, and system health reports.

// #### **Admin Dashboard Example** (UI Design):
// ```text
// +------------------------+
// |  Admin Dashboard       |
// +------------------------+
// | Manage Users:          |
// | - User1: Edit | Suspend|
// | - User2: Edit | Suspend|
// | - User3: Edit | Suspend|
// +------------------------+
// | Manage Sellers:        |
// | - Seller1: Approve | Deny|
// | - Seller2: Approve | Deny|
// +------------------------+
// | System Reports:        |
// | - Total Sales: $10000  |
// | - Active Orders: 120   |
// +------------------------+
// ```

// ---

// ### 4. **Backend Logic**

// For role management and access control, you'd need to implement some backend logic to handle different behaviors for each user type.

// #### **Role-Based Access Control**:
// - When the user logs in, check their role and direct them to the appropriate dashboard.
// - Only allow admins to change roles and manage other users.

// ```java
// public String getDashboardForUser(String email) {
//     User usr = userrepo.findByEmail(email)
//                         .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

//     // Check user role
//     if (usr.getRole().equals("admin")) {
//         return "admin_dashboard"; // Admin Dashboard
//     } else if (usr.getRole().equals("seller")) {
//         return "seller_dashboard"; // Seller Dashboard
//     } else {
//         return "user_dashboard"; // User Dashboard
//     }
// }
// ```

// #### **Change Role to Seller**:
// If a user requests to become a seller, this would be processed by the admin. The user should be notified when their request is approved or rejected.

// ```java
// public String upgradeToSeller(String email) {
//     User usr = userrepo.findByEmail(email)
//                         .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

//     if (usr.getRole().equals("user")) {
//         usr.setRole("seller"); // Upgrade user to seller
//         userrepo.save(usr);    // Save the updated user
//         return "Role changed to seller successfully!";
//     }
//     return "User is already a seller or admin!";
// }
// ```

// #### **Admin Approval for Seller**:
// Admins can approve or reject a seller upgrade. You could have an endpoint where the admin can manage pending requests:

// ```java
// public String approveSellerRequest(Long userId) {
//     User usr = userrepo.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    
//     if (usr.getRole().equals("user")) {
//         usr.setRole("seller");
//         userrepo.save(usr);
//         return "Seller role approved!";
//     }
    
//     return "This user is not eligible for seller role approval.";
// }
// ```

// ---

// ### 5. **UI and Frontend**

// On the frontend (React, Angular, etc.), you can use **role-based routing** to conditionally display different dashboards:

// ```javascript
// // Example in React
// function Dashboard() {
//   const user = useUser(); // Assume this is a custom hook to get logged-in user's info

//   if (user.role === 'admin') {
//     return <AdminDashboard />;
//   } else if (user.role === 'seller') {
//     return <SellerDashboard />;
//   } else {
//     return <UserDashboard />;
//   }
// }
// ```

// This ensures that users are redirected to the correct dashboard based on their role.

// ---

// ### 6. **Security Considerations**

// Ensure you have the correct **authentication and authorization** in place:
// - **JWT Tokens**: Use JWT tokens to securely store user role and authentication state.
// - **Backend Security**: Enforce role-based access control at every level (APIs, routes).
// - **Frontend Security**: Never trust frontend logic to manage role checks. Always validate roles on the backend before performing any sensitive actions (like upgrading roles).

// ---

// ### Conclusion

// - **User Dashboard**: Basic profile and order history, with the option to request seller status.
// - **Seller Dashboard**: Book management and sales overview, with access to edit personal details.
// - **Admin Dashboard**: Full control over users and sellers, including the ability to approve seller requests.

// By organizing your dashboard in this way and providing the necessary role-based access, you ensure a clean, user-friendly interface for all roles. Let me know if you need further clarification or help with any specific implementation!



// 4. Admin Review (Backend Process)
// On the admin side, you would need a section to review the requests. Admins can either approve or reject requests, and the user would be notified of the decision.

// Admin UI to Review Seller Requests:

// text
// Copy
// +----------------------------------------+
// |   Seller Role Requests                |
// +----------------------------------------+
// | User: Aqueeb                          |
// | Requested on: April 9, 2025           |
// | Reason: Wants to sell books on the site|
// | Supporting Documents: [View File]      |
// | [ Approve ] [ Reject ]                |
// +----------------------------------------+
// Admins would be able to approve or reject the seller role requests. Once a decision is made, the user is notified via email or a notification in their dashboard.