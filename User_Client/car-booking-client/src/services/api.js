import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchCars = async () => {
  const response = await axios.get(`${API_URL}/cars`);
  return response.data;
};

export const fetchBookingsByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/bookings/user/${userId}`);
  return response.data;
};

export const googleSignIn = async (token) => {
  const response = await axios.post(`${API_URL}/auth/google`, { token });
  return response.data;
};