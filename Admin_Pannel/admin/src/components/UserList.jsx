import { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../api";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      setDeleting(id);
      await deleteUser(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <h1 className="my-4">Users</h1>
      <button onClick={fetchData} className="btn btn-primary mb-4">
        Refresh List
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 className="mb-1">{user.name}</h5>
              <p className="mb-0">Email: {user.email}</p>
            </div>
            <div>
              <Link
                to={`/users/${user._id}`}
                className="btn btn-info btn-sm me-2"
              >
                View Details
              </Link>
              <button
                onClick={() => handleDelete(user._id)}
                className="btn btn-danger btn-sm"
                disabled={deleting === user._id}
              >
                {deleting === user._id ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
