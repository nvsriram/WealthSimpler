// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {USDC} from "./interfaces/USDC.sol";
import {cUSDC} from "./interfaces/cUSDC.sol";

/*
*   @title AccountInvestment
*   @notice This contract is used to excess USDC in other protocols
*   Balances in excess of a threshold od the specified account are invested in cUSDC
*  The cUSDC can be redeemed at any time
*/
contract AccountInvestment {
    error TransferToInvestFailed();
    error MintingCTokenFailed();
    error OnlyWalletCanCallThisFunction();
    error RedeemInvestmentFailed();
    error TransferToWalletFailed();

    address private immutable accountWallet;

    USDC public usdc;
    cUSDC public cUsdc;

    event Invested(uint256 amount, address indexed recipient, address indexed Token);
    event Redeemed(uint256 amount, address indexed recipient, address indexed Token);

    modifier onlyWallet() {
        if (msg.sender != accountWallet) {
            revert OnlyWalletCanCallThisFunction();
        }
        _;
    }

    constructor(address _accountWallet, address _usdcAddress, address _cUsdcAddress, uint256 _threshold) {
        accountWallet = _accountWallet;
        usdc = USDC(_usdcAddress);
        cUsdc = cUSDC(_cUsdcAddress);
    }

    /*
    *   @notice Invests excess USDC in cUSDC callable by the wallet
    */
    function invest(uint256 amountToInvest) external onlyWallet {
        if (!usdc.transfer(address(cUsdc), amountToInvest)) {
            revert TransferToInvestFailed();
        }

        uint256 cTokenAmount = cUsdc.mint(amountToInvest);
        if (cTokenAmount == 0) {
            revert MintingCTokenFailed();
        }
    }

    /*
    *   @notice Redeems cUSDC for USDC
    *   @param amount The amount of cUSDC to redeem
    * . @notice Only the wallet can call this function
    */
    function redeemInvestment(uint256 amount) external onlyWallet {
        if (cUsdc.redeem(amount) != 0) {
            revert RedeemInvestmentFailed();
        }
        if (!usdc.transfer(accountWallet, amount)) {
            revert TransferToWalletFailed();
        }
    }
}
