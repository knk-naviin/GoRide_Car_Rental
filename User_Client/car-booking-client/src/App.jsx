import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Header user={user} onSignIn={handleGoogleSignIn} />
      <Routes>
        {/* <Route path="/" element={<Cars user={user} />} />
        <Route path="/cars" element={<Cars user={user} />} />
        <Route path="/bookings" element={<Bookings user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;