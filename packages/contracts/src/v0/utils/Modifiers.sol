// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../interface/IPaymaster.sol";

contract ISmod {
    modifier onlyPaymasters(address paymasterContract) {
        try IxPaymaster(paymasterContract).satisfy(address(this)) returns (bool status) {
            require(success || !success, "unknown error!");
            _;
        } catch {
            revert("contract errored while verifying Ix compatibility!");
        }
    }
}
