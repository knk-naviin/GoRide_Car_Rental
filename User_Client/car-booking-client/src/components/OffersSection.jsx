import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car, user }) => {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <h3>{car.name}</h3>
      <p>{car.price}</p>
      {user ? (
        <Link to={`/book/${car._id}`} className="book-button">
          Book Now
        </Link>
      ) : (
        <p>Sign in to book this car.</p>
      )}
    </div>
  );
};

export default CarCard;