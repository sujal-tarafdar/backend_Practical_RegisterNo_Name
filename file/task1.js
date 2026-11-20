require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/library_db';

// 1. Built-in Middleware & Logger Middleware
app.use(express.json());

// Custom Logger Middleware: Logs HTTP method and URL
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// 2. Mongoose Schema & Model
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be at least 1']
    },
    category: {
      type: String,
      trim: true,
      default: 'General'
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

// 3. CRUD Routes

// POST /books - Add a new book (201 Created)
app.post('/books', async (req, res, next) => {
  try {
    const { title, author, price, category, isAvailable } = req.body;
    const newBook = new Book({ title, author, price, category, isAvailable });
    const savedBook = await newBook.save();
    return res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: savedBook
    });
  } catch (error) {
    next(error);
  }
});

// GET /books - List all books (200 OK)
app.get('/books', async (req, res, next) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// GET /books/:id - Get a single book by ID (200 OK / 404 Not Found)
app.get('/books/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with id ${req.params.id} not found`
      });
    }
    return res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    next(error);
  }
});

// PUT /books/:id - Update a book by ID (200 OK / 404 Not Found / 400 Bad Request)
app.put('/books/:id', async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: `Book with id ${req.params.id} not found`
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /books/:id - Delete a book by ID (200 OK / 404 Not Found)
app.delete('/books/:id', async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: `Book with id ${req.params.id} not found`
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: deletedBook
    });
  } catch (error) {
    next(error);
  }
});


// 4. Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error encountered:', err.message);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ID format: ${err.value}`
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 5. Database Connection & Server Start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`Task 1 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
