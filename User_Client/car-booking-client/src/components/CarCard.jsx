import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <img src={car.images[0]} alt={car.carName} className="car-img" />
      <h3>{car.carName}</h3>
      <p>₹{car.rentPrice} per day</p>
      <Link to={`/cars/${car._id}`} className="button">View Details</Link>
    </div>
  );
};

export default CarCard;
