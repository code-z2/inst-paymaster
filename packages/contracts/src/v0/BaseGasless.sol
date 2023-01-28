// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./Base.sol";

contract PaymasterGasless is Base {
    bytes public metadata;

    constructor(bytes memory bafyhash) {
        metadata = bafyhash;
    }

    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable virtual override onlyBootloader returns (bytes memory context) {
        // implement gasless only validation logic
    }

    function satisfy(address addressToCheck) external payable returns (bool) {
        return _satisfy(addressToCheck);
    }

    function _satisfy(address addressToCheck) internal returns (bool) {}
}
