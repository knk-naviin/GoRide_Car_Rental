const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const upload = require('../utils/upload');

// Add a New Car (Uploads images to Cloudinary)
router.post('/', upload.array('images', 5), carController.addCar);

// Get All Cars
router.get('/', carController.getAllCars);

// Get Car by ID
router.get('/:id', carController.getCarById);

// Update Car by ID (Uploads new images to Cloudinary)
router.put('/:id', upload.array('images', 5), carController.updateCar);

// Delete Car by ID
router.delete('/:id', carController.deleteCar);

module.exports = router;
