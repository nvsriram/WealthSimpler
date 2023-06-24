import { useState } from "react";
import "./CreateOrg.css";

const CreateOrg = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleCreateOrg = () => {
    if (selectedOption !== "") {
      // Perform create organization logic
      console.log(
        "Creating organization with selected option:",
        selectedOption
      );
    }
  };

  return (
    <>
      <h1>New Organization</h1>
      <input type="text" />
      {/* <div className="scroll-view">
        <div
          className={`option ${
            selectedOption === "Option 1" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Option 1")}
        >
          Option 1
        </div>
        <div
          className={`option ${
            selectedOption === "Option 2" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Option 2")}
        >
          Option 2
        </div>
        <div
          className={`option ${
            selectedOption === "Option 3" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Option 3")}
        >
          Option 3
        </div>
      </div> */}
      <button
        className={`create-org-button ${
          selectedOption === "" ? "disabled" : ""
        }`}
        onClick={handleCreateOrg}
        disabled={selectedOption === ""}
      >
        Create
      </button>
    </>
  );
};

export default CreateOrg;
