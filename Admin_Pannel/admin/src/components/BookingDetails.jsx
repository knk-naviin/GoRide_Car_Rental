import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBookingById, updateBookingStatus } from "../api";
import LoadingSpinner from "./LoadingSpinner";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);

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

  const handleConfirm = async () => {
    if (window.confirm("Are you sure you want to confirm this booking?")) {
      try {
        await updateBookingStatus(id, "confirmed");
        setBooking({ ...booking, status: "confirmed" });
      } catch (error) {
        console.error("Error confirming booking:", error);
      }
    }
  };

  const calculateExpiry = () => {
    const fromDate = new Date(booking.fromDate);
    const toDate = new Date(booking.toDate);
    const now = new Date();
    const timeDiff = toDate - now;
    if (timeDiff < 24 * 60 * 60 * 1000) {
      return `${Math.ceil(timeDiff / (60 * 60 * 1000))} hours`;
    }
    return `${Math.ceil(timeDiff / (24 * 60 * 60 * 1000))} days`;
  };

  const handleImageClick = (img) => {
    setFullScreenImage(img);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    setFullScreenImage(null);
  };

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
        <p><strong>Booking Expires In:</strong> <span className="text-danger">{calculateExpiry()}</span></p>
        <button onClick={handleConfirm} className="btn btn-primary mt-2">
          {booking.status === "confirmed" ? "Cancel Booking" : "Confirm Booking"}
        </button>

        <h5 className="mt-4">Car Details</h5>
        <p><strong>Car Name:</strong> {booking.carId?.carName}</p>
        <p><strong>Rent Price:</strong> ${booking.carId?.rentPrice} per day</p>
        <div className="d-flex overflow-auto">
          {booking.carId?.images.map((img, index) => (
            <img key={index} src={img} alt="Car" className="img-thumbnail me-2" width="150" onClick={() => handleImageClick(img)} />
          ))}
        </div>

        <h5 className="mt-4">Documents</h5>
        <div className="d-flex flex-wrap">
          {[booking.aadharFront, booking.aadharBack, booking.drivingLicenseFront, booking.drivingLicenseBack].map((img, index) => (
            <img key={index} src={img} alt="Document" className="img-thumbnail me-2 mb-2" width="150" onClick={() => handleImageClick(img)} />
          ))}
        </div>
      </div>
      {isFullScreen && (
        <div className="fullscreen-overlay" onClick={closeFullScreen}>
          <img src={fullScreenImage} alt="Full Screen" className="fullscreen-image" />
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
