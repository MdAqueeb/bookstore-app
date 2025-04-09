
// import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = 'http://localhost:8080';
// src/Controller/Apis.js
export const handleLogin = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Check for specific error codes or messages
        if (data._respDesc === "Not Found") {
          throw new Error("Not Found"); // For Not Found errors (e.g., user does not exist)
        } else if (data._respDesc === "UnAuthorized") {
          throw new Error("Unauthorized"); // For Unauthorized errors (e.g., incorrect password)
        } else {
          throw new Error(data.message || "Something went wrong");
        }
      }
      console.log("Login successful:", data);

      console.log(data._data.token);
      localStorage.setItem('authToken', data._data.token)

      return data; // Return data to handle it in SignIn.js
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  };
  
export const Signup = (userData) => {
  return axios.post(`${API_URL}/registoration`,userData)
  .then((response) => 

      console.log('Signup Successful ',response.data))
  .catch((error) => {
      console.log("Already Email Found")
      throw error;
  });
};


export const GetAllBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/AllBooks`);
    return response.data;  // Return the books data
  } catch (error) {
    throw new Error('Failed to fetch books');  // Handle any errors
  }
};

export const GetProfile = async () => {
  try{

    const token = localStorage.getItem('authToken');

    if (!token) {
      throw new Error('User is not authenticated');
    }
    const response = await axios.get(`${API_URL}/getProfile`,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    console.log(token);
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch Profile Data');
  }
}
  
export const GetWishlist = async () => {
  try{

    const token = localStorage.getItem('authToken');

    if (!token) {
      throw new Error('User is not authenticated');
    }
    const response = await axios.get(`${API_URL}/GetWishlist`,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    console.log(token);
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch Profile Data');
  }
}

export const AddToWishlist = async (bookid) => {
  try{
     const token = localStorage.getItem('authToken');
     if(!token) {
      throw new Error("User is not Authenticated");
     }
     const response = await axios.post(`${API_URL}/AddWishlist/${bookid}`,{},{
      headers :{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
     });

     console.log(response.data);
     return response.data;
  } catch (error){
    console.error("Error adding item to wishlist:", error);
    throw error;
    // throw new Error("Error adding item to wishlist:");
    
  }
}

export const RemoveWishlistItem = async (bookid) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error("User is not Authenticated");
    }
    console.log(token);
    
    const response = await axios.delete(`${API_URL}/RemoveWishlist/${bookid}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in deleting item from wishlist: ", error);
    throw error;
  }
};

export const GetCart = async () => {
  try{

    const token = localStorage.getItem('authToken');

    if (!token) {
      throw new Error('User is not authenticated');
    }
    const response = await axios.get(`${API_URL}/GetCartItems`,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    console.log(token);
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch Profile Data');
  }
};

export const RemoveCartItem = async (bookid) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error("User is not Authenticated");
    }
    console.log(token);
    
    const response = await axios.delete(`${API_URL}/RemoveCartItem/${bookid}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in deleting item from wishlist: ", error);
    throw error;
  }
}

export const AddToCart = async (bookid) => {
  try{
     const token = localStorage.getItem('authToken');
     if(!token) {
      throw new Error("User is not Authenticated");
     }
     const response = await axios.post(`${API_URL}/AddCartItem/${bookid}`,{},{
      headers :{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
     });

     console.log(response.data);
     return response.data;
  } catch (error){
    console.error("Error adding item to wishlist:", error);
    throw error;
    // throw new Error("Error adding item to wishlist:");
    
  }
}

