// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IAccount.sol";
import "@matterlabs/zksync-contracts/l2/system-contracts/TransactionHelper.sol";
import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";
import "@matterlabs/zksync-contracts/l2/system-contracts/SystemContractsCaller.sol";

import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SAccount is IAccount, IERC1271 {
    using TransactionHelper for Transaction;

    bytes4 constant EIP1271_SUCCESS_RETURN_VALUE = 0x1626ba7e;

    address immutable owner;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyBootloader() {
        require(
            msg.sender == BOOTLOADER_FORMAL_ADDRESS,
            "Only bootloader can call this method"
        );
        // Continure execution if called from the bootloader.
        _;
    }

    function validateTransaction(
        bytes32,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        _validateTransaction(_suggestedSignedHash, _transaction);
    }

    function _validateTransaction(
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) internal {
        // Incrementing the nonce of the account.
        // Note, that reserved[0] by convention is currently equal to the nonce passed in the transaction
        // also note only the systemcontractcaller can call non view methed in the noncwholdercontract
        SystemContractsCaller.systemCall(
            uint32(gasleft()),
            address(NONCE_HOLDER_SYSTEM_CONTRACT),
            0,
            abi.encodeCall(
                INonceHolder.incrementMinNonceIfEquals,
                (_transaction.reserved[0])
            )
        );

        bytes32 txHash;
        if (_suggestedSignedHash == bytes32(0)) {
            txHash = _transaction.encodeHash();
        } else {
            txHash = _suggestedSignedHash;
        }

        require(
            isValidSignature(txHash, _transaction.signature) ==
                EIP1271_SUCCESS_RETURN_VALUE
        );
    }

    function executeTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        _executeTransaction(_transaction);
    }

    function _executeTransaction(Transaction calldata _transaction) internal {
        address to = address(uint160(_transaction.to));
        // By convention, the `reserved[1]` field is msg.value
        uint256 value = _transaction.reserved[1];
        bytes memory data = _transaction.data;

        if (to == address(DEPLOYER_SYSTEM_CONTRACT)) {
            // We allow calling ContractDeployer with any calldata
            SystemContractsCaller.systemCall(
                uint32(gasleft()),
                to,
                uint128(_transaction.reserved[1]), // By convention, reserved[1] is `value`
                _transaction.data
            );
        } else {
            bool success;
            assembly {
                success := call(
                    gas(),
                    to,
                    value,
                    add(data, 0x20),
                    mload(data),
                    0,
                    0
                )
            }

            // Needed for the transaction to be correctly processed by the server.
            require(success);
        }
    }

    function executeTransactionFromOutside(Transaction calldata _transaction)
        external
        payable
    {
        _validateTransaction(bytes32(0), _transaction);
        _executeTransaction(_transaction);
    }

    function isValidSignature(bytes32 _hash, bytes calldata _signature)
        public
        view
        override
        returns (bytes4)
    {
        require(_signature.length == 65, "incorrect signature length");
        address recoveredAddress = ECDSA.recover(_hash, _signature);
        if (recoveredAddress != owner) revert("invalid signature");
        return EIP1271_SUCCESS_RETURN_VALUE;
    }

    function payForTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        bool success = _transaction.payToTheBootloader();
        require(success, "Failed to pay the fee to the operator");
    }

    function prePaymaster(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        _transaction.processPaymasterInput();
    }

    receive() external payable {
        // If the bootloader called the `receive` function, it likely means
        // that something went wrong and the transaction should be aborted. The bootloader should
        // only interact through the `validateTransaction`/`executeTransaction` methods.
        assert(msg.sender != BOOTLOADER_FORMAL_ADDRESS);
    }
}
