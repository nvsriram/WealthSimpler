import React, { useState } from "react";
import "./Strategy.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Strategy = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption !== "") {
      // Perform submission logic with selectedOption
      console.log("Selected option:", selectedOption);
    }
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
