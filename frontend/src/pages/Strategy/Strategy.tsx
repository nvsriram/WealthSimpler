import { Dispatch, SetStateAction, useState } from "react";
import "./Strategy.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { init, useQuery } from "@airstack/airstack-react";

init("f0d8871cca3c4712977094057e3b1909");

const query = `query GetAllPolygonTokenTransfersToday {
  polygonTransfers: TokenTransfers(
    input: {
      filter: {
        blockTimestamp: {
          _gte: "2023-06-24T00:00:00.000Z",
          _lt: "2023-06-25T00:00:00.000Z"
        }
      },
      blockchain: polygon,
      limit: 10
    }
  ) {
    TokenTransfer {
      amount
      blockNumber
      blockTimestamp
      from {
        addresses
      }
      to {
        addresses
      }
      tokenAddress
      transactionHash
      tokenId
      tokenType
      blockchain
    }
  }
}`;

const MyData = () => {
  const { data, loading, error } = useQuery(query);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const transfers = data?.polygonTransfers?.TokenTransfer || [];

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transfers.map((transfer, index) => (
          <tr key={index}>
            <td>{transfer.from.addresses[0]}</td>
            <td>{transfer.to.addresses[0]}</td>
            <td>{transfer.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

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
      <br />
      <br />
      <br />
      <h1>View Latest Polygon Activity</h1>
      <MyData />
    </>
  );
};

export default Strategy;
