const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get All Users
router.get('/', userController.getAllUsers);

module.exports = router;