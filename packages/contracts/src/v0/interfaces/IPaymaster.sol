// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import {IPaymaster} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymaster.sol";

interface IxPaymaster is IPaymaster {
    function satisfy(address user) external payable returns (bool status);
}
