module.exports = {
    errors: {
      general: {
        serverError: 'Server error, please try again later.',
        notFound: 'Resource not found.',
        missingFields: 'All fields are required.',
      },
      auth: {
        invalidCredentials: 'Invalid email or password.',
        unauthorized: 'You are not authorized to perform this action.',
      },
      books: {
        bookNotFound: 'The requested book could not be found.',
        addBookFailed: 'Failed to add the book. Please try again.',
        removeBookFailed: 'Failed to remove the book. Please try again.',
      },
    },
    success: {
      general: {
        operationSuccessful: 'Operation completed successfully.',
      },
      auth: {
        adminLogin: 'Admin logged in successfully.',
      },
      books: {
        bookAdded: 'The book has been added successfully.',
        bookRemoved: 'The book has been removed successfully.',
      },
    },
  };
  