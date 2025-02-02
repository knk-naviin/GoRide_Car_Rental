import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchCars, deleteCar } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      const cars = await fetchCars();
      const selectedCar = cars.find((c) => c._id === id);
      if (selectedCar) setCar(selectedCar);
      setLoading(false);
    };
    fetchCarDetails();
  }, [id]);

  const handleDeleteCar = async () => {
    await deleteCar(id);
    navigate("/cars");
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

  if (!car) return <p className="text-center mt-5">Car not found</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{car.carName}</h2>

      {/* Bootstrap Carousel */}
      <div id="carCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {car.images.map((img, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={img} className="d-block w-100" alt={car.carName} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Car Details */}
      <div className="mt-4">
        <p><strong>Rent Price:</strong> ${car.rentPrice}</p>
        <p><strong>Kilometer Per Day:</strong> {car.kilometerPerDay} km</p>
        <p><strong>Extra KM Price:</strong> ${car.extraKmPrice}</p>
        <p><strong>Extra Hour Price:</strong> ${car.extraHourPrice}</p>
        <p><strong>Car Type:</strong> {car.carType}</p>
        <p><strong>Seats:</strong> {car.seats}</p>
        <p><strong>Fuel Type:</strong> {car.fuelType}</p>
        <p><strong>Transmission:</strong> {car.transmissionType}</p>
        <p><strong>Availability:</strong> {car.isAvailable ? "Available" : "Not Available"}</p>
      </div>

      {/* Edit & Delete Buttons */}
      <div className="mt-4">
        <Link to={`/cars/update/${car._id}`} className="btn btn-warning me-2">Edit</Link>
        <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal">Delete</button>
      </div>

      {/* Bootstrap Delete Confirmation Modal */}
      <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" aria-labelledby="confirmDeleteLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmDeleteLabel">Confirm Delete</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this car?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteCar} data-bs-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
