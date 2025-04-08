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
// import Header from './Components/Header'

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
