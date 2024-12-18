import axios from 'axios';

// Set the base URL for all API requests
const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // Your backend URL (make sure backend is running)
});

// Get all books
export const getBooks = async () => {
  const response = await API.get('/books');
  return response.data;
};

// Add a new book
export const addBook = async (bookData) => {
  const response = await API.post('/books', bookData);
  return response.data;
};

// User signup
export const signup = async (userData) => {
  const response = await API.post('/auth/signup', userData);
  return response.data;
};

// User login
export const login = async (userData) => {
  const response = await API.post('/auth/login', userData);
  return response.data;
};
