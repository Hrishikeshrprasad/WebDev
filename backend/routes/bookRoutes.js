const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  const { title, author, publishedDate, genre, description } = req.body;
  const book = new Book({
    title,
    author,
    publishedDate,
    genre,
    description
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
