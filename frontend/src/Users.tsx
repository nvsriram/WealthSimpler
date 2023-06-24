// Users.tsx

import React, { useState } from "react";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([
    { name: "John Doe", email: "john@example.com", phone: "1234567890" },
    { name: "Jane Smith", email: "jane@example.com", phone: "9876543210" },
    // Add more user objects as needed
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleAddUser = () => {
    if (newUser.name !== "" && newUser.email !== "" && newUser.phone !== "") {
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setNewUser({ name: "", email: "", phone: "" });
    }
  };

  const handleSubmit = () => {
    // Perform submission logic with users array
    console.log("Submitted users:", users);
  };

  return (
    <div className="container">
      <h1>Users</h1>
      <div className="scroll-view">
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <br />
      <div className="add-user-container">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <button onClick={handleAddUser}>+</button>
      </div>
      <button
        className={`submit-button ${users.length === 0 ? "disabled" : ""}`}
        onClick={handleSubmit}
        disabled={users.length === 0}
      >
        Submit
      </button>
    </div>
  );
};

export default Users;
