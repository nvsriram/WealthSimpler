// Strategy.tsx

import React, { useState } from "react";
import "./Strategy.css";

const Strategy = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option: string) => {
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
      <button
        className={`submit-button ${selectedOption === "" ? "disabled" : ""}`}
        onClick={handleSubmit}
        disabled={selectedOption === ""}
      >
        Submit
      </button>
    </div>
  );
};

export default Strategy;
