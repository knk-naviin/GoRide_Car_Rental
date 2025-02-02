const mongoose = require('mongoose');
require('dotenv').config();

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  currentAddress: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  aadharFront: { type: String, required: true }, // Cloudinary URL
  aadharBack: { type: String, required: true }, // Cloudinary URL
  drivingLicenseNumber: { type: String, required: true },
  drivingLicenseFront: { type: String, required: true }, // Cloudinary URL
  drivingLicenseBack: { type: String, required: true }, // Cloudinary URL
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  totalDays: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
});

module.exports = mongoose.model('Booking', bookingSchema);