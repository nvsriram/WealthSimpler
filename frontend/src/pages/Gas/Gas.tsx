import { useState } from "react";
import "./Gas.css";

const Gas = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption !== "") {
      // Perform next logic based on selectedOption
      console.log("Selected option:", selectedOption);
    }
  };

  return (
    <div className="gas-container">
      <h1>Gas</h1>
      <div className="options-container">
        <div
          className={`option-square ${
            selectedOption === "Setup Payments" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Setup Payments")}
        >
          <span>Auto</span>
        </div>
        <div
          className={`option-square ${
            selectedOption === "Strategy" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Strategy")}
        >
          <span>Strategy</span>
        </div>
      </div>
      {selectedOption !== "" && (
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Gas;
