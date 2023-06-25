// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {SmartAccount} from "@biconomy/contracts/SmartAccount.sol";
import {SmartAccountFactory} from "@biconomy/contracts/SmartAccountFactory.sol";
import {IEntryPoint} from "@biconomy/contracts/aa-4337/interfaces/IEntryPoint.sol";

import {AccountInvestment} from "../src/AccountInvestment.sol";
import {console} from "forge-std/console.sol";

contract DeployAccount is Script {
    uint256 public constant MIN_USDC_BALANCE = 10 * 1e6;
    address public constant USDC_ADDRESS = 0xDB3cB4f2688daAB3BFf59C24cC42D4B6285828e9;
    address public constant CUSDC_ADDRESS = 0xF09F0369aB0a875254fB565E52226c88f10Bc839;

    function run()
        external
        returns (
            SmartAccountFactory walletFactory,
            address implementationAddr,
            address accountAddr,
            address accountInvestor,
            HelperConfig
        )
    {
        HelperConfig configHelper = new HelperConfig();
        (address entryPointAddress, address baseImplementation, uint256 deployerKey) =
            configHelper.activeNetworkConfig();

        vm.startBroadcast(deployerKey);
        SmartAccount smartAcct = new SmartAccount(IEntryPoint(entryPointAddress));

        // WsSmartAccount smartAcct = new WsSmartAccount()(entryPointAddress);
        address implementationAddress = address(smartAcct);
        console.log(implementationAddress);
        // configHelper.activeNetworkConfig.baseImplementationAddress = implementationAddress;
        console.log("Base wallet implementation Address Deployed at: %s", implementationAddress);
        SmartAccountFactory walletFactory = new SmartAccountFactory(implementationAddress);

        address deployedAccount = walletFactory.deployCounterFactualAccount(vm.envAddress("PUBLIC_KEY"), 0);
        console.log("Deployed Account Address: %s", deployedAccount);

        AccountInvestment accountInvestment =
            new AccountInvestment(deployedAccount, USDC_ADDRESS, CUSDC_ADDRESS, MIN_USDC_BALANCE);

        SmartAccount(payable(deployedAccount)).setInvestmentContractAddress(address(accountInvestment));
        console.log("Account Investment Address: %s", address(accountInvestment));
        vm.stopBroadcast();
        return (walletFactory, implementationAddress, deployedAccount, address(accountInvestment), configHelper);
    }
}
