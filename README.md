# WealthSimpler

## ✨ Inspiration

Currently, there is too much overhead that scares people who are not familiar with blockchain technologies to participate in DeFi.

## 👀 What it does

We developed a unique institutional investment platform that allows users/employees of an organization to easily participate in crypto investments without the additional overhead.

## 💻 How we built it

## 🚀 Accomplishments that we're proud of

## 🧑‍💻 Instructions for running locally

### Smart Contract

1. Ensure `foundry` is installed
2. Run the following command to deploy the Smart Contracts on Polygon Mumbai<br/>

```
forge script script/DeployAccount.s.sol:DeployAccount --chain-id 80001 --rpc-url <POLYGON-MUMBAI-RPC-URL> --etherscan-api-key <API-KEY> --verifier-url https://api.polygonscan.com/api --private-key <PRIVATE KEY> --broadcast --verify -vvvv --legacy
```

### Frontend

1. Navigate to the `frontend` directory
2. Install all dependencies using `npm install`
3. Run `npm run dev` to launch the frontend dApp
