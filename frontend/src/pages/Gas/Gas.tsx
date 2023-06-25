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
  const [showSponsorHint, setShowSponsorHint] = useState(false);
  const [showSelfHint, setShowSelfHint] = useState(false);

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

  const handleMouseEnterSponsor = () => {
    setShowSponsorHint(true);
  };

  const handleMouseLeaveSponsor = () => {
    setShowSponsorHint(false);
  };

  const handleMouseEnterSelf = () => {
    setShowSelfHint(true);
  };

  const handleMouseLeaveSelf = () => {
    setShowSelfHint(false);
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
          onMouseEnter={handleMouseEnterSponsor}
          onMouseLeave={handleMouseLeaveSponsor}
        >
          Sponsored
        </button>
        {showSponsorHint && (
          <span className="option-hint">Use a paymaster</span>
        )}
        <button
          className={`strategy-option ${
            selectedOption === "Strategy" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Strategy")}
          onMouseEnter={handleMouseEnterSelf}
          onMouseLeave={handleMouseLeaveSelf}
        >
          Self
        </button>
        {showSelfHint && (
          <span className="option-hint">Organization manually handles</span>
        )}
      </div>
      <AwesomeButton
        type="primary"
        className="form-button"
        onPress={handleNext}
        disabled={selectedOption === ""}
      >
        Next
      </AwesomeButton>
    </>
  );
};

export default Gas;
