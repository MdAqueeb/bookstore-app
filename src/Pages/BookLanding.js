import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { GetAllBooks } from './Controller/Apis';


const BookLanding = () => {
  // State to track if a book details modal is open
  const [selectedBook, setSelectedBook] = useState(null);
  const modalRef = useRef(null);
  const [books, setBooks] = useState([]);  // State to store the fetched books
  const [loading, setLoading] = useState(true);  // State for loading indicator
  const [error, setError] = useState(null);  // State to track errors if any
  // Sample books data (in a real app, this would be fetched from an API)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await GetAllBooks();  // Fetch books from API
        setBooks(fetchedBooks);  // Store the fetched data in state
      } catch (err) {
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
  // const books = [
  //   {
  //     id: 1,
  //     title: "The Silent Echo",
  //     author: "Olivia Martinez",
  //     coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //     price: 19.99,
  //     description: "In a world where silence has become the most valuable currency, one woman's journey to find her voice leads to an unexpected discovery that could change everything.",
  //     details: {
  //       publisher: "Horizon Books",
  //       language: "English",
  //       paperback: "382 pages",
  //       isbn: "978-3-16-148410-0",
  //       dimensions: "5.5 x 0.9 x 8.5 inches",
  //       publicationDate: "June 14, 2023"
  //     }
  //   },
  //   {
  //     id: 2,
  //     title: "Midnight in the Garden",
  //     author: "James Peterson",
  //     coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //     price: 22.99,
  //     description: "A mystery unfolds in a small town where nothing is as it seems. Detective Anna Morgan must solve a series of disappearances before time runs out.",
  //     details: {
  //       publisher: "Mystery Press",
  //       language: "English",
  //       paperback: "412 pages",
  //       isbn: "978-3-16-148411-7",
  //       dimensions: "5.5 x 1.0 x 8.5 inches",
  //       publicationDate: "March 8, 2023"
  //     }
  //   },
  //   {
  //     id: 3,
  //     title: "The Last Frontier",
  //     author: "David Chen",
  //     coverImage: "https://images.unsplash.com/photo-1531901599101-e9e6e089d814?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //     price: 24.99,
  //     description: "A sci-fi adventure set in the far reaches of space where humanity's last hope lies in the discovery of a new habitable planet.",
  //     details: {
  //       publisher: "Stellar Books",
  //       language: "English",
  //       paperback: "520 pages",
  //       isbn: "978-3-16-148412-4",
  //       dimensions: "6.0 x 1.2 x 9.0 inches",
  //       publicationDate: "September 22, 2023"
  //     }
  //   },
  //   {
  //     id: 4,
  //     title: "Whispers of the Ancient",
  //     author: "Elena Rodriguez",
  //     coverImage: "https://images.unsplash.com/photo-1603289847962-9ce53d6ddfe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //     price: 18.99,
  //     description: "An archaeological discovery leads to the unearthing of a centuries-old secret that could rewrite human history.",
  //     details: {
  //       publisher: "Historical House",
  //       language: "English",
  //       paperback: "368 pages",
  //       isbn: "978-3-16-148413-1",
  //       dimensions: "5.5 x 0.9 x 8.5 inches",
  //       publicationDate: "January 15, 2023"
  //     }
  //   },
  //   {
  //     id: 5,
  //     title: "Beyond the Horizon",
  //     author: "Michael Thompson",
  //     coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //     price: 21.99,
  //     description: "A journey of self-discovery as a young traveler explores remote lands and discovers the meaning of life and connection.",
  //     details: {
  //       publisher: "Wanderlust Publications",
  //       language: "English",
  //       paperback: "298 pages",
  //       isbn: "978-3-16-148414-8",
  //       dimensions: "5.5 x 0.8 x 8.5 inches",
  //       publicationDate: "May 3, 2023"
  //     }
  //   },
  //   {
  //     id: 6,
  //     title: "The Quantum Paradox",
  //     author: "Sarah Williams",
  //     coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //     price: 25.99,
  //     description: "A theoretical physicist stumbles upon a discovery that challenges everything we know about reality and time.",
  //     details: {
  //       publisher: "Scientific Minds",
  //       language: "English",
  //       paperback: "432 pages",
  //       isbn: "978-3-16-148415-5",
  //       dimensions: "6.0 x 1.1 x 9.0 inches",
  //       publicationDate: "November 7, 2023"
  //     }
  //   },
  //   {
  //     id: 7,
  //     title: "Garden of Dreams",
  //     author: "Liam Anderson",
  //     coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //     price: 20.99,
  //     description: "A magical tale of wonder and imagination where dreams come to life in a mysterious garden hidden from the world.",
  //     details: {
  //       publisher: "Fantasy Realm",
  //       language: "English",
  //       paperback: "346 pages",
  //       isbn: "978-3-16-148416-2",
  //       dimensions: "5.5 x 0.9 x 8.5 inches",
  //       publicationDate: "July 19, 2023"
  //     }
  //   },
  //   {
  //     id: 8,
  //     title: "Chronicles of the Forgotten",
  //     author: "Amara Khan",
  //     coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //     price: 23.99,
  //     description: "An epic fantasy saga about a band of outcasts who must save a kingdom that has forgotten their existence.",
  //     details: {
  //       publisher: "Epic Tales",
  //       language: "English",
  //       paperback: "582 pages",
  //       isbn: "978-3-16-148417-9",
  //       dimensions: "6.0 x 1.4 x 9.0 inches",
  //       publicationDate: "October 10, 2023"
  //     }
  //   }
  // ];

  // // Function to handle book card click
  // const handleBookClick = (book) => {
  //   setSelectedBook(book);
  // };

  // // Function to close modal
  // const closeModal = () => {
  //   setSelectedBook(null);
  // };
  
  // // Handle clicking outside the modal
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       closeModal();
  //     }
  //   };

  //   if (selectedBook) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   }
    
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [selectedBook]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Explore Our Books</h1>
        
        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {Array.isArray(books) && books.map(book => (
            <div 
              key={book.id} 
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
            </div>
          ))}
        </div>

        {/* Book Details Modal */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div ref={modalRef} className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              {/* Close button */}
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
                  {/* Book Cover */}
                  <div className="md:w-1/3">
                    <img 
                      src={selectedBook.image} 
                      alt={`${selectedBook.title} book cover`} 
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  
                  {/* Book Details */}
                  <div className="md:w-2/3">
                    <h1 className="text-3xl font-bold mb-2">{selectedBook.title}</h1>
                    <p className="text-xl text-gray-700 mb-4">by {selectedBook.author}</p>
                    
                    <div className="mb-6">
                      <p className="text-2xl font-bold text-blue-600">${selectedBook.price.toFixed(2)}</p>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{selectedBook.description}</p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <p className="text-center mb-2">Sign in to purchase this book</p>
                      <div className="flex justify-center space-x-4">
                        <Link to="/signin" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Sign In
                        </Link>
                        <Link to="/signup" className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Book Details Section */}
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="mb-2"><span className="font-medium">Publisher:</span> {selectedBook.seller.name}</p>
                        {/* <p className="mb-2"><span className="font-medium">Language:</span> {selectedBook.details.language}</p> */}
                        {/* <p className="mb-2"><span className="font-medium">Paperback:</span> {selectedBook.details.paperback}</p> */}
                      </div>
                      <div>
                        {/* <p className="mb-2"><span className="font-medium">ISBN:</span> {selectedBook.details.isbn}</p> */}
                        {/* <p className="mb-2"><span className="font-medium">Dimensions:</span> {selectedBook.details.dimensions}</p> */}
                        {/* <p className="mb-2"><span className="font-medium">Publication Date:</span> {selectedBook.}</p> */}
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

export default BookLanding; 