// SPDX-license-identifier: MIT

pragma solidity ^0.8.17;

interface USDC {
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
}
