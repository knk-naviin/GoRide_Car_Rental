const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Car = require("../models/Car");
const User = require("../models/User");

// 🛠 Dashboard Statistics Route (Admin Only)
router.get("/dashboard", async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const carsCount = await Car.countDocuments();
    const bookingsPending = await Booking.countDocuments({ status: "pending" });
    const bookingsConfirmed = await Booking.countDocuments({ status: "confirmed" });

    let totalRevenue = 0;
    const { month, year } = req.query;
    const bookingsQuery = { status: "confirmed" };

    // 🗓 If month & year are provided, filter bookings by fromDate
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      bookingsQuery.fromDate = { $gte: startDate, $lt: endDate };
    }

    // 🔍 Fetch confirmed bookings with car details
    let bookings = await Booking.find(bookingsQuery).populate("carId");

    // 🏷 Calculate total revenue (rentPrice * total days)
    bookings.forEach((booking) => {
      if (booking.carId && booking.carId.rentPrice) {
        const daysBooked =
          Math.ceil((new Date(booking.toDate) - new Date(booking.fromDate)) / (1000 * 60 * 60 * 24)) || 1;
        totalRevenue += booking.carId.rentPrice * daysBooked;
      }
    });

    return res.status(200).json({
      usersCount,
      carsCount,
      bookingsPending,
      bookingsConfirmed,
      totalRevenue,
      bookings, // For graphs/tables if needed
    });
  } catch (error) {
    console.error("❌ Error fetching dashboard stats:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
