// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../Base.sol";

// this contracts uses l1 messaging
// can be used to send a message to l1 each time a transaction occurs
// in situations where a protocols main contract is in ethereum
// can be used to call the contract on l1 and perform access verification
// the provided l2 selector will be used to return information if available
// however this will not happen in a single transaction
// currently zksync has not achieved instant finalty and l1<>l2 messages will take hours
// e.g liquidity providers, lender, governance voter etc
contract PaymasterL1MessagingMiddleware is Base {
    // todo
    // must be passed a contract address and a selector
    // uses the contract address to perform L1message using zksync system contracts caller

    bytes public metadata;

    constructor(bytes memory bafyhash) {
        metadata = bafyhash;
    }

    /** @notice this is a simple implementation of l1 access for l1messaging Paymasters.
     * feel free to adapt it to your use cases
     * @dev this this method allows for expansion feel free to use oracles, nfts etc.
     * @param _transaction - the tx object passed with eth_call
     */
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
}
