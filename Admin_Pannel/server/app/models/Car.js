const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  rentPrice: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  kilometerPerDay: { type: Number, required: true },
  extraKmPrice: { type: Number, required: true },
  extraHourPrice: { type: Number, required: true },
  carType: { type: String, required: true }, // e.g., Sedan, SUV, Hatchback
  seats: { type: Number, required: true },
  fuelType: { type: String, enum: ['Petrol', 'Diesel'], required: true },
  transmissionType: { type: String, enum: ['Automatic', 'Manual'], required: true },
  images: [String], // Array of image paths
});

module.exports = mongoose.model('Car', carSchema);