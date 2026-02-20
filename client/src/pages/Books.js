import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Books = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '', year: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchBooks();
    }
  }, [token, navigate, page, search]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8800/api/books?page=${page}&limit=5&search=${search}`);
      setBooks(res.data.books);
      setTotalPages(res.data.pages);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingBook) {
        await axios.put(`http://localhost:8800/api/books/${editingBook._id}`, formData);
      } else {
        await axios.post('http://localhost:8800/api/books', formData);
      }
      setFormData({ title: '', author: '', year: '', description: '' });
      setShowForm(false);
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({ title: book.title, author: book.author, year: book.year, description: book.description || '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:8800/api/books/${id}`);
        fetchBooks();
      } catch (err) {
        setError('Failed to delete book');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        <span className="logo">Books Management</span>
        <div>
          <a href="/books">Home</a>
          <button onClick={handleLogout} className="btn btn-danger" style={{ marginLeft: '20px' }}>Logout</button>
        </div>
      </nav>

      <div className="container">
        <h1>My Books</h1>

        {error && <p className="error">{error}</p>}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Book'}
          </button>
        </div>

        {showForm && (
          <div className="card">
            <h3>{editingBook ? 'Edit Book' : 'Add New Book'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {editingBook ? 'Update' : 'Create'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <div className="books-grid">
            {books.map((book) => (
              <div key={book._id} className="book-card">
                <h3>{book.title}</h3>
                <p className="author">by {book.author}</p>
                <p className="year">{book.year}</p>
                {book.description && <p>{book.description}</p>}
                <div className="book-actions">
                  <button className="btn btn-secondary" onClick={() => handleEdit(book)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="btn btn-secondary"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              className="btn btn-secondary"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
