import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserById, fetchBookingsByUserId } from "../api";
import LoadingSpinner from "./LoadingSpinner";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);

    // Fetch user details
    const userData = await fetchUserById(id);
    setUser(userData);

    // ✅ Fetch bookings using `user._id`, NOT `googleId`
    let userBookings = [];
    if (userData._id) {
      try {
        userBookings = await fetchBookingsByUserId(userData._id);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          userBookings = [];
        } else {
          throw err;
        }
      }
    }

    setBookings(userBookings);
  } catch (err) {
    console.error("❌ Error fetching user details:", err);
    setError(err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">Error: {error.message}</div>;
  if (!user) return <div className="alert alert-warning">User not found.</div>;

  return (
    <div className="container">
      <h1 className="my-4">User Details</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>
          {/* Additional user details can be added here */}
        </div>
      </div>

      <h2 className="my-4">Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found for this user.</p>
      ) : (
        <ul className="list-group">
          {bookings.map((booking) => (
            <li key={booking._id} className="list-group-item">
              <h5>{booking.car?.name || "Car name not available"}</h5>
              <p>
                <strong>Car Model:</strong> {booking.car?.model || "N/A"}
              </p>
              <p>
                <strong>Booking Date:</strong> {new Date(booking.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    booking.status === "confirmed" ? "bg-success" : "bg-warning"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDetails;
