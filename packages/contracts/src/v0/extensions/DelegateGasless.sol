// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../Base.sol";
import "../library/AccessControl.sol";
import "../utils/Structs.sol";

// this contract delegates bootloader calls from the current contract to another contract
// only if the paymaster does not have enough eth balance.
// it specifies a sister paymaster which is an IPaymasterDelegationProxy implementation too
// the sister paymaster can be updated
// NB: this contract makes paymasters themselves proxies as well as implementations
// if a vulnerability is detected. the paymaster can continue working by delegating all calls to another paymaster.
// adapt it to ERC20 paymaster if you wish
// also - it selector clashes may happen so make sure that sister contract is trusted.
contract PaymasterGaslessDelegationProxy is Base {
    bytes public metadata;
    // access control parameters
    AccessControlSchema private _schema;
    // access control rules
    AccessControlRules private _rules;

    address private immutable _self = address(this);
    address public sister;

    constructor(
        bytes memory bafyhash,
        AccessControlSchema memory schema,
        AccessControlRules memory rules,
        address _sister
    ) {
        metadata = bafyhash;
        _schema = schema;
        _rules = rules;
        sister = _sister;
    }

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

            _delegate(false, txCost);
        } else {
            revert("Unsupported paymaster flow");
        }
    }

    // according to delegateCall [address(this), msg.sender, msg.value]
    // will remain the same thorughout the context of the implementation contract
    // so msg.sender will still be the bootloader
    // this may only be called in the implementation
    // unless zkSync Bootloader becomes malicious.
    function delegate(bool used, uint256 txCost) external onlyBootloader {
        require(!used, "cannot pay for gas");

        //? audit and test required!
        //! payable(address).call{} ? will this happen in the context of:
        //* execution contract or implementation contract?
        _chargeContractForTx(txCost);
    }

    /// @dev internal function that performs the actual delegation
    /// @param used - true / false checks if the
    /// @return Documents the return variables of a contract’s function state variable
    /// @inheritdoc	Copies all missing tags from the base function (must be followed by the contract name)
    function _delegate(bool used, uint256 txCost) internal {
        if (_self.balance > txCost) {
            _chargeContractForTx(txCost);
        } else {
            bytes4 selector = this.delegate.selector;
            // transfer call to the sister paymaster.

            (, bytes memory data) = sister.delegatecall(
                abi.encodeWithSelector(selector, used, txCost) // next delegation will fail
            );
        }
    }

    function updateSister(address newSister) public {
        require(msg.sender == _schema.validationAddress, "access denied");
        sister = newsister;
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
