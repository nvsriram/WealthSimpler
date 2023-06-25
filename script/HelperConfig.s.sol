// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/Console.sol";

contract HelperConfig is Script {
    NetworkConfig public activeNetworkConfig;

    struct NetworkConfig {
        address entryPointAddress;
        address baseImplementationAddress;
        uint256 deployerKey;
    }

    uint256 public DEFAULT_ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

    constructor() {
        if (block.chainid == 80001) {
            activeNetworkConfig = getMumbaiEthConfig();
        }
        console.log("Unsupported network");
    }

    function getMumbaiEthConfig() public view returns (NetworkConfig memory mumbaiNetworkConfig) {
        mumbaiNetworkConfig = NetworkConfig({
            entryPointAddress: 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789,
            baseImplementationAddress: address(0),
            deployerKey: vm.envUint("PRIVATE_KEY")
        });
    }

    // function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory anvilNetworkConfig) {
    //     // Check to see if we set an active network config
    //     if (activeNetworkConfig.entryPointAddress != address(0)) {
    //         return activeNetworkConfig;
    //     }

    //     anvilNetworkConfig = NetworkConfig({
    //         entryPointAddress: , // ETH / USD
    //         deployerKey: DEFAULT_ANVIL_PRIVATE_KEY
    //     });
    // }
}
