import React, { useState } from "react";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({ ...user });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal">
      <form className="modal-content" onSubmit={handleSubmit}>
        <h3>Edit User</h3>
        <input name="first_name" value={form.first_name} onChange={handleChange} />
        <input name="last_name" value={form.last_name} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <button type="submit" style={{backgroundColor:"#4070f4",color:"white",border:"0",borderRadius:"20px"}}>Save</button>
        <button onClick={onClose} style={{backgroundColor:"#4070f4",color:"white",border:"0",borderRadius:"20px"}}>Cancel</button>
      </form>
    </div>
  );
};

export default EditUserModal;
