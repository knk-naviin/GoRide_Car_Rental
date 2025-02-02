const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');
const { sendBookingEmail } = require('../utils/email');
const upload = require('../utils/upload');
require('dotenv').config();

// Create a Booking
const createBooking = async (req, res) => {
  try {
    const {
      userId,
      carId,
      name,
      phoneNumber,
      currentAddress,
      aadharNumber,
      drivingLicenseNumber,
      fromDate,
      toDate,
      totalDays,
    } = req.body;

    console.log('Request Body:', req.body);
    console.log('Request Files:', req.files);

    // Check that all required file fields exist
    if (
      !req.files ||
      !req.files["aadharFront"] ||
      !req.files["aadharBack"] ||
      !req.files["drivingLicenseFront"] ||
      !req.files["drivingLicenseBack"]
    ) {
      return res.status(400).json({ error: "Missing required documents." });
    }

    const aadharFront = req.files["aadharFront"][0]?.path;
    const aadharBack = req.files["aadharBack"][0]?.path;
    const drivingLicenseFront = req.files["drivingLicenseFront"][0]?.path;
    const drivingLicenseBack = req.files["drivingLicenseBack"][0]?.path;

    if (!aadharFront || !aadharBack || !drivingLicenseFront || !drivingLicenseBack) {
      return res.status(400).json({ error: "File upload failed for one or more documents." });
    }

    const newBooking = new Booking({
      userId,
      carId,
      name,
      phoneNumber,
      currentAddress,
      aadharNumber,
      aadharFront,
      aadharBack,
      drivingLicenseNumber,
      drivingLicenseFront,
      drivingLicenseBack,
      fromDate,
      toDate,
      totalDays,
    });

    await newBooking.save();
    await sendBookingEmail(newBooking);

    return res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId").populate("carId");
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// Get Booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("userId").populate("carId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// Update Booking Status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking status:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// Delete Booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};
