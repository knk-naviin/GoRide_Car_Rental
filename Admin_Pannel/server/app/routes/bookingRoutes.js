const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const upload = require('../utils/upload');

// ✅ Create a Booking (Now Uses `userId` instead of `googleId`)
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

// ✅ Get ALL Bookings (For Admins)
router.get('/', bookingController.getAllBookings);

// ✅ Get Booking by Booking ID
router.get('/booking/:id', bookingController.getBookingById);

// ✅ Get Bookings by User ID
router.get('/user/:id', bookingController.getBookingsByUserId);

// ✅ Update Booking Status (Pending → Confirmed)
router.put('/:id', bookingController.updateBookingStatus);

// ✅ Delete a Booking
router.delete('/:id', bookingController.deleteBooking);



module.exports = router;
