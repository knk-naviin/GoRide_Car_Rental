const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const carRoutes = require('./app/routes/carRoutes');
const userRoutes = require('./app/routes/userRoutes');
const authRoutes = require('./app/routes/authRoutes');
const bookingRoutes = require('./app/routes/bookingRoutes');
const db = require('./config/db');
require('dotenv').config();
const adminRoutes = require('./app/routes/adminRoutes');

require('./config/passport'); // Load Passport configuration

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Session Configuration
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
db.connect();

// Routes
app.use('/cars', carRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Opener-Policy");
  res.removeHeader("Cross-Origin-Embedder-Policy");
  next();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});