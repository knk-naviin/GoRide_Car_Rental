import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CarsPage from "./pages/CarsPage";
import UpdateCar from "./components/UpdateCar";
import CarDetails from "./components/CarDetails";
import BookingsPage from "./pages/BookingsPage";
import BookingDetails from "./components/BookingDetails";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/cars" element={<CarsPage />} />
      <Route path="/cars/update/:id" element={<UpdateCar />} />
      <Route path="/cars/:id" element={<CarDetails />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/bookings/:id" element={<BookingDetails />} />
    </Routes>
  </Router>
);

export default App;
