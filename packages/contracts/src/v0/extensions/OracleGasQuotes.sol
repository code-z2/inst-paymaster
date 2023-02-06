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
        // a standard paymaster must have at least 4byte paymasterInput
        require(
            _transaction.paymasterInput.length >= 4,
            "The standard paymaster input must be at least 4 bytes long"
        );
        bytes4 paymasterInputSelector = bytes4(_transaction.paymasterInput[0:4]);
        // checks that only approvalBased selector can be passed to paymasterInput
        if (paymasterInputSelector == IPaymasterFlow.approvalBased.selector) {
            (address token, uint256 minAllowance, ) = abi.decode(
                _transaction.paymasterInput[4:],
                (address, uint256, bytes)
            );
            // the address of the tx sender
            address caller = address(uint160(_transaction.from));
            // checks that the sender passes the access control requirements
            require(
                _satisfy(caller, address(uint160(_transaction.to))),
                "user not eligible to use this paymaster"
            );
            // checks that the token address passed with paymasterInput is the same as allowed fee Token
            require(token == _flow.l2FeeToken, "Invalid token");
            // makes sure that min allowance is greater than the minimum payable fee
            require(minAllowance >= _flow.l2FeeAmount, "Min allowance too low");
            // calculates the transaction cost i.e (gasLimit * gasFee)
            uint256 txCost = _transaction.ergsLimit * _transaction.maxFeePerErg;

            // debits the user with the required Fee token amount
            bool success = _handleTokenTransfer(
                caller,
                address(0),
                _flow.useOracleQuotes ? _processOracleRequest(txCost) : _flow.l2FeeAmount,
                _flow.l2FeeToken
            );
            // only debit the paymaster if fee token trtansfer was successfull
            // @notice non-reverting. if this paymaster has enough funds
            if (success) {
                _chargeContractForTx(txCost);
            } // else the user pays the bootloader;
        } else {
            revert("Unsupported paymaster flow");
        }
    }

    /// @dev internal function that handles chainlink priceFeed requests
    /// @param txCost -  the cost of this tx in wei
    /// @return - the cost of this tx in ERC20 denominated in wei
    function _processOracleRequest(uint256 txCost) internal view returns (uint256) {
        // this function makes the oracle call and returns the latest price data.
        // calculates the amount to be debited
        int256 fee = getDerivedPrice(_flow.priceFeed, _quotePriceFeed, int256(txCost));
        return uint256(fee);
    }
}
