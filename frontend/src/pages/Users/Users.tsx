import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import { addFieldsToDatabase, getEmailKeys } from "../../middleware/store";
import { createAccount } from "../../middleware/createAccount";
import Switch from "react-switch";
import "react-awesome-button/dist/styles.css";
import "./Users.css";

type User = {
  name: string;
  email: string;
  isSigner: boolean;
};

const Users = ({
  orgName,
  updateStep,
}: {
  orgName: string;
  updateStep: Dispatch<SetStateAction<number>>;
}) => {
  const [users, setUsers] = useState<User[]>([]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    isSigner: false,
  });

  const handleAddUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUser.name !== "" && newUser.email !== "") {
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setNewUser({ name: "", email: "", isSigner: false });
    }
  };

  const handleSubmit = async () => {
    // Perform submission logic with users array
    console.log("Submitted users:", users);

    for (const user of users) {
      const { publicKey, privateKey } = await getEmailKeys(user.email);
      if (publicKey && privateKey) {
        await addFieldsToDatabase(
          user.email,
          publicKey,
          privateKey,
          orgName,
          user.isSigner
        );
      } else {
        const [pubKey, privKey] = await createAccount();
        await addFieldsToDatabase(
          user.email,
          pubKey,
          privKey,
          orgName,
          user.isSigner
        );
      }
    }

    updateStep((prev) => prev + 1);
  };

  return (
    <>
      <h1>Add Users</h1>
      <div className="scroll-view">
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <div>
                <span>{user.name}</span>
                <p className={user.isSigner ? "signer" : "member"}>
                  {user.isSigner ? "SIGNER" : "MEMBER"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form className="add-user-container" onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <label className="signer-label">
          <span>isSigner:</span>
          <Switch
            onChange={() =>
              setNewUser((prev) => ({ ...prev, isSigner: !prev.isSigner }))
            }
            checked={newUser.isSigner}
          />
        </label>
        <AwesomeButton type="whatsapp">+</AwesomeButton>
      </form>
      <AwesomeButton
        type="primary"
        className={`form-button ${users.length === 0 ? "disabled" : ""}`}
        onPress={handleSubmit}
        disabled={users.length === 0}
      >
        Continue
      </AwesomeButton>
    </>
  );
};

export default Users;
