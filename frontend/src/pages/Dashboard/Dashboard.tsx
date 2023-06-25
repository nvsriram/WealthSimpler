import { useEffect, useState } from "react";
import "./Dashboard.css";
import { ethers } from "ethers";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-ethers";
import {
  SMART_ACCOUNT_ADDRESS,
  SMART_ACCOUNT_ABI,
} from "../../contracts/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { getEmailKeys } from "../../middleware/store";
import { POSClient, use } from "@maticnetwork/maticjs";

use(Web3ClientPlugin);

const Dashboard = ({ org }: { org: string }) => {
  const [balance, setBalance] = useState(BigInt(123456.0 * 10e15));
  const [strategy, setStrategy] = useState("Invest Excess USDC in Compound");
  const [threshold, setThreshold] = useState(10);
  const { user } = useAuth0();

  useEffect(() => {
    // fetch data regarding balance, strategy, and threshold
    const getBalance = async () => {
      // const provider = ethers.getDefaultProvider();
      const provider = new ethers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/I4Nto0p77fY_WbT-8kLFl4xfMAi2Dwcu"
      );
      // window.ethereum != null
      //   ? new ethers.providers.Web3Provider(window.ethereum as any)
      //   : ethers.providers.getDefaultProvider();
      // const value = await provider.getBalance(WALLET_ADDRESS);
      // console.log(value);
      // setBalance(value);
      // if (!user || !user.email) {
      //   return;
      // }
      // const { privateKey } = await getEmailKeys(user.email);
      // if (!privateKey) {
      //   return;
      // }

      // const provider = ethers.getDefaultProvider();
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const posClient = new POSClient();
      await posClient.init({
        log: true,
        network: "testnet",
        version: "mumbai",
        parent: {
          provider: provider,
          defaultConfig: {
            from: SMART_ACCOUNT_ADDRESS,
          },
        },
        child: {
          provider: provider,
          defaultConfig: {
            from: SMART_ACCOUNT_ADDRESS,
          },
        },
      });

      // await posClient.init({
      //   network: "testnet",
      //   version: "mumbai",
      //   parent: {
      //     provider,
      //     defaultConfig: {
      //       from: SMART_ACCOUNT_ADDRESS,
      //     },
      //   },
      // });

      const erc20Token = posClient.erc20(
        "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"
      );
      const balance = await erc20Token.getBalance(SMART_ACCOUNT_ADDRESS);
      console.log(balance);

      // const signer = new ethers.Wallet(privateKey, provider);
      // const contract = new ethers.Contract(
      //   WALLET_ADDRESS,
      //   SMART_ACCOUNT_ABI,
      //   signer
      // );
      // const tx = await contract.isModuleEnabled();
      // const tx = await contract.addSigners(signers);
      // console.log(tx);
    };
    getBalance();
  }, []);

  return (
    <>
      <h1 className="org-title">{org}</h1>
      <hr />
      <div className="balance">
        <label>Current Balance:</label>
        <p>{Number(balance / BigInt(10e18)).toFixed(2)} MATIC</p>
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
