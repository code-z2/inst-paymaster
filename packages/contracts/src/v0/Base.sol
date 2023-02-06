// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import {IPaymaster, ExecutionResult} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymaster.sol";
import {IPaymasterFlow} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymasterFlow.sol";
import {TransactionHelper, Transaction} from "@matterlabs/zksync-contracts/l2/system-contracts/TransactionHelper.sol";

import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";

/// @title ZkSync Base Paymaster Implementation
/// @author matterlabs
abstract contract Base {
    modifier onlyBootloader() {
        require(msg.sender == BOOTLOADER_FORMAL_ADDRESS, "Only bootloader can call this method");
        _;
    }

    /// @notice this method is used to implement gas settlement logic
    /// @dev must be overridden
    /// @param _transaction - contains the standard parameters in a tx object for eth_call
    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable virtual returns (bytes memory context);

    /// @dev - internal function for charging tx cost from paymaster
    // can be extended by Overrides
    /// @param amount - the amount to debit the paymaster
    function _chargeContractForTx(uint256 amount) internal virtual {
        (bool success, ) = payable(BOOTLOADER_FORMAL_ADDRESS).call{value: amount}("");
        require(success, "Failed to transfer funds to the bootloader");
    }

    function postOp(
        bytes calldata _context,
        Transaction calldata _transaction,
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        ExecutionResult _txResult,
        uint256 _maxRefundedErgs
    ) external payable onlyBootloader {}

    receive() external payable virtual {}
}
