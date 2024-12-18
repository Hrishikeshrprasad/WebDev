const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Book = require('../models/book');
const User = require('../models/User');
const { verifyAdmin } = require('../middlewares/auth');
const { errors, success } = require('../constants/messages');

const router = express.Router();

// Admin login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ success: false, errors: validationErrors.array() });
    }

    const { email, password } = req.body;

    try {
      const admin = await User.findOne({ email, isAdmin: true });
      if (!admin) {
        return res.status(401).json({ success: false, message: errors.invalidCredentials });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: errors.invalidCredentials });
      }

      const token = jwt.sign(
        { userId: admin._id, email: admin.email, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      res.status(200).json({
        success: true,
        token,
        admin: { id: admin._id, email: admin.email },
        message: success.adminLogin,
      });
    } catch (err) {
      console.error('Error during admin login:', err.message);
      res.status(500).json({ success: false, message: errors.serverError });
    }
  }
);

// Add a book (admin only)
router.post(
  '/books',
  verifyAdmin,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('description').optional().isLength({ max: 500 }).withMessage('Description must be 500 characters or less'),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ success: false, errors: validationErrors.array() });
    }

    const { title, author, description } = req.body;

    try {
      const newBook = new Book({ title, author, description });
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

// Remove a book (admin only)
router.delete('/books/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ success: false, message: errors.bookNotFound });
    }
    res.status(200).json({ success: true, message: success.bookRemoved });
  } catch (err) {
    console.error('Error removing book:', err.message);
    res.status(500).json({ success: false, message: errors.removeBookFailed });
  }
});

module.exports = router;
