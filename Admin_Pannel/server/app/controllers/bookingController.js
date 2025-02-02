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

    const aadharFront = req.files['aadharFront'][0].path;
    const aadharBack = req.files['aadharBack'][0].path;
    const drivingLicenseFront = req.files['drivingLicenseFront'][0].path;
    const drivingLicenseBack = req.files['drivingLicenseBack'][0].path;

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

    // Send booking details to admin's email
    await sendBookingEmail(newBooking);

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId').populate('carId');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
};