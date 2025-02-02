import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCars, updateCar } from "../api";
import LoadingSpinner from "./LoadingSpinner"; // Import spinner component
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Enable carousel swipe

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      const cars = await fetchCars();
      const car = cars.find((car) => car._id === id);
      if (car) setCarData(car);
      setLoading(false);
    };
    fetchCarDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    // Append all fields
    Object.keys(carData).forEach((key) => {
      if (key !== "images") {
        formData.append(key, carData[key]);
      }
    });

    // Append existing images
    carData.images.forEach((image) => {
      formData.append("existingImages", image);
    });

    // Append new images
    newImages.forEach((image) => {
      formData.append("images", image);
    });

    await updateCar(id, formData);
    setLoading(false);
    navigate("/cars");
  };

  // Remove image from the existing list
  const handleRemoveImage = (index) => {
    const updatedImages = carData.images.filter((_, i) => i !== index);
    setCarData({ ...carData, images: updatedImages });
  };

  if (loading) return <LoadingSpinner />; // Show loader

  return (
    <div className="container">
      <h2>Update Car</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Car Name"
            value={carData.carName}
            onChange={(e) => setCarData({ ...carData, carName: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            placeholder="Rent Price"
            value={carData.rentPrice}
            onChange={(e) => setCarData({ ...carData, rentPrice: e.target.value })}
            className="form-control"
            required
          />
        </div>
         <div className="mb-3">
          <input
            type="number"
            placeholder="Km/Day"
            value={carData.kilometerPerDay}
            onChange={(e) => setCarData({ ...carData, kilometerPerDay: e.target.value })}
            className="form-control"
            required
          />
        </div>
        
        <div className="mb-3">
          <label>Current Images</label>
          <div className="d-flex">
            {carData.images.map((img, index) => (
              <div key={index} className="position-relative">
                <img src={img} alt="Car" className="img-thumbnail me-2" width="100" />
                <button
                  type="button"
                  className="btn btn-danger btn-sm position-absolute top-0 end-0"
                  onClick={() => handleRemoveImage(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label>Upload New Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setNewImages([...e.target.files])}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Car</button>
      </form>
    </div>
  );
};

export default UpdateCar;
