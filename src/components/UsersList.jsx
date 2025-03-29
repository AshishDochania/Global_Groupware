import React, { useEffect, useState } from "react";
import API from "../services/api";
import EditUserModal from "./EditUserModal";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async (page) => {
    const response = await API.get(`/users?page=${page}`);
    setUsers(response.data.data);
  };

  const handleDelete = async (id) => {
    await API.delete(`/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleUpdate = async (updatedUser) => {
    await API.put(`/users/${updatedUser.id}`, updatedUser);
    setUsers(
      users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setEditingUser(null);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <div className="users-container">
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <h2>User List</h2>
      <button onClick={() => { logout(); navigate("/"); }} style={{height:"35px",marginTop:"16px",borderRadius:"5px",backgroundColor:"#fd5c63",color:"white"}}>Logout</button>
      </div>
      <div className="user-cards">
        {users.map((user) => (
          <div key={user.id}  class="profile-card">
          <div class="image">
            <img src={user.avatar} alt={user.first_name}class="profile-img" />
          </div>
          <div class="text-data">
            <span class="name">{user.first_name} {user.last_name}</span>
            <span class="email">{user.email}</span>
          </div>
          <div class="buttons">
            <button class="button" onClick={() => setEditingUser(user)}>Edit</button>
            <button class="button" onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
          
        </div>
        ))}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={users.length===0}>Next</button>
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default UsersList;
