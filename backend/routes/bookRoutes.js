const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer'); // For image uploads
const Book = require('../models/book');
const { verifyAdmin } = require('../middlewares/auth');
const { errors, success } = require('../constants/messages');

const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Add a new book (Admin only, with optional image upload)
router.post(
  '/',
  verifyAdmin,
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('description').optional().isLength({ max: 500 }).withMessage('Description too long'),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ success: false, errors: validationErrors.array() });
    }

    const { title, author, description } = req.body;
    const image = req.file ? req.file.path : null;

    try {
      const newBook = new Book({ title, author, description, image });
      await newBook.save();
      res.status(201).json({
        success: true,
        message: success.bookAdded,
        book: newBook,
      });
    } catch (err) {
      console.error('Error adding book:', err.message);
      res.status(500).json({ success: false, message: errors.addBookFailed });
    }
  }
);

// Update an existing book (Admin only)
router.put(
  '/:id',
  verifyAdmin,
  upload.single('image'),
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('author').optional().notEmpty().withMessage('Author cannot be empty'),
    body('description').optional().isLength({ max: 500 }).withMessage('Description too long'),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ success: false, errors: validationErrors.array() });
    }

    const { id } = req.params;
    const { title, author, description } = req.body;
    const image = req.file ? req.file.path : null;

    try {
      const updateData = { title, author, description };
      if (image) updateData.image = image;

      const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ success: false, message: errors.bookNotFound });
      }

      res.status(200).json({
        success: true,
        message: success.bookUpdated,
        book: updatedBook,
      });
    } catch (err) {
      console.error('Error updating book:', err.message);
      res.status(500).json({ success: false, message: errors.updateBookFailed });
    }
  }
);

// Delete a book (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ success: false, message: errors.bookNotFound });
    }

    res.status(200).json({
      success: true,
      message: success.bookRemoved,
    });
  } catch (err) {
    console.error('Error deleting book:', err.message);
    res.status(500).json({ success: false, message: errors.removeBookFailed });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, books });
  } catch (err) {
    console.error('Error fetching books:', err.message);
    res.status(500).json({ success: false, message: errors.fetchBooksFailed });
  }
});

// Get a specific book by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: errors.bookNotFound });
    }

    res.status(200).json({ success: true, book });
  } catch (err) {
    console.error('Error fetching book:', err.message);
    res.status(500).json({ success: false, message: errors.fetchBookFailed });
  }
});

module.exports = router;
