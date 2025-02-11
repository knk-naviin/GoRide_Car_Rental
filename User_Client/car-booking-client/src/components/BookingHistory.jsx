import React from "react";
import { fetchBookingsByUserId } from "../services/api";
import BookingCard from "./BookingCard";

const BookingHistory = ({ userId }) => {
  const [bookings, setBookings] = React.useState([]);

  React.useEffect(() => {
    const fetchBookings = async () => {
      const data = await fetchBookingsByUserId(userId);
      setBookings(data);
    };
    fetchBookings();
  }, [userId]);

  return (
    <div className="booking-history">
      <h2>Booking History</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingHistory;