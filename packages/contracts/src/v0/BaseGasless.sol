// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./Base.sol";
import "./library/AccessControl.sol";
import "./utils/Structs.sol";

/// @title General Paymaster Contract with Access Control
/// @author peter anyaogu
/// @notice this contracts extends the general paymaster with access control rules
/// @dev the struct constructor paremeters are to keep code compact.
contract PaymasterGasless is Base {
    // IPFS metadata hash for offchain identifiers like Logo, Name etc.
    bytes public metadata;
    // access control parameters
    AccessControlSchema private _schema;
    // access control rules
    AccessControlRules private _rules;

    //structs should not be passed to constructor.
    constructor(
        bytes memory bafyhash,
        AccessControlSchema memory schema,
        AccessControlRules memory rules
    ) {
        metadata = bafyhash;
        _schema = schema;
        _rules = rules;
    }

    /// @notice this method is used to implement gas settlement logic with the general paymaster flow
    /// @dev can be extended by Overrides
    /// @param _transaction - contains the standard parameters in a tx object for eth_call
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

            // only debit this paymaster if it has enough funds
            _chargeContractForTx(txCost);
        } else {
            revert("Unsupported paymaster flow");
        }
    }

    /// @notice allows paymaster to check caller eligibility in using this contract
    /// @param addressToCheck - to address to satisy
    /// @return - true / false
    function satisfy(address addressToCheck) external payable returns (bool) {
        return _satisfy(addressToCheck, address(0));
    }

    /// @dev internal function for access control
    /// @param addressToCheck - to address to satisy
    /// @param txTo - the destination contract for the accompanying transaction
    /// @return truthy - true / false depending if the user passed all provided checks
    function _satisfy(address addressToCheck, address txTo) internal virtual returns (bool truthy) {
        truthy = true; // true & true = true, true & false = false, false & false = false.
        if (_rules.useMaxNonce) {
            // if maxNonce is in allowed Rules, validate the user Nonce
            truthy = truthy && AccessControl.useMaxNonce(_schema.maxNonce, addressToCheck);
        }

        // if ERC20Gating is in allowed Rules, validate the user Token Holdings
        if (_rules.useERC20Gate) {
            truthy =
                truthy &&
                AccessControl.useERC20Gate(
                    _schema.ERC20GateContract,
                    _schema.ERC20GateValue,
                    addressToCheck
                );
        }

        // if NFTGating is in allowed Rules, validate the user NFT Holdings
        if (_rules.useNFTGate) {
            truthy = truthy && AccessControl.useNFTGate(_schema.NFTGateContract, addressToCheck);
        }

        // if specifics tx.to are in allowed Rules, validate transaction destination.
        if (_rules.useStrictDestination && txTo != address(0)) {
            truthy = truthy && AccessControl.useStrictDestination(txTo, _schema.strictDestinations);
        }
    }
}
