
// import React, { useEffect, useState } from "react";
import axios from "axios";
// import { resolve } from "chart.js/helpers";

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

export const GetRequestRole = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${API_URL}/GetAllRequest`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddRequestRole = async (RequestForm) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.post(
      `${API_URL}/AddRequest`,
      RequestForm, // This is the request body
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const AddBook = async (Book) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.post(
      `${API_URL}/seller/books`,
      Book, // This is the request body
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetUserBooks = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${API_URL}/seller/books`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateUserBook = async (Book,Bookid) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.put(
      `${API_URL}/seller/books/${Bookid}`,
      Book, // This is the request body
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllUsers = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${API_URL}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const DeleteUser = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error("User is not Authenticated");
    }
    console.log(token);
    
    const response = await axios.delete(`${API_URL}/admin/users/${id}`, {
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

export const AcceptRequestRole = async (id) => {
  try {
    console.log(id);
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.put(
      `${API_URL}/admin/AcceptRole/${id}`,{},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const RejectRequestRole = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.put(
      `${API_URL}/admin/RejectRole/${id}`,{},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const GetAllRequest = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${API_URL}/admin/GetWholeRequest`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetSellersBooks = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${API_URL}/admin/books/pending`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const GetAllSellers = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${API_URL}/admin/sellers`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const ChangeSellerToUser = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.put(
      `${API_URL}/admin/ChangetoUser/${id}`,{},// This is the request body
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ApproveBook = async (bookid,Approved) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.put(
      `${API_URL}/admin/books/${bookid}/${Approved}`,{},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const GetAlladminBooks = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${API_URL}/admin/books`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const RemoveBook = async (bookid) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error("User is not Authenticated");
    }
    console.log(token);
    
    const response = await axios.delete(`${API_URL}/admin/books/${bookid}`, {
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

export const BuyItem = async (Book) => {
  try{
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }
    const response = await axios.post(`${API_URL}/api/orders/create/${Book}`,{} ,{
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

export const handleVerifyEmail = async (email) => {
  try {
    const response = await fetch(`${API_URL}/VerifyEmail/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
        throw new Error("Not Found");
    }

    return response; 
  } catch (error) {
    console.error("Email Not Found:", error.message);
    throw error;
  }
}


export const BuyCartItem = async () => {
  try{
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }
    const response = await axios.post(`${API_URL}/api/orders/create`,{} ,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export const GetOrders = async () => {
  try{

      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('User is not authenticated');
      }
      const response = await axios.get(`${API_URL}/api/orders/getOrders`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      console.log(token);
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch Orders Data');
    }
};

export const CancelOrder = async (orderId) => {
  try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await axios.put(
        `${API_URL}/api/orders/${orderId}`,
        {}, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
};

export const GetPayments = async () => {
  try{

      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('User is not authenticated');
      }
      const response = await axios.get(`${API_URL}/api/payments/getPayments`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      console.log(token);
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch Payment Data');
    }
};

export const GetPurchasedBooks = async () => {
  try{

      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('User is not authenticated');
      }
      const response = await axios.get(`${API_URL}/getPurchasedBooks`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      console.log(token);
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch Purchased Books Data');
    }
};

export const InitiatePayment = async (orderId) => {
  try{

      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('User is not authenticated');
      }
      const response = await axios.get(`${API_URL}/getOrder/${orderId}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      console.log(token);
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch Payment Data');
    }
};