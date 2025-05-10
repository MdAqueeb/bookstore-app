import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleLogin } from './Controller/Apis';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleLogin(formData); 
      console.log('Login successful:', response);
      navigate('/home');
    } catch (err) {
      console.error('Login failed:', err.message);

      if (err.message === 'Not Found') {
        setError(null); 
        navigate('/signup'); 
      } else if (err.message === 'Unauthorized') {
        setError('Password is incorrect');
      } else {
        setError('Signin Failed. Please Try again');
      }
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-sm mx-auto">
          {error && (
            <div className="text-red-600 text-center mt-4">
              {error} 
            </div>
          )}
            <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

            <div className="flex space-x-8 mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex space-x-4 mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Sign In
              </button>
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                onClick={handleSignUpRedirect}  
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
              Forgot Email/Password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
