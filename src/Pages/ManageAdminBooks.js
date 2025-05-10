import React, { useState, useEffect } from 'react';
import {
  AddBook,
  GetAlladminBooks,
  UpdateUserBook,
  RemoveBook,
  ApproveBook,
} from './Controller/Apis';

const ManageAdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '', description: '', image: '' });
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const userBooks = await GetAlladminBooks();
      setBooks(userBooks);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.price) {
      setError('All fields are required');
      return;
    }

    try {
      const savedBook = await AddBook(newBook);
      setBooks(prev => [...prev, savedBook]);
      setNewBook({ title: '', author: '', price: '', description: '', image: '' });
    } catch (err) {
      setError('Error adding book');
    }
  };

  const handleEditBook = async (id) => {
    try {
      const updated = await UpdateUserBook(editingBook, id);
      setBooks(books.map((b) => (b.id === id ? updated : b)));
      setEditingBook(null);
    } catch {
      setError('Error updating book');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await RemoveBook(id);
      setBooks(books.filter((b) => b.id !== id));
      alert("Succesfully Deleted Book");
    } catch {
      setError('Failed to delete book');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await ApproveBook(id, status);
      setBooks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, approvalStatus: status } : b))
      );
      alert("Book Status Change Successfull!");
    } catch {
      setError('Failed to change status');
    }
  };

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

  const handlePriceChange = (e, isEdit = false) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (isEdit) {
        setEditingBook({ ...editingBook, price: value });
      } else {
        setNewBook({ ...newBook, price: value });
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">📚 Manage Your Books</h1>

      {loading && <p className="text-gray-500">Loading books...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Add Book */}
      <div className="mt-6 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold">Add a New Book</h2>
        <div className="space-y-3 mt-4">
          <input className="w-full p-2 border rounded" placeholder="Title" value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
          <input className="w-full p-2 border rounded" placeholder="Author" value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
          <input className="w-full p-2 border rounded" placeholder="Price" value={newBook.price}
            onChange={(e) => handlePriceChange(e)} />
          <textarea className="w-full p-2 border rounded" placeholder="Description"
            value={newBook.description} onChange={(e) => setNewBook({ ...newBook, description: e.target.value })} />
          <input type="file" onChange={(e) => handleImageChange(e)} />
          {newBook.image && <img src={newBook.image} className="w-20 mt-2" />}
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddBook}>
            Add Book
          </button>
        </div>
      </div>

      {/* Books List */}
      <div className="mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold">Your Books</h2>
        <table className="w-full mt-4 table-auto text-sm">
          <thead>
            <tr className="text-middle border-b">
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Status</th>
              <th colSpan="3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-t">
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>${book.price}</td>
                <td>
                  <span className={`font-medium ${
                    book.approvalStatus === 'approved'
                      ? 'text-green-600'
                      : book.approvalStatus === 'rejected'
                      ? 'text-red-600'
                      : 'text-yellow-500'
                  }`}>
                    {book.approved}
                  </span>
                </td>
                <td>
                  <button onClick={() => setEditingBook(book)} className="text-blue-600">Edit</button>
                </td>
                <td>
                  <button 
                  onClick={() => handleDeleteBook(book.bookid)} 
                  className="text-red-500">Delete</button>
                </td>
                <td>
                  <select
                    value={book.approved}
                    onChange={(e) => handleStatusChange(book.bookid, e.target.value)}
                    className="border rounded px-1 py-0.5"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="ACCEPTED">Approve</option>
                    <option value="REJECTED">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Book Form */}
      {editingBook && (
        <div className="mt-8 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Edit Book</h2>
          <div className="space-y-3 mt-4">
            <input className="w-full p-2 border rounded" placeholder="Title"
              value={editingBook.title} onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })} />
            <input className="w-full p-2 border rounded" placeholder="Author"
              value={editingBook.author} onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} />
            <input className="w-full p-2 border rounded" placeholder="Price"
              value={editingBook.price} onChange={(e) => handlePriceChange(e, true)} />
            <textarea className="w-full p-2 border rounded"
              value={editingBook.description}
              onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })} />
            <input type="file" onChange={(e) => handleImageChange(e, true)} />
            {editingBook.image && <img src={editingBook.image} className="w-20 mt-2" />}
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleEditBook(editingBook.bookid)}>
              Update Book
            </button>
            <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={() => setEditingBook(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAdminBooks;
