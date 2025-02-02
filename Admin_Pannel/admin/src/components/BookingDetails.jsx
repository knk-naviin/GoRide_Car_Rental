import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBookingById } from "../api";
import LoadingSpinner from "./LoadingSpinner";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBookingById(id);
        setBooking(data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!booking) return <p>Booking not found.</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Booking Details</h1>
      <div className="card p-4">
        <h5 className="card-title">{booking.name}</h5>
        <p><strong>Email:</strong> {booking.userId?.email}</p>
        <p><strong>Phone:</strong> {booking.phoneNumber}</p>
        <p><strong>Address:</strong> {booking.currentAddress}</p>
        <p><strong>Status:</strong> <span className={`badge bg-${booking.status === "confirmed" ? "success" : "warning"}`}>{booking.status}</span></p>
        
        <h5 className="mt-4">Car Details</h5>
        <p><strong>Car Name:</strong> {booking.carId?.carName}</p>
        <p><strong>Rent Price:</strong> ${booking.carId?.rentPrice} per day</p>
        <p><strong>Car Type:</strong> {booking.carId?.carType}</p>
        <p><strong>Seats:</strong> {booking.carId?.seats}</p>
        <p><strong>Fuel Type:</strong> {booking.carId?.fuelType}</p>
        <p><strong>Transmission:</strong> {booking.carId?.transmissionType}</p>
        <div className="d-flex overflow-auto">
          {booking.carId?.images.map((img, index) => (
            <img key={index} src={img} alt="Car" className="img-thumbnail me-2" width="150" />
          ))}
        </div>

        <h5 className="mt-4">Documents</h5>
        <div className="d-flex flex-wrap">
          <img src={booking.aadharFront} alt="Aadhar Front" className="img-thumbnail me-2 mb-2" width="150" />
          <img src={booking.aadharBack} alt="Aadhar Back" className="img-thumbnail me-2 mb-2" width="150" />
          <img src={booking.drivingLicenseFront} alt="License Front" className="img-thumbnail me-2 mb-2" width="150" />
          <img src={booking.drivingLicenseBack} alt="License Back" className="img-thumbnail mb-2" width="150" />
        </div>

        <h5 className="mt-4">Booking Duration</h5>
        <p><strong>From:</strong> {new Date(booking.fromDate).toLocaleDateString()}</p>
        <p><strong>To:</strong> {new Date(booking.toDate).toLocaleDateString()}</p>
        <p><strong>Total Days:</strong> {booking.totalDays}</p>
      </div>
    </div>
  );
};

export default BookingDetails;
