const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const carRoutes = require('./app/routes/carRoutes');
const authRoutes = require('./app/routes/authRoutes'); 
const userRoute = require('./app/routes/userRoutes'); // Import auth routes
// Import auth routes
const db = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Database Connection
db.connect();

// Routes
app.use('/cars', carRoutes);
app.use('/auth', authRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
