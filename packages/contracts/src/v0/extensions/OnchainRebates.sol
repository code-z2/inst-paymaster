// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../BaseGasless.sol";

import {RebateHandler} from "../utils/Structs.sol";

// this contracts adds a rebate mechanism to paymasters
// currently inherits from the BaseGasless but can be made to inherit from the BaseERC20 too
// this paymaster contract can serve as a Base too.
contract PayamsterRebatesMiddleware is PaymasterGasless {
    RebateHandler private _rebateParams;
    // tracks the number of times a user has recieved a rebate
    mapping(address => uint256) private rebateTracker;

    constructor(
        // Reabate params
        bytes memory bafyhash,
        AccessControlSchema memory schema,
        AccessControlRules memory rules
    ) PaymasterGasless(bafyhash, schema, rules) {
        // set rebate params
    }

    /** @notice this is a simple implementation of a rebates mechanism for Gasless Paymasters.
     * feel free to adapt it to your use cases
     * @dev this this method allows for expansion feel free to use oracles, nfts etc.
     * @param _transaction - the tx object passed with eth_call
     */
    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable virtual override onlyBootloader returns (bytes memory context) {
        // a standard paymaster must have at least 4byte paymasterInput
        require(
            _transaction.paymasterInput.length >= 4,
            "The standard paymaster input must be at least 4 bytes long"
        );
        bytes4 paymasterInputSelector = bytes4(_transaction.paymasterInput[0:4]);
        // checks that only general selector can be passed to paymasterInput
        // you can adapt this method with approvalBased Flow.
        if (paymasterInputSelector == IPaymasterFlow.general.selector) {
            // the address of the tx sender
            address caller = address(uint160(_transaction.from));

            require(
                // checks that the sender passes the access control requirements
                _satisfy(caller, address(uint160(_transaction.to))),
                "user not eligible to use this paymaster"
            );

            // calculates the transaction cost i.e (gasLimit * gasFee)
            uint256 txCost = _transaction.ergsLimit * _transaction.maxFeePerErg;

            _rebate(_transaction);

            // only debit this paymaster if it has enough funds
            _chargeContractForTx(txCost);
        } else {
            revert("Unsupported paymaster flow");
        }
    }

    /// @dev internal function that process on-chain cashback
    /// @param _transaction - the tx object passed with eth_call
    function _rebate(Transaction calldata _transaction) internal {
        // the value passed with the transaction is in the reserved arr
        uint256 transactionValue = _transaction.reserved[1];
        address txFrom = address(uint160(_transaction.from));

        bool isEligible = _eligibleForRebate(transactionValue, txFrom);
        if (isEligible) {
            // calculate eligible amount
            uint256 amount = (_rebateParams.rebatePercentage * transactionValue) / 100;
            // increase user rebate tracker
            rebateTracker[txFrom] + 1;
            // transfer tokens
            _handleTokenTransfer(
                _rebateParams.dispatcher,
                txFrom,
                amount > _rebateParams.maxRebateAmount ? _rebateParams.maxRebateAmount : amount,
                _rebateParams.rebateToken
            );
        }
    }

    /// @dev internal function for checking if user is eligible for rebate
    /// @param txValue - the value passed with the transaction
    /// @param tcFrom - the sender of this transaction
    /// @return eligible - true / false
    function _eligibleForRebate(
        uint256 txValue,
        address txFrom
    ) internal view returns (bool eligible) {
        eligible = rebateTracker[txFrom] < _rebateParams.maxNumberOfRebates;

        eligible = eligible && txValue >= _rebateParams.rebateTrigger;
    }

    /// @dev - internal function that handles transfer of ERC20 fee to fee receiver or VA
    /// @param from - the address of the transction sender
    /// @param - (optional) the address of fee reciever or VA
    /// @param amount - amount of tokens to be transfered to fee Receiver
    /// @param token - conreact address of the ERC20 token
    /// @return success - true or false
    function _handleTokenTransfer(
        address from,
        address to,
        uint256 amount,
        address token
    ) internal returns (bool success) {
        require(_checkAllowance(from, token) >= amount, "not enough allowance");
        success = IERC20(token).transferFrom(from, to, amount);
    }

    /// @dev - internal function that checks for token allowance
    /// @param txFrom - the address of the transction sender
    /// @param token - conreact address of the ERC20 token
    /// @return - The allowance (uint256) e.g 1000
    function _checkAllowance(address txFrom, address token) internal view returns (uint256) {
        uint256 providedAllowance = IERC20(token).allowance(txFrom, address(this));
        return providedAllowance;
    }
}
