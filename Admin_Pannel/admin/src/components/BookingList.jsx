import { useState, useEffect } from "react";
import { fetchBookings, deleteBooking, updateBookingStatus } from "../api";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking(id);
        fetchData();
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const handleConfirm = async (id) => {
    try {
      await updateBookingStatus(id, "confirmed");
      fetchData();
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <h1 className="my-4">Bookings</h1>
      <button onClick={fetchData} className="btn btn-primary mb-4">Refresh List</button>
      <ul className="list-group">
        {bookings.map((booking) => (
          <li key={booking._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <Link to={`/bookings/${booking._id}`} className="text-decoration-none">
                {booking.name} ({booking.phoneNumber})
              </Link>
              <p className="mb-0"><strong>Email:</strong> {booking.userId?.email || "N/A"}</p>
            </div>
            <div>
              <button onClick={() => handleConfirm(booking._id)} className="btn btn-success me-2">Confirm</button>
              <button onClick={() => handleDelete(booking._id)} className="btn btn-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
