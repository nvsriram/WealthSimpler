// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface cUSDC {
    function mint(uint256 mintAmount) external returns (uint256);
    function redeem(uint256 redeemTokens) external returns (uint256);
    function exchangeRateStored() external view returns (uint256);
}
