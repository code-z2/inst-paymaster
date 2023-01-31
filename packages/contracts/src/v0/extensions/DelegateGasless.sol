// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../Base.sol";

// this contract delegates bootloader calls from the current contract to another contract
// only if the paymaster does not have enough eth balance.
// maximum of 3 delegations
contract PaymasterGaslessDelegationProxy is Base {
    bytes public metadata;

    constructor(bytes memory bafyhash) {
        metadata = bafyhash;
    }

    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable virtual override onlyBootloader returns (bytes memory context) {
        require(
            _transaction.paymasterInput.length >= 4,
            "The standard paymaster input must be at least 4 bytes long"
        );

        /**
         * paymaster logic in here
         */
    }

    function delegate(address next, uint256 count) internal {
        // transfer call to the next paymaster.
        require(count < 3, "transaction failed to resolve");
    }
}
