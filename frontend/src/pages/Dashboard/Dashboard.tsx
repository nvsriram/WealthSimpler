import { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = ({ org }: { org: string }) => {
  const [balance, setBalance] = useState(123456.0);
  const [strategy, setStrategy] = useState("Invest in ETH");
  const [threshold, setThreshold] = useState(500);

  useEffect(() => {
    // fetch data regarding balance, strategy, and threshold
  }, []);

  return (
    <>
      <h1 className="org-title">{org}</h1>
      <hr />
      <div className="balance">
        <label>Current Balance:</label>
        <p>${balance.toFixed(2)}</p>
      </div>
      <div className="button-container">
        <button className="send-button">Send</button>
        <button className="invest-button">Invest</button>
      </div>
      <br />
      <div className="strategy">
        <label>Automatic Strategy:</label>
        <p>{strategy}</p>
      </div>
      <div className="strategy">
        <label>Excess Amount Threshold:</label>
        <p>{threshold}</p>
      </div>
    </>
  );
};

export default Dashboard;
