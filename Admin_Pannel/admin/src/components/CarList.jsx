import { useState, useEffect } from "react";
import { fetchCars, deleteCar } from "../api";
import LoadingSpinner from "./LoadingSpinner";
import AddCarForm from "./AddCarForm";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchCars();
    setCars(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteCar = async (id) => {
    await deleteCar(id);
    fetchData();
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
            <div className="card">
              <img
                src={car.images[0]}
                alt={car.carName}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{car.carName}</h5>
                <p className="card-text">Rent Price: ${car.rentPrice}</p>
                <button
                  onClick={() => handleDeleteCar(car._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;