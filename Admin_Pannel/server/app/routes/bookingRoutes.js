const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const upload = require('../utils/upload');

// Create a Booking
router.post(
  '/',
  upload.fields([
    { name: 'aadharFront', maxCount: 1 },
    { name: 'aadharBack', maxCount: 1 },
    { name: 'drivingLicenseFront', maxCount: 1 },
    { name: 'drivingLicenseBack', maxCount: 1 },
  ]),
  bookingController.createBooking
);

// Get All Bookings
router.get('/', bookingController.getAllBookings);

// Get Booking by ID
router.get('/:id', bookingController.getBookingById);

// Update Booking Status
router.put('/:id', bookingController.updateBookingStatus);

// Delete Booking
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
