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

  const handleOptionSelect = (option: any) => {
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
    <div className="strategy-container">
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
        className={`submit-button ${selectedOption === "" ? "disabled" : ""}`}
        onPress={handleSubmit}
        disabled={selectedOption === ""}
      >
        Submit
      </AwesomeButton>
    </div>
  );
};

export default Strategy;
