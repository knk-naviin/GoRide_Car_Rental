// adminRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');

router.get('/dashboard', async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const carsCount = await Car.countDocuments();
    const bookingsPending = await Booking.countDocuments({ status: 'pending' });
    const bookingsConfirmed = await Booking.countDocuments({ status: 'confirmed' });

    let totalRevenue = 0;
    const { month, year } = req.query;
    const bookingsQuery = { status: 'confirmed' };

    // If month and year are provided, filter the bookings by their fromDate.
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      bookingsQuery.fromDate = { $gte: startDate, $lt: endDate };
    }

    // Find confirmed bookings and populate carId to access rentPrice
    let bookings = await Booking.find(bookingsQuery).populate('carId');

    // Calculate total revenue (assumed as rentPrice * totalDays)
    bookings.forEach((b) => {
      if (b.carId && b.carId.rentPrice) {
        totalRevenue += b.carId.rentPrice * b.totalDays;
      }
    });

    res.json({
      usersCount,
      carsCount,
      bookingsPending,
      bookingsConfirmed,
      totalRevenue,
      bookings, // For graph/table details if needed
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
