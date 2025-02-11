const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');
const { sendBookingEmail } = require('../utils/email');
const upload = require('../utils/upload');
require('dotenv').config();
const mongoose = require("mongoose");

/**
 * @desc Create a new booking
 * @route POST /bookings
 */
const createBooking = async (req, res) => {
  try {
    console.log("📥 Request Received:", req.body);
    console.log("📂 Uploaded Files:", req.files);

    const {
      userId, // Now using ObjectId (_id) instead of googleId
      carId,
      phoneNumber,
      currentAddress,
      aadharNumber,
      drivingLicenseNumber,
      fromDate,
      toDate,
    } = req.body;

    // Ensure required fields exist
    if (!userId) {
      return res.status(400).json({ error: "User ID is required to book a car." });
    }

    // Validate User Existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found. Please sign in again." });
    }

    // Validate Uploaded Files
    if (
      !req.files ||
      !req.files["aadharFront"] ||
      !req.files["aadharBack"] ||
      !req.files["drivingLicenseFront"] ||
      !req.files["drivingLicenseBack"]
    ) {
      return res.status(400).json({ error: "All document uploads are required." });
    }

    const aadharFront = req.files["aadharFront"][0]?.path;
    const aadharBack = req.files["aadharBack"][0]?.path;
    const drivingLicenseFront = req.files["drivingLicenseFront"][0]?.path;
    const drivingLicenseBack = req.files["drivingLicenseBack"][0]?.path;

    // Validate Date Selection
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    if (endDate < startDate) {
      return res.status(400).json({ error: "To Date must be later than From Date." });
    }

    // Check for overlapping bookings for the same car
    const conflictingBookings = await Booking.find({
      carId,
      $or: [{ fromDate: { $lte: endDate }, toDate: { $gte: startDate } }],
    });

    if (conflictingBookings.length > 0) {
      return res.status(409).json({
        error: "The car is already booked for the selected dates.",
        suggestions: "Please select different dates or choose another available car.",
      });
    }

    // Create new booking
    const newBooking = new Booking({
      userId,
      carId,
      name: user.name, // Fetch user name from database
      phoneNumber,
      currentAddress,
      aadharNumber,
      aadharFront,
      aadharBack,
      drivingLicenseNumber,
      drivingLicenseFront,
      drivingLicenseBack,
      fromDate: startDate,
      toDate: endDate,
    });

    await newBooking.save();
    return res.status(201).json({ message: "Booking created successfully", booking: newBooking });

  } catch (error) {
    console.error("❌ Error creating booking:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

/**
 * @desc Fetch all bookings (Admin Only)
 * @route GET /bookings
 */
const getAllBookings = async (req, res) => {
  try {
    console.log("✅ Fetching all bookings...");
    const bookings = await Booking.find().populate("userId").populate("carId");
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

/**
 * @desc Get bookings for a specific user
 * @route GET /bookings/user/:id
 */
const getBookingsByUserId = async (req, res) => {
  try {
    const { id } = req.params; // Expecting user `_id` from MongoDB

    console.log("📤 Fetching bookings for User ID:", id); // Debugging

    if (!id) {
      return res.status(400).json({ error: "❌ User ID is required." });
    }

    // Ensure id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "❌ Invalid User ID format." });
    }

    // Fetch bookings using `userId` (MongoDB ObjectId), not `googleId`
    const bookings = await Booking.find({ userId: id }).populate("carId");

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings by user ID:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


/**
 * @desc Get a single booking by ID
 * @route GET /bookings/:id
 */

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "❌ Booking ID is required." });
    }

    const booking = await Booking.findById(id).populate("userId").populate("carId");

    if (!booking) {
      return res.status(404).json({ error: "❌ Booking not found." });
    }

    return res.status(200).json(booking);
  } catch (error) {
    console.error("❌ Error fetching booking by ID:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// const getBookingById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ error: "Booking ID is required." });
//     }

//     const booking = await Booking.findById(id).populate("userId").populate("carId");

//     if (!booking) {
//       return res.status(404).json({ error: "Booking not found." });
//     }

//     return res.status(200).json(booking);
//   } catch (error) {
//     console.error("❌ Error fetching booking by ID:", error);
//     return res.status(500).json({ error: error.message || "Internal Server Error" });
//   }
// };

/**
 * @desc Update booking status
 * @route PUT /bookings/:id
 */
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const validStatuses = ["pending", "confirmed", "expired"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const booking = await Booking.findById(id).populate("userId").populate("carId");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    booking.status = status;
    await booking.save();

    if (status === "confirmed") {
      await sendBookingEmail(booking);
    }

    return res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    console.error("❌ Error updating booking status:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

/**
 * @desc Delete a booking
 * @route DELETE /bookings/:id
 */
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Booking ID is required." });
    }

    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting booking:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUserId,
  updateBookingStatus,
  deleteBooking,
};
