import { useState, useEffect } from "react";
import { fetchCars, deleteCar, updateCar } from "../api";
import LoadingSpinner from "./LoadingSpinner";
import AddCarForm from "./AddCarForm";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Enable swipe

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchCars();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteCar = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar(id);
        fetchData();
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  const toggleAvailability = async (car) => {
    try {
      const updatedCar = { ...car, isAvailable: !car.isAvailable };
      await updateCar(car._id, updatedCar);
      setCars((prevCars) => prevCars.map((c) => (c._id === car._id ? { ...c, isAvailable: updatedCar.isAvailable } : c)));
    } catch (error) {
      console.error("Error updating car availability:", error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <h1 className="my-4">Cars</h1>
      <button onClick={fetchData} className="btn btn-primary mb-4">
        Refresh List
      </button>
      <AddCarForm onCarAdded={fetchData} />
      <div className="row">
        {cars.map((car) => (
          <div key={car._id} className="col-md-4 mb-4">
            <Link to={`/cars/${car._id}`} className="text-decoration-none text-dark">
              <div className="card">
                <div id={`carousel-${car._id}`} className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {car.images && car.images.map((img, index) => (
                      <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <img src={img} className="d-block w-100" alt={car.carName} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{car.carName}</h5>
                  <p className="card-text">Rent Price: ${car.rentPrice}</p>
                </div>
              </div>
            </Link>
            <div className="form-check form-switch mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={car.isAvailable}
                onChange={() => toggleAvailability(car)}
              />
              <label className="form-check-label">
                {car.isAvailable ? "Available" : "Not Available"}
              </label>
            </div>
            <div className="mt-3">
              <Link to={`/cars/update/${car._id}`} className="btn btn-warning me-2">Edit</Link>
              <button onClick={() => handleDeleteCar(car._id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
