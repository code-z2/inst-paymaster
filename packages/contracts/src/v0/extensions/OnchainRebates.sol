// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

// this contracts adds a rebate mechanism to paymasters
contract PayamsterRebatesMiddleware {
    uint256 private rebateTrigger;

    constructor(uint256 _customRebateTrigger) {
        rebateTrigger = _customRebateTrigger | 1e18;
    }

    // todo
    // takes in the transaction
    // checks the value of the tx is >= to rebate trigger
    // transfers specified tokens % back to transaction.from
}
