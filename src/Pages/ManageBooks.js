import React, { useState, useEffect } from 'react';
import { AddBook, GetUserBooks, UpdateUserBook } from './Controller/Apis';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    image: '',
  });
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const userBooks = await GetUserBooks();
        setBooks(userBooks);
        setError(null);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.price) {
      setError('All fields are required');
      return;
    }

    try {
      const savedBook = await AddBook(newBook);
      setBooks(prevBooks => [...prevBooks, savedBook]);
      setNewBook({ title: '', author: '', price: '', description: '', image: '' });
      setError(null);
    } catch (err) {
      setError('Error adding book');
    }
  };

  const handleEditBook = async (id) => {
    try {
      const updated = await UpdateUserBook(editingBook, id);
      setBooks(
        books.map((book) =>
          book.id === id ? updated : book
        )
      );
      setEditingBook(null);
    } catch (err) {
      setError('Error updating book');
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNewBook({ ...newBook, price: value });
    }
  };

  // Enhanced image handler for both add/edit modes
  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditingBook({ ...editingBook, image: reader.result });
        } else {
          setNewBook({ ...newBook, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800">Manage Books</h1>

      {loading && <div className="text-gray-500">Loading books...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Add Book Form */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-600">Add Book in Store</h3>
        <div className="space-y-4 mt-4">
          {/* Title */}
          <div className="flex items-center space-x-4">
            <label className="w-32 text-gray-600">Title:</label>
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-md"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
          </div>
          {/* Author */}
          <div className="flex items-center space-x-4">
            <label className="w-32 text-gray-600">Author:</label>
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-md"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            />
          </div>
          {/* Price */}
          <div className="flex items-center space-x-4">
            <label className="w-32 text-gray-600">Price:</label>
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-md"
              value={newBook.price}
              onChange={handlePriceChange}
            />
          </div>
          {/* Description */}
          <div className="flex items-center space-x-4">
            <label className="w-32 text-gray-600">Description:</label>
            <textarea
              className="flex-1 p-2 border border-gray-300 rounded-md"
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
            />
          </div>
          {/* Image Upload */}
          <div className="flex items-center space-x-4">
            <label className="w-32 text-gray-600">Image:</label>
            <input
              type="file"
              className="flex-1 p-2 border border-gray-300 rounded-md"
              onChange={(e) => handleImageChange(e)}
            />
            {newBook.image && (
              <div className="mt-2">
                <img src={newBook.image} alt="Book" className="w-24 h-24 object-cover rounded-md" />
              </div>
            )}
          </div>
          <button className="w-full py-2 bg-blue-500 text-white rounded-md" onClick={handleAddBook}>
            Add Book
          </button>
        </div>
      </div>

      {/* Books Table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-600">Books List</h3>
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">${book.price}</td>
                <td className="px-4 py-2">
                  {book.approved === 'PENDING' ? (
                    <span className="text-yellow-500">Pending</span>
                  ) : book.approved === 'ACCEPTED' ? (
                    <span className="text-green-500">Approved</span>
                  ) : (
                    <span className="text-red-500">Rejected</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button className="mr-2 text-blue-500" onClick={() => setEditingBook(book)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {editingBook && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-600">Edit Book</h3>
          <div className="space-y-4 mt-4">
            <div className="flex items-center space-x-4">
              <label className="w-32 text-gray-600">Title:</label>
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={editingBook.title}
                onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-32 text-gray-600">Author:</label>
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={editingBook.author}
                onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-32 text-gray-600">Price:</label>
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={editingBook.price}
                onChange={(e) => setEditingBook({ ...editingBook, price: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-32 text-gray-600">Description:</label>
              <textarea
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={editingBook.description}
                onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-32 text-gray-600">Image:</label>
              <input
                type="file"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                onChange={(e) => handleImageChange(e, true)}
              />
              {editingBook.image && (
                <div className="mt-2">
                  <img src={editingBook.image} alt="Book" className="w-24 h-24 object-cover rounded-md" />
                </div>
              )}
            </div>
            <button
              className="w-full py-2 bg-green-500 text-white rounded-md"
              onClick={() => handleEditBook(editingBook.bookid)}
            >
              Update Book
            </button>
            <button
              className="w-full py-2 bg-gray-300 text-gray-700 rounded-md"
              onClick={() => setEditingBook(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;




















// import React, { useState, useEffect } from 'react';
// import { GetBooks, AddBook, EditBook, DeleteBook } from './Controller/Apis';  // Replace with your API calls

// const ManageBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [newBook, setNewBook] = useState({
//     title: '',
//     author: '',
//     price: '',
//     description: '',
//   });
//   const [editingBook, setEditingBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         // Fetch the list of books (including their approval status)
//         const data = await GetBooks();
//         setBooks(data);
//       } catch (err) {
//         setError('Error fetching books');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const handleAddBook = async () => {
  // if (!newBook.title || !newBook.author || !newBook.price) {
  //   setError('All fields are required');
  //   return;
  // }
//     try {
//       // Add the new book with 'pending' approval status
//       const newBookWithStatus = { ...newBook, approvalStatus: 'pending' };
//       await AddBook(newBookWithStatus);
//       setBooks([...books, newBookWithStatus]);  // Update the state with the newly added book
//       setNewBook({
//         title: '',
//         author: '',
//         price: '',
//         description: '',
//       });
//     } catch (err) {
//       setError('Error adding book');
//     }
//   };

//   const handleEditBook = async (id) => {
//     try {
//       await EditBook(id, editingBook);
//       setBooks(
//         books.map((book) => (book.id === id ? { ...book, ...editingBook } : book))
//       );
//       setEditingBook(null);
//     } catch (err) {
//       setError('Error updating book');
//     }
//   };

//   const handleDeleteBook = async (id) => {
//     try {
//       await DeleteBook(id);
//       setBooks(books.filter((book) => book.id !== id));  // Remove the deleted book from state
//     } catch (err) {
//       setError('Error deleting book');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-gray-800">Manage Books</h1>

//       {/* Add New Book Form */}
//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-semibold text-gray-600">Add New Book</h3>
//         <div className="space-y-4 mt-4">
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             placeholder="Title"
//             value={newBook.title}
//             onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
//           />
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             placeholder="Author"
//             value={newBook.author}
//             onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
//           />
//           <input
//             type="number"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             placeholder="Price"
//             value={newBook.price}
//             onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
//           />
//           <textarea
//             className="w-full p-2 border border-gray-300 rounded-md"
//             placeholder="Description"
//             value={newBook.description}
//             onChange={(e) =>
//               setNewBook({ ...newBook, description: e.target.value })
//             }
//           ></textarea>
//           <button
//             className="w-full py-2 bg-blue-500 text-white rounded-md"
//             onClick={handleAddBook}
//           >
//             Add Book
//           </button>
//         </div>
//       </div>

//       {/* Books List */}
//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-semibold text-gray-600">Books List</h3>
//         <table className="min-w-full mt-4 table-auto">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left">Title</th>
//               <th className="px-4 py-2 text-left">Author</th>
//               <th className="px-4 py-2 text-left">Price</th>
//               <th className="px-4 py-2 text-left">Status</th> {/* Added Status Column */}
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book.id}>
//                 <td className="px-4 py-2">{book.title}</td>
//                 <td className="px-4 py-2">{book.author}</td>
//                 <td className="px-4 py-2">${book.price}</td>
//                 <td className="px-4 py-2">
//                   {book.approvalStatus === 'pending' ? (
//                     <span className="text-yellow-500">Pending</span>
//                   ) : book.approvalStatus === 'approved' ? (
//                     <span className="text-green-500">Approved</span>
//                   ) : (
//                     <span className="text-red-500">Rejected</span>
//                   )}
//                 </td>
//                 <td className="px-4 py-2">
//                   {/* Edit and Delete buttons */}
//                   <button
//                     className="mr-2 text-blue-500"
//                     onClick={() => setEditingBook(book)}
//                   >
//                     Edit
//                   </button>
//                   {book.approvalStatus !== 'pending' && (
//                     <button
//                       className="text-red-500"
//                       onClick={() => handleDeleteBook(book.id)}
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Book Form (appears when clicking Edit button) */}
//       {editingBook && (
//         <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold text-gray-600">Edit Book</h3>
//           <div className="space-y-4 mt-4">
//             <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Title"
//               value={editingBook.title}
//               onChange={(e) =>
//                 setEditingBook({ ...editingBook, title: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Author"
//               value={editingBook.author}
//               onChange={(e) =>
//                 setEditingBook({ ...editingBook, author: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Price"
//               value={editingBook.price}
//               onChange={(e) =>
//                 setEditingBook({ ...editingBook, price: e.target.value })
//               }
//             />
//             <textarea
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Description"
//               value={editingBook.description}
//               onChange={(e) =>
//                 setEditingBook({ ...editingBook, description: e.target.value })
//               }
//             ></textarea>
//             <button
//               className="w-full py-2 bg-green-500 text-white rounded-md"
//               onClick={() => handleEditBook(editingBook.id)}
//             >
//               Update Book
//             </button>
//             <button
//               className="w-full py-2 bg-gray-300 text-gray-700 rounded-md"
//               onClick={() => setEditingBook(null)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageBooks;



// {title: "RICH DAD POOR DAD", author: "Robert T. Kiyosaki", price: "99",…}
// author
// : 
// "Robert T. Kiyosaki"
// description
// : 
// "It’s been nearly 25 years since Robert Kiyosaki’s Rich Dad Poor Dad first made waves in the Personal Finance arena.\\nIt has since become the #1 Personal Finance book of all time… translated into dozens of languages and sold around the world."
// image
// : 
// ""
// price
// : 
// "99"
// title
// : 
// "RICH DAD POOR DAD"