import React from "react";

const BookingCard = ({ booking }) => {
  return (
    <div className="booking-card">
      <h3>{booking.carId.carName}</h3>
      <p>
        <strong>Dates:</strong> {new Date(booking.fromDate).toLocaleDateString()} - {new Date(booking.toDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Status:</strong> {booking.status}
      </p>
    </div>
  );
};

export default BookingCard;