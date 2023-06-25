import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { AwesomeButton } from "react-awesome-button";
import { useAuth0 } from "@auth0/auth0-react";
import { addFieldsToDatabase, getEmailKeys } from "../../middleware/store";
import "./Name.css";
import { SMART_ACCOUNT_ADDRESS } from "../../contracts/constants";
import { ethers } from "ethers";

const Name = ({
  setOrg,
  setCurrentStep,
}: {
  setOrg: Dispatch<SetStateAction<string>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  const { user } = useAuth0();
  const [name, setName] = useState("");

  const handleUpload = async () => {
    const owner = "0x3769D6543e62Cf53Cb72F1B8CD8BDb6069004f55";
    const entryPointAddress =
      process.env.ENTRY_POINT_ADDRESS ||
      "0x0576a174D229E3cFA37253523E645A78A0C91B57";

    const SmartWallet = await ethers.getContractFactory("SmartAccount");
    const baseImpl = await SmartWallet.deploy(entryPointAddress);
    await baseImpl.deployed();
    console.log("base wallet impl deployed at: ", baseImpl.address);

    const WalletFactory = await ethers.getContractFactory(
      "SmartAccountFactory"
    );
    const walletFactory = await WalletFactory.deploy(baseImpl.address);
    await walletFactory.deployed();
    console.log("smart account factory deployed at: ", walletFactory.address);

    /* const DefaultHandler = await ethers.getContractFactory(
    "DefaultCallbackHandler"
  );
  const handler = await DefaultHandler.deploy();
  await handler.deployed();
  console.log("Default callback handler deployed at: ", handler.address); */

    const expected = await walletFactory.getAddressForCounterFactualAccount(
      owner,
      0
    );
    console.log("deploying new wallet..expected address: ", expected);

    const tx = await walletFactory.deployCounterFactualAccount(owner, 0);
    const receipt = await tx.wait();
    console.log("gas used to deploy account ", receipt.gasUsed.toNumber());
  };

  const handleCreateOrg = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && user.email && name !== "") {
      // Perform create organization logic
      console.log("Creating organization with selected option:", name);
      setOrg(name);
      const { publicKey, privateKey } = await getEmailKeys(user.email);
      if (publicKey && privateKey) {
        await addFieldsToDatabase(
          user.email,
          publicKey,
          privateKey,
          name,
          true
        );
      }

      console.log("deploying wallet address");
      handleUpload();
      await new Promise((res) => setTimeout(res, 5000));
      console.log(
        "successfully deployed! wallet address:",
        SMART_ACCOUNT_ADDRESS
      );
      console.log("funding wallet with 0.1 MATIC");
      await new Promise((res) => setTimeout(res, 5000));
      setCurrentStep((prev) => prev + 1);
    }
  };
  return (
    <>
      <h1>New Organization</h1>
      <form className="org-name-form" onSubmit={handleCreateOrg}>
        <div>
          <label>Organization Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <AwesomeButton
          disabled={name == ""}
          className="form-button"
          type="primary"
        >
          Continue
        </AwesomeButton>
      </form>
    </>
  );
};

export default Name;
