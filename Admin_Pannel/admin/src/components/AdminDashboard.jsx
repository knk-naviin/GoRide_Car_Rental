import React, { useEffect, useState } from "react";
import { fetchUsers, fetchBookings, fetchCars } from "../api"; // Import API functions
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

  // 📥 Fetch and calculate dashboard stats
  const fetchData = async () => {
    setLoading(true);
    try {
      const [users, cars, bookings] = await Promise.all([
        fetchUsers(),
        fetchCars(),
        fetchBookings(),
      ]);

      // ✅ Calculate pending & confirmed bookings
      const pendingBookings = bookings.filter((b) => b.status === "pending").length;
      const confirmedBookings = bookings.filter((b) => b.status === "confirmed");

      // ✅ Calculate total revenue (using correct totalDays calculation)
      const totalRevenue = confirmedBookings.reduce((sum, b) => {
        const totalDays =
          Math.ceil((new Date(b.toDate) - new Date(b.fromDate)) / (1000 * 60 * 60 * 24)) || 1;
        return sum + (b.carId ? b.carId.rentPrice * totalDays : 0);
      }, 0);

      setStats({
        totalUsers: users.length,
        totalCars: cars.length,
        pendingBookings,
        confirmedBookings: confirmedBookings.length,
        totalRevenue,
        bookings,
      });
    } catch (error) {
      console.error("❌ Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Filter bookings by month and year
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

  // 🔄 Initial fetch
  useEffect(() => {
    fetchData();
  }, []);

  // 🔄 Refetch data when filters change
  useEffect(() => {
    filterRevenue();
  }, [month, year, stats]);

  // 🔄 Refresh dashboard data & reset filters
  const handleRefresh = () => {
    setMonth("");
    setYear("");
    fetchData();
  };

  // 📊 Prepare data for the bookings graph
  const bookingCountsByMonth = Array(12).fill(0);
  if (stats?.bookings) {
    stats.bookings.forEach((b) => {
      const bookingMonth = new Date(b.fromDate).getMonth(); // 0-indexed
      bookingCountsByMonth[bookingMonth]++;
    });
  }

  const chartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Bookings Count",
        data: bookingCountsByMonth,
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Admin Dashboard</h1>

      {/* 🔄 Refresh Button */}
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-primary" onClick={handleRefresh}>
          Refresh Data
        </button>
      </div>

      {/* ⏳ Loading Indicator */}
      {loading ? (
        <div className="text-center my-5">
          <CircularProgress />
        </div>
      ) : stats ? (
        <div>
          {/* 📊 Statistics Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Total Cars</h5>
                  <p className="card-text">{stats.totalCars}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Pending Bookings</h5>
                  <p className="card-text">{stats.pendingBookings}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Confirmed Bookings</h5>
                  <p className="card-text">{stats.confirmedBookings}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 💰 Revenue Filter Section */}
          <div className="mb-4">
            <h3>Total Revenue: ${stats.totalRevenue.toFixed(2)}</h3>
            <div className="d-flex align-items-center">
              <input
                type="number"
                placeholder="Month (1-12)"
                className="form-control me-2"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
              <input
                type="number"
                placeholder="Year"
                className="form-control me-2"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <button className="btn btn-success" onClick={filterRevenue}>
                Filter Revenue
              </button>
            </div>
          </div>

          {/* 📊 Bookings Graph */}
          <div className="mb-4">
            <h3>Bookings Graph</h3>
            <Bar data={chartData} />
          </div>

          {/* 💵 Revenue Table */}
          <div>
            <h3>Revenue Details</h3>
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
                  filteredBookings.map((b) => {
                    const totalDays =
                      Math.ceil((new Date(b.toDate) - new Date(b.fromDate)) / (1000 * 60 * 60 * 24)) || 1;
                    return (
                      <tr key={b._id}>
                        <td>{b._id}</td>
                        <td>{b.carId?.carName || "N/A"}</td>
                        <td>{totalDays}</td>
                        <td>${b.carId?.rentPrice || 0}</td>
                        <td>${b.carId ? b.carId.rentPrice * totalDays : 0}</td>
                      </tr>
                    );
                  })
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
