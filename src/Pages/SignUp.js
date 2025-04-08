import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Signup } from "./Controller/Apis";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    avator: "",
    role: "USER", // Fixed as USER
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Check if passwords match
    if (name === "password" || name === "confirmPassword") {
      setPasswordError(value !== formData.password ? "Passwords do not match" : "");
    }
  };

  // Handle avatar (image) upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Avatar Base64:", reader.result); // Debugging
        setFormData((prevState) => ({
          ...prevState,
          avator: reader.result,
        }));
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirmPassword) {
  //     setPasswordError("Passwords do not match");
  //     return;
  //   }

  //   try {
  //     console.log("Submitting:", formData); // Debugging
  //     const response = await Signup(formData);

  //     if (response && response.status === 200) {
  //       console.log("Signup Successful:", response);
  //       navigate("/signin");
  //     } else {
  //       setErrorMessage("Signup failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error during signup:", error);
  //     setErrorMessage("There was an error with the registration.");
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    console.log('Sign Up form submitted:', formData);
    Signup(formData)
      .then(response => {
        console.log("Signup Successfull ",response);
        navigate("/signin");
      })
      .catch(error => {
        console.error("Error during signup:", error);
        setErrorMessage("There was an error with the registration.");

      })
    // Here you would typically register the user
  };

  return (
    <>
      <div className="flex justify-center items-center py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl my-8">
          <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>

          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
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

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
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

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    passwordError ? "border-red-500" : ""
                  }`}
                  required
                />
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              </div>

              {/* Address Field */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              {/* Avatar Field */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
                <div className="flex items-center space-x-6">
                  <div className="shrink-0">
                    {avatarPreview ? (
                      <img
                        className="h-16 w-16 object-cover rounded-full"
                        src={avatarPreview}
                        alt="Avatar preview"
                      />
                    ) : (
                      <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <input type="file" id="avator" name="avator" onChange={handleAvatarChange} accept="image/*" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create Account
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-600 hover:text-blue-800">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
