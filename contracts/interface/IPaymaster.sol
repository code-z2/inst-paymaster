// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import {IPaymaster} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymaster.sol";

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

interface ISPaymaster is IPaymaster, IERC165 {
    function satisfiedTokenrequirements(address addressToSatisfy)
        external
        payable;
}
