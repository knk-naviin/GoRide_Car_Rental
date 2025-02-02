import { useState } from "react";
import { addCar } from "../api";

const AddCarForm = ({ onCarAdded }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCar(carData);
    onCarAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Add New Car</h2>
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
          onChange={(e) => setCarData({ ...carData, carType: e.target.value })}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Seats"
          value={carData.seats}
          onChange={(e) => setCarData({ ...carData, seats: e.target.value })}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <select
          value={carData.fuelType}
          onChange={(e) => setCarData({ ...carData, fuelType: e.target.value })}
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
      <button type="submit" className="btn btn-primary">
        Add Car
      </button>
    </form>
  );
};

export default AddCarForm;