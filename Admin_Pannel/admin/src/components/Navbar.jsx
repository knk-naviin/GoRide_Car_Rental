import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand">
        Admin Dashboard
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/cars" className="nav-link">
              Cars
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/bookings" className="nav-link">
              Bookings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;