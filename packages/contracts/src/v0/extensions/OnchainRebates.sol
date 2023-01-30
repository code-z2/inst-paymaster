// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../Base.sol";

import {RebateHandler} from "../utils/Structs.sol";

// this contracts adds a rebate mechanism to paymasters
// currently inherits from the Base class but can be made to inherit from either the BaseERC20 or the BaseGasless
// this paymaster contract can serve as a Base too.
contract PayamsterRebatesMiddleware is Base {
    bytes public metadata;
    RebateHandler private _rebateParams;
    mapping(address => uint256) private rebateTracker;

    constructor(
        // Reabate params
        bytes memory bafyhash
    ) {
        metadata = bafyhash;
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
        require(
            _transaction.paymasterInput.length >= 4,
            "The standard paymaster input must be at least 4 bytes long"
        );

        /**
         * paymaster logic in here
         */

        _rebate(_transaction);
    }

    function _rebate(Transaction calldata _transaction) internal {
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

    function _eligibleForRebate(
        uint256 txValue,
        address txFrom
    ) internal view returns (bool eligible) {
        eligible = rebateTracker[txFrom] < _rebateParams.maxNumberOfRebates;

        eligible = eligible && txValue >= _rebateParams.rebateTrigger;
    }

    function _handleTokenTransfer(
        address from,
        address to,
        uint256 amount,
        address token
    ) internal returns (bool success) {
        require(_checkAllowance(from, token) >= amount, "not enough allowance");
        success = IERC20(token).transferFrom(from, to, amount);
    }

    function _checkAllowance(address txFrom, address token) internal view returns (uint256) {
        uint256 providedAllowance = IERC20(token).allowance(txFrom, address(this));
        return providedAllowance;
    }

    // implement other functions.
}
