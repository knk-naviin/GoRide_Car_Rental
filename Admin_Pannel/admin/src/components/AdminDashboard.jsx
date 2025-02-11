import React, { useEffect, useState } from "react";
import { fetchUsers, fetchBookings, fetchCars } from "../api"; // Import your API functions
import CircularProgress from "@mui/material/CircularProgress";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);

  // Fetch and calculate stats
  const fetchData = async () => {
    setLoading(true);
    try {
      const [users, cars, bookings] = await Promise.all([
        fetchUsers(),
        fetchCars(),
        fetchBookings(),
      ]);

      const pendingBookings = bookings.filter((b) => b.status === "pending").length;
      const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
      const totalRevenue = confirmedBookings.reduce(
        (sum, b) => sum + (b.carId ? b.carId.rentPrice * b.totalDays : 0),
        0
      );

      setStats({
        totalUsers: users.length,
        totalCars: cars.length,
        pendingBookings,
        confirmedBookings: confirmedBookings.length,
        totalRevenue,
        bookings,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings by month and year
  const filterRevenue = () => {
    if (!stats) return;

    const filtered = stats.bookings.filter((b) => {
      const bookingDate = new Date(b.fromDate);
      return (
        (!month || bookingDate.getMonth() + 1 === parseInt(month)) &&
        (!year || bookingDate.getFullYear() === parseInt(year))
      );
    });

    setFilteredBookings(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setMonth("");
    setYear("");
    fetchData();
  };

  const bookingCountsByMonth = Array(12).fill(0);
  if (stats?.bookings) {
    stats.bookings.forEach((b) => {
      const bookingMonth = new Date(b.fromDate).getMonth();
      bookingCountsByMonth[bookingMonth]++;
    });
  }

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{ label: "Bookings Count", data: bookingCountsByMonth, backgroundColor: "rgba(75,192,192,0.6)" }],
  };

  return (
    <div className="container my-4">
      <h1 className="mb-3 text-center">Admin Dashboard</h1>

      {/* Refresh Button */}
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-primary w-100" onClick={handleRefresh}>
          Refresh Data
        </button>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center my-5">
          <CircularProgress />
        </div>
      ) : stats ? (
        <div>
          {/* Statistics Cards */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            <div className="col">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text fs-4">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Total Cars</h5>
                  <p className="card-text fs-4">{stats.totalCars}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Pending Bookings</h5>
                  <p className="card-text fs-4">{stats.pendingBookings}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Confirmed Bookings</h5>
                  <p className="card-text fs-4">{stats.confirmedBookings}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Section */}
          <div className="my-4">
            <h3 className="text-center">Total Revenue: ${stats.totalRevenue}</h3>
            <div className="d-flex flex-column flex-md-row gap-2">
              <input type="number" placeholder="Month (1-12)" className="form-control" value={month} onChange={(e) => setMonth(e.target.value)} />
              <input type="number" placeholder="Year" className="form-control" value={year} onChange={(e) => setYear(e.target.value)} />
              <button className="btn btn-success" onClick={filterRevenue}>Filter</button>
            </div>
          </div>

          {/* Bookings Graph */}
          <div className="my-4">
            <h3 className="text-center">Bookings Overview</h3>
            <Bar data={chartData} />
          </div>

          {/* Revenue Table */}
          <div className="table-responsive">
            <h3 className="text-center">Revenue Details</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Car Name</th>
                  <th>Total Days</th>
                  <th>Rent Price</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((b) => (
                    <tr key={b._id}>
                      <td>{b._id}</td>
                      <td>{b.carId?.carName || "N/A"}</td>
                      <td>{b.totalDays}</td>
                      <td>${b.carId?.rentPrice || 0}</td>
                      <td>${b.carId ? b.carId.rentPrice * b.totalDays : 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No bookings found for the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center">No data available.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
