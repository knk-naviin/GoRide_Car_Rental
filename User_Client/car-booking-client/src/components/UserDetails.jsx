import React from "react";

const UserDetails = ({ user }) => {
  return (
    <div className="user-details">
      <h2>Profile Details</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default UserDetails;