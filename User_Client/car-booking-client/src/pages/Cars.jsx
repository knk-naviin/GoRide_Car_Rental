import React, { useEffect, useState } from "react";
import { fetchCars } from "../services/api";
import CarCard from "../components/CarCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Cars = ({ user }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCars = async () => {
      try {
        const data = await fetchCars();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    getCars();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="cars-container">
      <h2>Available Cars</h2>
      <div className="car-list">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Cars;