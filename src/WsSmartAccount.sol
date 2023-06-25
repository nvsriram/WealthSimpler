// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {SmartAccount} from "@biconomy/contracts/SmartAccount.sol";

/**
 * @title SmartAccount - EIP-4337 compatible smart contract wallet.
 * @dev This contract is the base for the Smart Account functionality.
 *         - It provides the functionality to execute both gnosis-style txns and AA (EIP-4337) userOps
 *         - It allows to receive and manage assets.
 *         - It is responsible for managing the modules and fallbacks.
 *         - The Smart Account can be extended with modules, such as Social Recovery, Session Key and others.
 * @author Chirag Titiya - <chirag@biconomy.io>
 */
contract WsSmartAccount is SmartAccount {}
