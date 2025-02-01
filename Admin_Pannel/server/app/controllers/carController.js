const Car = require('../models/Car');
const upload = require('../utils/upload');

// Add a New Car
const addCar = async (req, res) => {
  try {
    const {
      carName,
      rentPrice,
      kilometerPerDay,
      extraKmPrice,
      extraHourPrice,
      carType,
      seats,
      fuelType,
      transmissionType,
    } = req.body;

    const images = req.files.map((file) => file.path);

    const newCar = new Car({
      carName,
      rentPrice,
      kilometerPerDay,
      extraKmPrice,
      extraHourPrice,
      carType,
      seats,
      fuelType,
      transmissionType,
      images,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Cars


const getAllCars = async (req, res) => {
  try {
    const { carType, seats, fuelType, transmissionType, sort } = req.query;
    let query = {};

    if (carType) query.carType = carType;
    if (seats) query.seats = seats;
    if (fuelType) query.fuelType = fuelType;
    if (transmissionType) query.transmissionType = transmissionType;

    let cars = Car.find(query);
    if (sort) cars = cars.sort({ rentPrice: sort === 'asc' ? 1 : -1 });

    res.status(200).json(await cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Car by ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Car by ID
const updateCar = async (req, res) => {
  try {
    const {
      carName,
      rentPrice,
      kilometerPerDay,
      extraKmPrice,
      extraHourPrice,
      carType,
      seats,
      fuelType,
      transmissionType,
      isAvailable,
    } = req.body;

    const images = req.files ? req.files.map((file) => file.path) : undefined;

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      {
        carName,
        rentPrice,
        kilometerPerDay,
        extraKmPrice,
        extraHourPrice,
        carType,
        seats,
        fuelType,
        transmissionType,
        isAvailable,
        images,
      },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Car by ID
const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
};