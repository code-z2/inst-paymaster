// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../Base.sol";

// this contract delegates bootloader calls from the current contract to another contract
// only if the paymaster does not have enough eth balance.
// it specifies a sister paymaster which is an IPaymasterDelegationProxy implementation too
// the sister paymaster can be updated
// NB: this contract makes paymasters themselves proxies as well as implementations
// if a vulnerability is detected. the paymaster can continue working by delegating all calls to another paymaster.
// adapt it to ERC20 paymaster if you wish
contract PaymasterGaslessDelegationProxy is Base {
    bytes public metadata;
    address private immutable _self = address(this);
    address public sister;

    constructor(bytes memory bafyhash, address _sister) {
        metadata = bafyhash;
        sister = _sister;
    }

    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader returns (bytes memory context) {
        require(
            _transaction.paymasterInput.length >= 4,
            "The standard paymaster input must be at least 4 bytes long"
        );

        /**
         * paymaster logic in here
         */
        uint256 txCost = _transaction.ergsLimit * _transaction.maxFeePerErg;

        _delegate(false, txCost);
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

    // this can only be called from inside the proxy
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

    // function update sister
}
