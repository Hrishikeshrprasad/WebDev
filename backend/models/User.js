const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'], // Validation for email format
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'], // Minimum length validation
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default value is false for regular users
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a method to the schema for additional functionality (optional, e.g., password hashing)
// Example:
// userSchema.methods.isValidPassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

const User = mongoose.model('User', userSchema);

module.exports = User;