import React, { useEffect, useState } from "react";
import { fetchBookingsByUserId } from "../services/api";
import BookingCard from "../components/BookingCard";
import GoogleSignIn from "../components/GoogleSignIn";
import LoadingSpinner from "../components/LoadingSpinner";

const Bookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const getBookings = async () => {
        try {
          const data = await fetchBookingsByUserId(user.googleId);
          setBookings(data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      };
      getBookings();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="bookings-container">
        <h2>Please sign in to view your bookings.</h2>
        <GoogleSignIn />
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bookings-container">
      <h2>Your Bookings</h2>
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

export default Bookings;