import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CarsPage from "./pages/CarsPage";
import UpdateCar from "./components/UpdateCar";
import CarDetails from "./components/CarDetails";
import BookingsPage from "./pages/BookingsPage";
import BookingDetails from "./components/BookingDetails";
import UsersPage from "./pages/UsersPage";  // Import UsersPage
import UserDetails from "./components/UserDetails";
import AddCarForm from "./components/AddCarForm";
import AdminDashboard from "./components/AdminDashboard";

const App = () => (
  <Router>
    <Navbar />
    <div className="container mt-4">
      <Routes>
                <Route path="/" element={<AdminDashboard />} />

        <Route path="/admin" element={<AdminDashboard />} />


        {/* Car Management */}
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/add" element={<AddCarForm />} /> {/* New route for adding a car */}
        <Route path="/cars/update/:id" element={<UpdateCar />} />
        <Route path="/cars/:id" element={<CarDetails />} />

        {/* Booking Management */}
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/bookings/:id" element={<BookingDetails />} />

        {/* User Management */}
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </div>
  </Router>
);

export default App;
