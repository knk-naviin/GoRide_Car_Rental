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

// Get All Cars with Sorting
const getAllCars = async (req, res) => {
  try {
    const { sortBy, order } = req.query;
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    }

    const cars = await Car.find().sort(sortOptions);
    res.status(200).json(cars);
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

//update an car

const updateCar = async (req, res) => {
  try {
    // First, fetch the current car document from the DB
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

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

    // Use the existing images from the DB if none are provided from the client
    let images = req.body.existingImages || car.images;
    
    // If there are new images uploaded, append them
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      images = [...images, ...newImages];
    }

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