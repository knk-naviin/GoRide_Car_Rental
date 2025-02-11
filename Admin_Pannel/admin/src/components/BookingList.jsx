import { useState, useEffect } from "react";
import { fetchBookings, deleteBooking, updateBookingStatus } from "../api";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleLoginButton from "./GoogleLoginButton"; // Import Google Sign-In

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchData(storedUser.googleId);
    }
  }, []);

  const fetchData = async () => {
  try {
    setLoading(true);
    const data = await fetchBookings();
    
    console.log("📋 Received bookings:", data); // Debug log
    setBookings(data);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this booking?")) {
    try {
      await deleteBooking(id, user.googleId); // Pass googleId
      fetchData(user.googleId);
    } catch (error) {
      console.error("❌ Error deleting booking:", error);
      alert("Failed to delete booking. Please try again.");
    }
  }
};

const handleConfirm = async (id) => {
  if (!window.confirm("Are you sure you want to confirm this booking?")) return;

  setConfirming(id);
  try {
    console.log(`📤 Sending booking confirmation request for ID: ${id}`);

    const response = await updateBookingStatus(id, "confirmed");
    
    console.log("✅ Booking confirmed:", response);
    alert("Booking confirmed successfully!");
    fetchData(); // Refresh the list
  } catch (error) {
    console.error("❌ Error confirming booking:", error.response?.data || error.message);
    alert(error.response?.data?.error || "Failed to confirm booking. Try again.");
  } finally {
    setConfirming(null);
  }
};


  if (!user) {
    return (
      <div className="text-center">
        <h2>Please Sign in to View Bookings</h2>
        <GoogleLoginButton onLogin={(newUser) => setUser(newUser)} />
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <h1 className="my-4">Bookings</h1>
      <button onClick={() => fetchData(user.googleId)} className="btn btn-primary mb-4">
        Refresh List
      </button>
      <ul className="list-group">
        {bookings.map((booking) => (
          <li key={booking._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <Link to={`/bookings/${booking._id}`} className="text-decoration-none">
                {booking.name} ({booking.phoneNumber})
              </Link>
              <p className="mb-0">
                <strong>Email:</strong> {booking.userId?.email || "N/A"}
              </p>
            </div>
            <div>
              {booking.status !== "confirmed" && (
                <button
                  onClick={() => handleConfirm(booking._id)}
                  className="btn btn-success me-2"
                  disabled={confirming === booking._id}
                >
                  {confirming === booking._id ? <CircularProgress size={20} color="inherit" /> : "Confirm"}
                </button>
              )}
              <button onClick={() => handleDelete(booking._id)} className="btn btn-danger">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
