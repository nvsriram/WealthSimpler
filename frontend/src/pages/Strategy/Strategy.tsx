import { Dispatch, SetStateAction, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./Strategy.css";

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
      updateStep((prev) => prev + 1);
    }
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
          Transfer to arbitrary account
        </button>
        <button
          className={`strategy-option ${
            selectedOption === "Medium" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Medium")}
        >
          Invest using Compound: 0xb98..704
        </button>
        <button
          className={`strategy-option ${
            selectedOption === "High" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("High")}
        >
          Staking pools
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
