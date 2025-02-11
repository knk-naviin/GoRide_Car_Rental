import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchCars = async () => {
  const response = await axios.get(`http://localhost:8000/cars`);
  return response.data;
};



export const addCar = async (carData) => {
  const response = await axios.post(`${API_URL}/cars`, carData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


export const updateCar = async (id, carData) => {
  const response = await axios.put(`${API_URL}/cars/${id}`, carData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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
  try {
    const user = JSON.parse(localStorage.getItem("user")); // Fetch user from local storage
    if (!user || !user.googleId) {
      throw new Error("❌ User is not authenticated.");
    }

    const response = await axios.get(`http://localhost:8000/bookings`, {
      headers: {
        Authorization: `Bearer ${user.googleId}`, // Send Google ID as a header
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching bookings:", error.response?.data || error.message);
    throw error;
  }
};



export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};


export const updateBookingStatus = async (bookingId, status) => {
  try {
    const user = JSON.parse(localStorage.getItem("user")); 
    if (!user || !user.googleId) {
      throw new Error("❌ User is not authenticated.");
    }

    const response = await axios.put(`http://localhost:8000/bookings/${bookingId}`, 
      { status }, 
      {
        headers: { Authorization: `Bearer ${user.googleId}` }, // Pass Google ID
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error updating booking status:", error.response?.data || error.message);
    throw error;
  }
};



export const deleteBooking = async (id) => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.googleId) {
      throw new Error("❌ User not found. Please sign in.");
    }

    console.log("🗑️ Deleting Booking ID:", id, "by Admin:", storedUser.googleId);

    const response = await axios.delete(`${API_URL}/bookings/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Google-ID": storedUser.googleId, // Send Google ID in headers
      },
    });

    console.log("✅ Booking Deleted Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting booking:", error.response?.data || error.message);
    throw error;
  }
};




export const fetchBookingById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/bookings/booking/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching booking:", error.response?.data || error.message);
    throw error;
  }
};



export const fetchBookingsByUserId = async (userId) => {
  try {
    console.log("📤 Fetching bookings for User ID:", userId);
    const response = await axios.get(`http://localhost:8000/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching user bookings:", error.response?.data || error.message);
    throw error;
  }
};