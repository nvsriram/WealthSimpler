// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {SimpleAccountFactory} from "../src/SimpleAccountFactory.sol";
import {IEntryPoint} from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {SimpleAccount} from "../src/SimpleAccount.sol";
import {console} from "forge-std/console.sol";

contract DeployAccount is Script {
    function run() external returns (SimpleAccountFactory, SimpleAccount, HelperConfig) {
        HelperConfig configHelper = new HelperConfig();
        (address entryPointAddress, uint256 deployerKey) = configHelper.activeNetworkConfig();

        vm.startBroadcast(deployerKey);
        SimpleAccountFactory acctFactory = new SimpleAccountFactory(IEntryPoint(entryPointAddress));
        SimpleAccount acct = acctFactory.createAccount(vm.envAddress("PUBLIC_KEY"), 0);
        vm.stopBroadcast();
        return (acctFactory, acct, configHelper);
    }
}
