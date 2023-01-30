// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../BaseERC20.sol";

// this contract delegates bootloader calls from the current contract to another contract
// only if the paymaster does not have enough eth balance.
// maximum of 3 delegations
contract PaymasterOracleEnabled is PaymasterERC20 {
    constructor() PaymasterERC20() {}

    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader returns (bytes memory context) {
        // chainlink compatible paymaster
    }
}
