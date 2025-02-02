import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CarsPage from "./pages/CarsPage";
import UsersPage from "./pages/UsersPage";
import BookingsPage from "./pages/BookingsPage";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/cars" element={<CarsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/bookings" element={<BookingsPage />} />
    </Routes>
  </Router>
);

export default App;