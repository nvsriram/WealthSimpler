import { Dispatch, SetStateAction, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./Gas.css";

const Gas = ({
  updateStep,
}: {
  updateStep: Dispatch<SetStateAction<number>>;
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption !== "") {
      // Perform next logic based on selectedOption
      console.log("Selected option:", selectedOption);
    }
    updateStep((prev) => prev + 1);
  };

  return (
    <>
      <h1>Gas</h1>
      <div className="options-container">
        <button
          className={`strategy-option ${
            selectedOption === "Setup Payments" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Setup Payments")}
        >
          Auto
        </button>
        <button
          className={`strategy-option ${
            selectedOption === "Strategy" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Strategy")}
        >
          Self
        </button>
      </div>
      <AwesomeButton
        className="form-button"
        onPress={handleNext}
        disabled={selectedOption === ""}
        type="primary"
      >
        Finish
      </AwesomeButton>
    </>
  );
};

export default Gas;
