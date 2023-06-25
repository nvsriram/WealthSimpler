import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { AwesomeButton } from "react-awesome-button";

const Name = ({
  setOrg,
  setCurrentStep,
}: {
  setOrg: Dispatch<SetStateAction<string>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  const [name, setName] = useState("");

  const handleCreateOrg = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name !== "") {
      // Perform create organization logic
      console.log("Creating organization with selected option:", name);
      setOrg(name);
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
        <AwesomeButton disabled={name == ""} className="login-button">
          Continue
        </AwesomeButton>
      </form>
    </>
  );
};

export default Name;
