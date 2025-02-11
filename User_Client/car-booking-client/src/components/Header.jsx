import React from "react";
import { Link } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn";

const Header = ({ user, onSignIn }) => {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      {user ? (
        <div className="user-info">
          <span>Welcome, {user.name}</span>
        </div>
      ) : (
        <GoogleSignIn onSuccess={onSignIn} />
      )}
    </header>
  );
};

export default Header;