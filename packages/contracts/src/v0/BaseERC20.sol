// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./Base.sol";
import "./library/AccessControl.sol";
import "./utils/Structs.sol";

contract PaymasterERC20 is Base {
    bytes public metadata;
    ApprovalBasedFlow internal _flow;
    AccessControlSchema internal _schema;
    AccessControlRules private _rules;

    // i know, you cant pass structs to constructor. yeah yeah.
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

    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable virtual override onlyBootloader returns (bytes memory context) {
        require(
            _transaction.paymasterInput.length >= 4,
            "The standard paymaster input must be at least 4 bytes long"
        );
        bytes4 paymasterInputSelector = bytes4(_transaction.paymasterInput[0:4]);
        if (paymasterInputSelector == IPaymasterFlow.approvalBased.selector) {
            (address token, uint256 minAllowance, ) = abi.decode(
                _transaction.paymasterInput[4:],
                (address, uint256, bytes)
            );
            address caller = address(uint160(_transaction.from));

            require(
                _satisfy(caller, address(uint160(_transaction.to))),
                "user not eligible to use this paymaster"
            );
            require(token == _flow.l2FeeToken, "Invalid token");
            require(minAllowance >= _flow.l2FeeAmount, "Min allowance too low");

            uint256 txCost = _transaction.ergsLimit * _transaction.maxFeePerErg;

            bool success = _handleTokenTransfer(
                caller,
                _schema.validationAddress,
                _flow.l2FeeAmount,
                _flow.l2FeeToken
            );
            if (success) {
                _chargeContractForTx(txCost);
            } // else the user pays the bootloader;
        } else {
            revert("Unsupported paymaster flow");
        }
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
}
