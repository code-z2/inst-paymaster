// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./Base.sol";
import "./library/AccessControl.sol";
import "./utils/Structs.sol";

/// @title Approval Based Paymaster Contract with Access Control
/// @author peter anyaogu
/// @notice this contracts extends the approval based paymaster with access control rules
/// @dev the struct constructor paremeters are to keep code compact.
contract PaymasterERC20 is Base {
    // IPFS metadata hash for offchain identifiers like Logo, Name etc.
    bytes public metadata;
    // approval based conditions
    ApprovalBasedFlow internal _flow;
    // access control parameters
    AccessControlSchema private _schema;
    // access control rules
    AccessControlRules private _rules;

    //structs should not be passed to constructor.
    constructor(
        bytes memory bafyhash,
        AccessControlSchema memory schema,
        AccessControlRules memory rules,
        ApprovalBasedFlow memory feeModel
    ) {
        metadata = bafyhash;
        _schema = schema;
        _rules = rules;
        _flow = feeModel;
    }

    /// @notice this method is used to implement gas settlement logic with approval-based flow
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
                _schema.validationAddress,
                _flow.l2FeeAmount,
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

    /// @dev - internal function that handles transfer of ERC20 fee to fee receiver or VA
    /// @param from - the address of the transction sender
    /// @param - (optional) the address of fee reciever or VA
    /// @param amount - amount of tokens to be transfered to fee Receiver
    /// @param token - conreact address of the ERC20 token
    /// @return success - true or false
    function _handleTokenTransfer(
        address from,
        address,
        uint256 amount,
        address token
    ) internal returns (bool success) {
        require(_checkAllowance(from, token) >= amount, "not enough allowance");
        success = IERC20(token).transferFrom(from, _schema.validationAddress, amount);
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
