import React from "react";
import HeroSection from "../components/HeroSection";
import OffersSection from "../components/OffersSection";

const Home = ({ user }) => {
  return (
    <div className="home">
      <HeroSection />
      <OffersSection user={user} />
    </div>
  );
};

export default Home;