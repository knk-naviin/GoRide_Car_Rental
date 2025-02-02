import { useState, useEffect } from "react";
import { fetchBookings } from "../api";
import LoadingSpinner from "./LoadingSpinner";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchBookings();
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <h1 className="my-4">Bookings</h1>
      <button onClick={fetchData} className="btn btn-primary mb-4">
        Refresh List
      </button>
      <div className="row">
        {bookings.map((booking) => (
          <div key={booking._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{booking.name}</h5>
                <p className="card-text">Phone: {booking.phoneNumber}</p>
                <p className="card-text">Address: {booking.currentAddress}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;