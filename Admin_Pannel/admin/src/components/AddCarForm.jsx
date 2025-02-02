// src/components/AddCarForm.jsx
import { useState } from "react";
import { addCar } from "../api";
import CircularProgress from "@mui/material/CircularProgress";

const AddCarForm = ({ onCarAdded = () => {} }) => {  // Default to an empty function if onCarAdded is not provided
  const [carData, setCarData] = useState({
    carName: "",
    rentPrice: "",
    kilometerPerDay: "",
    extraKmPrice: "",
    extraHourPrice: "",
    carType: "",
    seats: "",
    fuelType: "",
    transmissionType: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Create a new FormData object
    const formData = new FormData();
    formData.append("carName", carData.carName);
    formData.append("rentPrice", carData.rentPrice);
    formData.append("kilometerPerDay", carData.kilometerPerDay);
    formData.append("extraKmPrice", carData.extraKmPrice);
    formData.append("extraHourPrice", carData.extraHourPrice);
    formData.append("carType", carData.carType);
    formData.append("seats", carData.seats);
    formData.append("fuelType", carData.fuelType);
    formData.append("transmissionType", carData.transmissionType);

    carData.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await addCar(formData);
      setSuccess("Car added successfully!");
      onCarAdded();  // Call the callback (will work even if not provided)
      // Optionally reset the form
      setCarData({
        carName: "",
        rentPrice: "",
        kilometerPerDay: "",
        extraKmPrice: "",
        extraHourPrice: "",
        carType: "",
        seats: "",
        fuelType: "",
        transmissionType: "",
        images: [],
      });
    } catch (error) {
      console.error("Error adding car:", error);
      setError("Error adding car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Add New Car</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Car Name"
          value={carData.carName}
          onChange={(e) =>
            setCarData({ ...carData, carName: e.target.value })
          }
          className="form-control"
          required
        />
      </div>
      {/* Other input fields go here */}
      <div className="mb-3">
        <input
          type="number"
          placeholder="Rent Price"
          value={carData.rentPrice}
          onChange={(e) =>
            setCarData({ ...carData, rentPrice: e.target.value })
          }
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Kilometer Per Day"
          value={carData.kilometerPerDay}
          onChange={(e) =>
            setCarData({ ...carData, kilometerPerDay: e.target.value })
          }
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Extra KM Price"
          value={carData.extraKmPrice}
          onChange={(e) =>
            setCarData({ ...carData, extraKmPrice: e.target.value })
          }
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Extra Hour Price"
          value={carData.extraHourPrice}
          onChange={(e) =>
            setCarData({ ...carData, extraHourPrice: e.target.value })
          }
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Car Type"
          value={carData.carType}
          onChange={(e) =>
            setCarData({ ...carData, carType: e.target.value })
          }
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Seats"
          value={carData.seats}
          onChange={(e) =>
            setCarData({ ...carData, seats: e.target.value })
          }
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <select
          value={carData.fuelType}
          onChange={(e) =>
            setCarData({ ...carData, fuelType: e.target.value })
          }
          className="form-control"
          required
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>
      </div>
      <div className="mb-3">
        <select
          value={carData.transmissionType}
          onChange={(e) =>
            setCarData({ ...carData, transmissionType: e.target.value })
          }
          className="form-control"
          required
        >
          <option value="">Select Transmission Type</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>
      <div className="mb-3">
        <input
          type="file"
          multiple
          onChange={(e) =>
            setCarData({ ...carData, images: [...e.target.files] })
          }
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Add Car"
        )}
      </button>
      {error && (
        <p className="text-danger mt-2" style={{ marginTop: "1rem" }}>
          {error}
        </p>
      )}
      {success && (
        <p className="text-success mt-2" style={{ marginTop: "1rem" }}>
          {success}
        </p>
      )}
    </form>
  );
};

export default AddCarForm;
