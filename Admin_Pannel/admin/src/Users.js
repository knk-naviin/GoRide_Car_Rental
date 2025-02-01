import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((result) => {
        setUsers(Array.isArray(result.data) ? result.data : []);
      })
      .catch((err) => {
        console.log(err);
        setUsers([]);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/deleteUser/${id}`)
      .then((res) => {
        console.log(res);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/createUser" className="btn btn-success mb-2">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    {user.image && user.image.data ? (
                      <img
                        src={`http://localhost:3000/uploads/${user.image.data}`}
                        alt={user.name}
                        style={{ width: "100px", height: "auto" }}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success mr-2"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
