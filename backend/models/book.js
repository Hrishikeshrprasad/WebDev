const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date },
  genre: { type: String },
  description: { type: String },
});

// Export the model, ensuring it is not redefined
module.exports = mongoose.models.Book || mongoose.model('Book', BookSchema);
