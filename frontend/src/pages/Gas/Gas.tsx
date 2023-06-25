import { useState } from "react";
import "./Gas.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

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
        <AwesomeButton
          type="primary"
          className="next-button"
          onPress={handleNext}
        >
          Next
        </AwesomeButton>
      )}
    </div>
  );
};

export default Gas;
