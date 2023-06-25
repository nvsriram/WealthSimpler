import { Dispatch, SetStateAction, useState } from "react";
import "./Users.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Users = ({
  updateStep,
}: {
  updateStep: Dispatch<SetStateAction<number>>;
}) => {
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
      setNewUser({ name: "", email: "", phone: "" }); // Reset newUser state
    }
  };

  const handleSubmit = () => {
    // Perform submission logic with users array
    console.log("Submitted users:", users);
    updateStep((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h1>Add Users</h1>
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
        <AwesomeButton type="danger" onPress={handleAddUser}>
          +
        </AwesomeButton>
      </div>
      <AwesomeButton
        type="primary"
        className={`submit-button ${users.length === 0 ? "disabled" : ""}`}
        onPress={handleSubmit}
        disabled={users.length === 0}
      >
        Submit
      </AwesomeButton>
    </div>
  );
};

export default Users;
