import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./Users.css";

type User = {
  name: string;
  email: string;
  phone: string;
};

const Users = ({
  updateStep,
}: {
  updateStep: Dispatch<SetStateAction<number>>;
}) => {
  const [users, setUsers] = useState<User[]>([]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleAddUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUser.name !== "" && newUser.email !== "" && newUser.phone !== "") {
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setNewUser({ name: "", email: "", phone: "" });
    }
  };

  const handleSubmit = () => {
    // Perform submission logic with users array
    console.log("Submitted users:", users);
    updateStep((prev) => prev + 1);
  };

  return (
    <>
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
      <form className="add-user-container" onSubmit={handleAddUser}>
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
        <AwesomeButton type="danger">+</AwesomeButton>
      </form>
      <AwesomeButton
        type="primary"
        className={`submit-button ${users.length === 0 ? "disabled" : ""}`}
        onPress={handleSubmit}
        disabled={users.length === 0}
      >
        Continue
      </AwesomeButton>
    </>
  );
};

export default Users;
