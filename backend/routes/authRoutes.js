const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// User signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      const conflictField = existingUser.email === email ? 'email' : 'username';
      return res.status(400).json({ message: `${conflictField} is already taken` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error during signup:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error('Email not found:', email);
      return res.status(404).json({ message: 'Email not found. Please sign up.' }); // Specific message for email
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid password for email:', email);
      return res.status(401).json({ message: 'Incorrect password. Please try again.' }); // Specific message for password
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login successful, token generated:', token);

    res.status(200).json({ token, message: 'Login successful', username: user.username });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Token verification route
router.post('/verify-token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Token verified successfully:', decoded);

    res.status(200).json({ decoded, message: 'Token is valid' });
  } catch (err) {
    console.error('Error during token verification:', err.message);
    res.status(401).json({ message: 'Invalid or expired token', error: err.message });
  }
});

// Get user profile route
router.get('/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded token for user profile:', decoded);

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error retrieving user data:', err.message);
    res.status(401).json({ message: 'Invalid or expired token', error: err.message });
  }
});

// Debugging route to check if routes are working
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Auth routes are working!' });
});

module.exports = router;
