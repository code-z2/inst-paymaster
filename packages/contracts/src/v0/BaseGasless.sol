// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./Base.sol";
import "./library/AccessControl.sol";
import "./utils/Structs.sol";

contract PaymasterGasless is Base {
    bytes public metadata;
    AccessControlSchema private _schema;
    AccessControlRules private _rules;

    // i know, you cant pass structs to constructor. yeah yeah.
    constructor(
        bytes memory bafyhash,
        AccessControlSchema memory schema,
        AccessControlRules memory rules
    ) {
        metadata = bafyhash;
        _schema = schema;
        _rules = rules;
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

        address caller = address(uint160(_transaction.from));

        require(
            _satisfy(caller, address(uint160(_transaction.to))),
            "user not eligible to use this paymaster"
        );

        uint256 txCost = _transaction.ergsLimit * _transaction.maxFeePerErg;

        _chargeContractForTx(txCost);
    }

    function satisfy(address addressToCheck) external payable returns (bool) {
        return _satisfy(addressToCheck, address(0));
    }

    function _satisfy(address addressToCheck, address txTo) internal virtual returns (bool truthy) {
        truthy = true; // true & true = true, true & false = false, false & false = false.
        if (_rules.useMaxNonce) {
            truthy = truthy && AccessControl.useMaxNonce(_schema.maxNonce, addressToCheck);
        }

        if (_rules.useERC20Gate) {
            truthy =
                truthy &&
                AccessControl.useERC20Gate(
                    _schema.ERC20GateContract,
                    _schema.ERC20GateValue,
                    addressToCheck
                );
        }

        if (_rules.useNFTGate) {
            truthy = truthy && AccessControl.useNFTGate(_schema.NFTGateContract, addressToCheck);
        }

        if (_rules.useStrictDestination && txTo != address(0)) {
            truthy = truthy && AccessControl.useStrictDestination(txTo, _schema.strictDestinations);
        }
    }

    function _chargeContractForTx(uint256 amount) internal {
        (bool success, ) = payable(BOOTLOADER_FORMAL_ADDRESS).call{value: amount}("");
        require(success, "Failed to transfer funds to the bootloader");
    }
}
