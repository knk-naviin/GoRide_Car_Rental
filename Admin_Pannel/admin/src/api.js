import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchCars = async () => {
  const response = await axios.get(`${API_URL}/cars`);
  return response.data;
};

export const addCar = async (carData) => {
  const response = await axios.post(`${API_URL}/cars`, carData);
  return response.data;
};

export const updateCar = async (id, carData) => {
  const response = await axios.put(`${API_URL}/cars/${id}`, carData);
  return response.data;
};

export const deleteCar = async (id) => {
  const response = await axios.delete(`${API_URL}/cars/${id}`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const fetchBookings = async () => {
  const response = await axios.get(`${API_URL}/bookings`);
  return response.data;
};