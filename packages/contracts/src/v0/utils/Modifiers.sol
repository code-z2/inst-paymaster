// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../interfaces/IPaymaster.sol";

/// @title paymasters modifiers
/// @author peter anyaogu
/// @notice modifiers for the base paymaster contracts
contract ISmod {
    /// @notice checks the the paymaster address  contains the satisfy method which is used for access control
    /// @param paymasterContract - the address of the paymaster contract
    /// @return status - true if the paymaster is IxPaymasterV0 compatible otherwise false
    modifier onlyPaymasters(address paymasterContract) {
        try IxPaymasterV0(paymasterContract).satisfy(address(this)) returns (bool status) {
            require(status || !status, "unknown error!");
            _;
        } catch {
            revert("contract errored while verifying Ix compatibility!");
        }
    }
}
