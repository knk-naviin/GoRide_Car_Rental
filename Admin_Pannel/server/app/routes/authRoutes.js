const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.registerUser);

// Login user
router.post('/login', authController.loginUser);

// Google Sign-In
router.post('/google-signin', authController.googleSignIn);

router.get('/getuser',authController.getUser)

module.exports = router;
