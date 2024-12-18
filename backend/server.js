const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON request bodies

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Add a health check/test endpoint for API
app.get('/api/auth/test', (req, res) => {
  res.status(200).json({ message: 'Test route is working!' });
});

// API Routes
app.use('/api/auth', authRoutes);   // Routes for authentication (login, signup, token verification)
app.use('/api/books', bookRoutes); // Routes for book-related APIs
app.use('/api/admin', adminRoutes); // Routes for admin-related APIs

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Timeout for server selection
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the app if unable to connect to the database
  });

// Global 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler middleware (optional for debugging)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal server error occurred' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
