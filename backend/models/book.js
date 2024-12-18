const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date },
  genre: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('Book', BookSchema);