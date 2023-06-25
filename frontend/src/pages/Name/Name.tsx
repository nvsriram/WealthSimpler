import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { AwesomeButton } from "react-awesome-button";
import { useAuth0 } from "@auth0/auth0-react";
import { addFieldsToDatabase, getEmailKeys } from "../../middleware/store";
import "./Name.css";

const Name = ({
  setOrg,
  setCurrentStep,
}: {
  setOrg: Dispatch<SetStateAction<string>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  const { user } = useAuth0();
  const [name, setName] = useState("");

  const handleCreateOrg = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && user.email && name !== "") {
      // Perform create organization logic
      console.log("Creating organization with selected option:", name);
      setOrg(name);
      const { publicKey, privateKey } = await getEmailKeys(user.email);
      if (publicKey && privateKey) {
        await addFieldsToDatabase(
          user.email,
          publicKey,
          privateKey,
          name,
          true
        );
      }

      setCurrentStep((prev) => prev + 1);
    }
  };
  return (
    <>
      <h1>New Organization</h1>
      <form className="org-name-form" onSubmit={handleCreateOrg}>
        <div>
          <label>Organization Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <AwesomeButton
          disabled={name == ""}
          className="form-button"
          type="primary"
        >
          Continue
        </AwesomeButton>
      </form>
    </>
  );
};

export default Name;
