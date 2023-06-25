import { Dispatch, SetStateAction, useState } from "react";
import "./Strategy.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Strategy = ({
  updateStep,
}: {
  updateStep: Dispatch<SetStateAction<number>>;
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption !== "") {
      // Perform submission logic with selectedOption
      console.log("Selected option:", selectedOption);
    }
    updateStep((prev) => prev + 1);
  };

  return (
    <>
      <h1>Select an Investment Strategy</h1>
      <div className="options-container">
        <button
          className={`strategy-option ${
            selectedOption === "Low" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Low")}
        >
          Low Risk
        </button>
        <button
          className={`strategy-option ${
            selectedOption === "Medium" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Medium")}
        >
          Medium Risk
        </button>
        <button
          className={`strategy-option ${
            selectedOption === "High" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("High")}
        >
          High Risk
        </button>
      </div>
      <AwesomeButton
        type="primary"
        className={`form-button ${selectedOption === "" ? "disabled" : ""}`}
        onPress={handleSubmit}
        disabled={selectedOption === ""}
      >
        Continue
      </AwesomeButton>
    </>
  );
};

export default Strategy;
