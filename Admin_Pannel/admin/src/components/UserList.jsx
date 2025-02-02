import { useState, useEffect } from "react";
import { fetchUsers } from "../api";
import LoadingSpinner from "./LoadingSpinner";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <h1 className="my-4">Users</h1>
      <button onClick={fetchData} className="btn btn-primary mb-4">
        Refresh List
      </button>
      <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">Email: {user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;