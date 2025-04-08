import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Header from '../Components/Header';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forgot password submitted for:', email);
    // Here you would typically send a password reset email
    setSubmitted(true);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          {!submitted ? (
            <>
              <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
              <p className="text-gray-600 mb-6 text-center">
                Enter your email address below and we'll send you a link to reset your password.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Reset Password
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <Link to="/signin" className="text-blue-600 hover:text-blue-800 text-sm">
                  Back to Sign In
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-lg font-medium text-gray-900 mb-2">Reset Link Sent</h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your email and follow the instructions to reset your password.
              </p>
              
              <Link
                to="/signin"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Return to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword; 