// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.0;

import "@matterlabs/zksync-contracts/l2/system-contracts/TransactionHelper.sol";

interface IAccount {
    function validateTransaction(
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable;

    function executeTransaction(
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable;

    function executeTransactionFromOutside(Transaction calldata _transaction)
        external
        payable;

    function payForTransaction(
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable;

    function prePaymaster(
        bytes32 _txHash,
        bytes32 _possibleSignedHash,
        Transaction calldata _transaction
    ) external payable;
}
