// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

// this contracts uses l1 access control
// can be used to enforce optional l1 satisfy check
// in situations where a protocols main contract is in ethereum
// can be used to call the contract on l1 and perform access verification
// e.g liquidity providers, lender, governance voter etc
contract PaymasterL1MessagingMiddleware {
    // todo
    // must be passed a contract address and a selector
    // uses the contract address to perform L1message using zksync system contracts caller
}
