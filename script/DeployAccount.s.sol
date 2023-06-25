// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {SmartAccount} from "@biconomy/contracts/SmartAccount.sol";
import {SmartAccountFactory} from "@biconomy/contracts/SmartAccountFactory.sol";
import {IEntryPoint} from "@biconomy/contracts/aa-4337/interfaces/IEntryPoint.sol";
import {console} from "forge-std/console.sol";

contract DeployAccount is Script {
    function run() external returns (SmartAccountFactory, address, address, HelperConfig) {
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

        vm.stopBroadcast();
        return (walletFactory, implementationAddress, deployedAccount, configHelper);
    }
}
