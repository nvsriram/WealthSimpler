import { useEffect, useState } from "react";
import "./Dashboard.css";
import { ethers } from "ethers";
import {
  SMART_ACCOUNT_ADDRESS,
  SMART_ACCOUNT_ABI,
} from "../../contracts/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { getEmailKeys } from "../../middleware/store";

const Dashboard = ({ org }: { org: string }) => {
  const [balance, setBalance] = useState(BigInt(123456.0 * 10e15));
  const [strategy, setStrategy] = useState("");
  const [threshold, setThreshold] = useState(0);
  const { user } = useAuth0();

  useEffect(() => {
    // fetch data regarding balance, strategy, and threshold
    const getBalance = async () => {
      const provider = new ethers.JsonRpcProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/04tse8PDxpdM3_iZOSA-YH-WMuljjoGe"
      );
      const value = await provider.getBalance(SMART_ACCOUNT_ADDRESS);
      setBalance(value);
      setThreshold(10);
      setStrategy("Invest Excess USDC in Compound");

      if (!user || !user.email) {
        return;
      }
      const { privateKey } = await getEmailKeys(user.email);
      if (!privateKey) {
        return;
      }

      const signer = new ethers.Wallet(privateKey, provider);
      const contract = new ethers.Contract(
        SMART_ACCOUNT_ADDRESS,
        SMART_ACCOUNT_ABI,
        signer
      );
      const tx = await contract.investExcessUSD();
      console.log(tx);
    };
    getBalance();
  }, [user]);

  return (
    <>
      <h1 className="org-title">{org}</h1>
      <hr />
      <div className="balance">
        <label>Current Balance:</label>
        <p>{(Number(balance) / 1e18).toFixed(2)} MATIC</p>
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
        <p>{threshold.toFixed(2)} USDC</p>
      </div>
    </>
  );
};

export default Dashboard;
