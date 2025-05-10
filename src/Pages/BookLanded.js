import React, { useState, useEffect, useRef } from 'react';
import { data, Link } from 'react-router-dom';
// import Header from '../Components/Header';
import { GetAllBooks, AddToWishlist, AddToCart, BuyItem } from './Controller/Apis';
import HeaderLogin from '../Components/HeaderLogin';

const BookLanded = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const modalRef = useRef(null);
  const [books, setBooks] = useState([]);  // State to store the fetched books
  const [loading, setLoading] = useState(true);  // State for loading indicator
  const [error, setError] = useState(null);  // State to track errors if any
  const [err,setWishlistError] = useState(null);
  const [successmessage, setSuccessMessage] = useState(null);
  const [cartMessage,setCartMessage] = useState(null);
  const [carterr,setCartError] = useState(null);
  const [buyMessage,setBuyMessage] = useState(null);
  const [buyerr,setBuyError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await GetAllBooks();  // Fetch books from API
        setBooks(fetchedBooks);  // Store the fetched data in state
      } catch (error) {
        setError('Failed to fetch books.');  // Set error if request fails
      } finally {
        setLoading(false);  // Set loading to false after data is fetched or error occurs
      }
    };

    fetchBooks();  // Call the fetch function when the component mounts
  }, []);  // Empty dependency array means this will run only once when the component mounts

  // Function to handle book card click
  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedBook(null);
  };

  const handleAddToCart = async (book) => {
    setLoading(true);
  
    try {
      await AddToCart(book);
      setCartError('');  // Clear any errors
      setCartMessage('Added successfully to Cart!');
      console.log("Success message set:", cartMessage);  // Log here
    } catch (carterr) {
      setCartError('Failed Add to Cart!.');
      setCartMessage('');
      console.log("Error occurred:", carterr);  // Log here
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async (book) => {
    setLoading(true);
    try{
      const result = await BuyItem(book);
      setBuyError('');
      setBuyMessage('Order Successfull');
      console.log(result);

      const options = {
        key: result.key,
        amount: result.amount,
        currency: 'INR',
        name: 'Book Store',
        description: `Buying book: ${result.title}`,
        order_id: result.razorpayOrderId,
        handler: async function (res){
          try{
            await fetch(`http://localhost:8080/api/orders/verify-payment`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
              },
              body: JSON.stringify({
                razorpayPaymentId: res.razorpay_payment_id,
                razorpayOrderId: res.razorpay_order_id,
                razorpaySignature: res.razorpay_signature
              }),
            });
            alert('Payment Successfull');
          } catch (err){
            console.error('Payment failed',err);
            alert('payment failed');
          }
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
    catch (buyerr){
      setBuyMessage('');
      if(buyerr.response && buyerr.response.status === 409){
      setBuyError("You have already bought this book or the book was not found.");
      alert("You have already bought this book or the book was not found.");
      }
      else{
      setBuyError("Could not Complete purchase");
      
      console.log(buyerr);
      alert("purchase failed.");
      }

    }
    finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    // If a success message is set, start a timer to clear it after 2 seconds
    if (cartMessage) {
      const timer = setTimeout(() => {
        setCartMessage(null);  // Clear the success message after 2 seconds
      }, 2000);

      // Clean up the timer if the component unmounts or the success message changes
      return () => clearTimeout(timer);
    }
  }, [cartMessage]);

  useEffect(() => {
    if (carterr) {
      const timer = setTimeout(() => {
        setCartError(null);  // Clear the success message after 2 seconds
      }, 2000);
      console.log("Error message updated:", carterr);
      return () => clearTimeout(timer)
    }
  }, [carterr]);

  const handleAddToWishlist = async (book) => {
    setLoading(true);
  
    try {
      await AddToWishlist(book);
      setWishlistError('');  // Clear any errors
      setSuccessMessage('Added successfully to wishlist!');
      console.log("Success message set:", successmessage);  // Log here
    } catch (err) {
      setWishlistError('Failed to Add to Wishlist.');
      setSuccessMessage('');
      console.log("Error occurred:", err);  // Log here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If a success message is set, start a timer to clear it after 2 seconds
    if (successmessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);  // Clear the success message after 2 seconds
      }, 2000);

      // Clean up the timer if the component unmounts or the success message changes
      return () => clearTimeout(timer);
    }
  }, [successmessage]);

  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => {
        setWishlistError(null);  // Clear the success message after 2 seconds
      }, 2000);
      console.log("Error message updated:", err);
      return () => clearTimeout(timer)
    }
  }, [err]);

  // Handle clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (selectedBook) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedBook]);

  if (loading) {
    return <div>Loading...</div>;  // Display loading message or spinner
  }

  if (error) {
    return <div>{error}</div>;  // Display error message
  }

  return (
    <>
      <HeaderLogin />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Explore Our Books</h1>
        {successmessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
            {successmessage}
          </div>
        )}
        {err && (
          <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
            {err}
          </div>
        )}

        {cartMessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
            {cartMessage}
          </div>
        )}
        {carterr && (
          <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
            {carterr}
          </div>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {books.map(book => (
            <div 
              key={book.bookid} 
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handleBookClick(book)}
            >
              <img 
                src={book.image} 
                alt={`${book.title} cover`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600 mb-2">by {book.author}</p>
                <p className="font-bold text-blue-600 mb-2">${book.price.toFixed(2)}</p>
                <p className="text-gray-700 text-sm line-clamp-3 mb-2">{book.description}</p>
              </div>
              <div className="mt-8">
                <button
C
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => handleBuyNow(book.bookid)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Book Details Modal */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div ref={modalRef} className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button 
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" 
                onClick={closeModal}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <img 
                      src={selectedBook.image} 
                      alt={`${selectedBook.title} book cover`} 
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>

                  <div className="md:w-2/3">
                    <h1 className="text-3xl font-bold mb-2">{selectedBook.title}</h1>
                    <p className="text-xl text-gray-700 mb-4">by {selectedBook.author}</p>

                    <div className="mb-6">
                      <p className="text-2xl font-bold text-blue-600">${selectedBook.price.toFixed(2)}</p>
                    </div>

                    <p className="text-gray-700 mb-6">{selectedBook.description}</p>
                    <div>
                      <button className="w-full bg-white-600 text-blue px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      onClick={() => handleAddToCart(selectedBook.bookid)}>
                        Add Cart
                      </button>
                    </div>
                    <div>
                      <button 
                        className="w-full bg-white-600 text-blue px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        onClick={() => handleAddToWishlist(selectedBook.bookid)}
                      >
                        Add Wishlist
                      </button>
                    </div>
                    <div>
                      <button
                        className="w-full bg-white-600 text-blue px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        onClick={() => handleBuyNow(selectedBook.bookid)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="mb-2"><span className="font-medium">Publisher:</span> {selectedBook.seller?.name || 'Unknown'}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default BookLanded;
