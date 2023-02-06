// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import {IPaymaster} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymaster.sol";

interface IPaymasterDelegationV0 is IPaymaster {
    function delegate(bool, uint256) external;
}
