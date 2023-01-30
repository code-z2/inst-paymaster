// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../interfaces/IPaymaster.sol";

contract ISmod {
    modifier onlyPaymasters(address paymasterContract) {
        try IxPaymaster(paymasterContract).satisfy(address(this)) returns (bool status) {
            require(status || !status, "unknown error!");
            _;
        } catch {
            revert("contract errored while verifying Ix compatibility!");
        }
    }
}
