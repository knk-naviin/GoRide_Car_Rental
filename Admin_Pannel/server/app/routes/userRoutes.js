const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get All Users
router.get('/', userController.getAllUsers);

// Get User by ID
router.get('/:id', userController.getUserById);

// Delete User by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
