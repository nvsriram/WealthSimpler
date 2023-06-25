// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {WsSmartAccount} from "../src/WsSmartAccount.sol";
import {SmartAccountFactory} from "@biconomy/contracts/SmartAccountFactory.sol";
import {console} from "forge-std/console.sol";

contract DeployAccount is Script {
    function run() external returns (SmartAccountFactory, WsSmartAccount, address, HelperConfig) {
        HelperConfig configHelper = new HelperConfig();
        (address entryPointAddress, address baseImplementation, uint256 deployerKey) =
            configHelper.activeNetworkConfig();

        vm.startBroadcast(deployerKey);
        SmartAccount smartAcct = new SmartAccount(entryPointAddress);
        address implementationAddress = address(smartAcct);
        log(implementationAddress);
        configHelper.setActiveNetworkConfig.baseImplementationAddress = implementationAddress;
        console.log("Base wallet implementation Address Deployed at: %s", implementationAddress);
        SmartAccountFactory walletFactory = new SmartAccountFactory(implementationAddress);

        address deployedAccount = walletFactory.deployCounterFactualAccount(vm.envAddress("PUBLIC_KEY"), 0);
        console.log("Deployed Account Address: %s", deployedAccount);
        console.log("Current Balance: %s", web3.eth.getBalance(deployedAccount));

        console.log("Calling Contract: %s", contractAddress);
        console.log("Calling Contract: %s", contractAddress);
        vm.stopBroadcast();
        return (walletFactory, implementationAddress, deployedAccount, configHelper);
    }
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {SmartAccount} from "../src/SmartAccount.sol";
import {SmartAccountFactory} from "../src/SmartAccountFactory.sol";
import {IEntryPoint} from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";

import {console} from "forge-std/console.sol";

contract DeployAccount is Script {
    function run() external returns (SimpleAccountFactory, SimpleAccount, address, HelperConfig) {
        HelperConfig configHelper = new HelperConfig();
        (address entryPointAddress, address baseImplementation, uint256 deployerKey) =
            configHelper.activeNetworkConfig();

        vm.startBroadcast(deployerKey);
        SmartAccount smartAcct = new SmartAccount(entryPointAddress);
        address implementationAddress = address(smartAcct);
        console.log("Base wallet implementation Address Deployed at: %s", implementationAddress);
        SmartAccountFactory walletFactory = new SmartAccountFactory(implementationAddress);

        address deployedAccount = walletFactory.deployCounterFactualAccount(vm.envAddress("PUBLIC_KEY"), 0);
        console.log("Deployed Account Address: %s", deployedAccount);
        console.log("Current Balance: %s", web3.eth.getBalance(deployedAccount));

        console.log("Calling Contract: %s", contractAddress);
        console.log("Calling Contract: %s", contractAddress);
        vm.stopBroadcast();
        return (walletFactory, implementationAddress, deployedAccount, configHelper);
    }
}
