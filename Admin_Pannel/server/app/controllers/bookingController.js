const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { car, startDate, endDate, totalPrice } = req.body;
    const newBooking = new Booking({ user: req.user.id, car, startDate, endDate, totalPrice });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('car');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
