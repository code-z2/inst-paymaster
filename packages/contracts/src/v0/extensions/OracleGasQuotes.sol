// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../BaseERC20.sol";
import "../../chainlink/PriceFeedConsumer.sol";

// chainlink compatible paymaster
// @notice - chainlink is currently not in zksync
// this contract will not work until chainlink becomes available in zksync
// you can adapt this to any oracle as you wish
contract PaymasterOracleEnabled is PaymasterERC20, PriceFeedConsumer {
    constructor(
        bytes memory bafyhash,
        AccessControlSchema memory schema,
        AccessControlRules memory rules,
        ApprovalBasedFlow memory feeModel
    ) PaymasterERC20(bafyhash, schema, rules, feeModel) {}

    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader returns (bytes memory context) {
        /**
         * chainlink compatible paymaster flow
         * implement other overrides
         */

        address caller = address(uint160(_transaction.from));

        uint256 txCost = _transaction.ergsLimit * _transaction.maxFeePerErg;
        bool success = _handleTokenTransfer(
            caller,
            address(0),
            _flow.useOracleQuotes ? _processOracleRequest(txCost) : _flow.l2FeeAmount,
            _flow.l2FeeToken
        );
        if (success) {
            _chargeContractForTx(txCost);
        } // else money does not leave;
    }

    // just make sure t0 implement your oracle request in another contract and inherit it.
    // the contract should have a method getDerivedPrice that returns the expected value.
    function _processOracleRequest(uint256 txCost) internal view returns (uint256) {
        // this function makes the oracle call and returns the latest price data.
        // calculates the amount to be debited
        // returns the amount to be debited.
        int256 fee = getDerivedPrice(_flow.priceFeed, int256(txCost));
        return uint256(fee);
    }
}
