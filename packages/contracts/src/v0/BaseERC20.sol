// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./Base.sol";

contract PaymasterERC20 is Base {
    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable virtual override onlyBootloader returns (bytes memory context) {
        // implement erc20 only validation logic
    }
}
