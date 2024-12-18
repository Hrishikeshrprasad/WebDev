const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const env=require('dotenv').config();  // Ensure you are loading environment variables
('dotenv').config(); 
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Enable CORS for all origins (so frontend can access the backend)
app.use(express.json());  // Parse JSON request bodies
app.use('/api/books', bookRoutes);  // Route for books API
app.use('/api/auth', authRoutes);   // Route for authentication API
app.get('/', (req, res) => {
  res.send('Backend is working!');
});
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,  // Increase the timeout to 30 seconds
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Routes


// API Routes


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
