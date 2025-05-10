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



