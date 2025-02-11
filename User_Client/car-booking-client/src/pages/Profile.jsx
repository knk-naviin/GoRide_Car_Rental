import React from "react";
import UserDetails from "../components/UserDetails";
import BookingHistory from "../components/BookingHistory";
import DocumentsSection from "../components/DocumentsSection";
import ReferAndEarn from "../components/ReferAndEarn";
import GoogleSignIn from "../components/GoogleSignIn";

const Profile = ({ user }) => {
  if (!user) {
    return (
      <div className="profile-container">
        <h2>Please sign in to view your profile.</h2>
        <GoogleSignIn />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <UserDetails user={user} />
      <BookingHistory userId={user.googleId} />
      <DocumentsSection userId={user.googleId} />
      <ReferAndEarn />
    </div>
  );
};

export default Profile;