import { Dispatch, SetStateAction } from "react";
import { Stepper, Step } from "react-form-stepper";
import Name from "../Name/Name";
import Strategy from "../Strategy/Strategy";
import Gas from "../Gas/Gas";
import Users from "../Users/Users";

const CreateOrg = ({
  currentStep,
  org,
  setCurrentStep,
  setOrg,
}: {
  currentStep: number;
  org: string;
  setOrg: Dispatch<SetStateAction<string>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <Stepper
        activeStep={currentStep}
        connectorStateColors={true}
        stepClassName="steps"
        styleConfig={{
          activeBgColor: "#047857",
          activeTextColor: "#fff",
          completedBgColor: "#10b981",
          completedTextColor: "#fff",
          inactiveBgColor: "#8c8c8c",
          inactiveTextColor: "#fff",
          size: "2rem",
          circleFontSize: "1.125rem",
          labelFontSize: "0.1rem",
          borderRadius: "30%",
          fontWeight: 500,
        }}
        connectorStyleConfig={{
          activeColor: "#047857",
          completedColor: "#10b981",
          disabledColor: "#8c8c8c",
          size: 1,
          stepSize: "1.5rem",
          style: "solid",
        }}
      >
        <Step />
        <Step />
        <Step />
        <Step />
      </Stepper>

      {currentStep === 0 && (
        <Name setOrg={setOrg} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 1 && <Users orgName={org} updateStep={setCurrentStep} />}
      {currentStep === 2 && <Strategy updateStep={setCurrentStep} />}
      {currentStep === 3 && <Gas updateStep={setCurrentStep} />}
    </>
  );
};

export default CreateOrg;
