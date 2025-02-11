const mongoose = require('mongoose');
require('dotenv').config();

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Use ObjectId for linking
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  currentAddress: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  aadharFront: { type: String, required: true },
  aadharBack: { type: String, required: true },
  drivingLicenseNumber: { type: String, required: true },
  drivingLicenseFront: { type: String, required: true },
  drivingLicenseBack: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'expired'], default: 'pending' },
});



// Automatically set status to "expired" if `toDate` has passed
bookingSchema.pre('save', function (next) {
  if (this.toDate < new Date() && this.status !== 'expired') {
    this.status = 'expired';
  }
  next();
});

// Static method to update expired bookings
bookingSchema.statics.updateExpiredBookings = async function () {
  await this.updateMany(
    { toDate: { $lt: new Date() }, status: { $ne: 'expired' } },
    { $set: { status: 'expired' } }
  );
};

module.exports = mongoose.model('Booking', bookingSchema);
