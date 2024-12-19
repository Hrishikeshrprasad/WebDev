const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// User signup route
router.post(
  '/signup',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        const conflictField = existingUser.email === email ? 'email' : 'username';
        // Fixed the string interpolation using backticks (` `)
        return res.status(400).json({ success: false, message: `${conflictField} is already taken` });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (err) {
      console.error('Error during signup:', err.message);
      res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
  }
);

// User login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'Email not registered. Please sign up.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Incorrect password. Please try again.' });
      }

      const token = jwt.sign(
        { userId: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      res.status(200).json({
        success: true,
        token,
        user: { id: user._id, username: user.username, email: user.email },
        message: 'Login successful',
      });
    } catch (err) {
      console.error('Error during login:', err.message);
      res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
  }
);

// Token verification route
router.post('/verify-token', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ success: true, decoded, message: 'Token is valid' });
  } catch (err) {
    console.error('Error during token verification:', err.message);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

// Get user profile route
router.get('/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password').populate('booksRead');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user, message: 'User profile retrieved successfully' });
  } catch (err) {
    console.error('Error retrieving user data:', err.message);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

// Debugging route to check if routes are working
router.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: 'Auth routes are working!' });
});

module.exports = router;
