// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

struct PaymasterMeta {
    address contractAddress; // the contract address of a paymaster contract
    bytes metadata; // the offchain metadata of the paymaster contract
}

struct AccessControlSchema {
    uint256 maxNonce; // the accepted user nonce. upper boundry
    address validationAddress; // the address of the fee reciever
    address ERC20GateContract; // the token gating contract address (ERC20)
    uint256 ERC20GateValue; // the amount of tokens required
    address NFTGateContract; // the token gating contract address (ERC721) note! ERC1155 is not surported
    address[] strictDestinations; // the list of allowed destination contracts
}

struct AccessControlRules {
    bool useMaxNonce; // rule for activation nonce checking
    bool useERC20Gate; // rule for activation token holding check
    bool useNFTGate; // rule for activating nft holding check
    bool useStrictDestination; // rule for activating destination contract check
}

struct ApprovalBasedFlow {
    address l2FeeToken; // the ERC20 token to be used a gas fee token in the approval Based flow
    uint256 l2FeeAmount; // the amount of tokens to be charged as fee
    bool useOracleQuotes; // use chainlink oracles to get token equivalent of actual gas fee in usd
    address priceFeed; // the price feed to be used in the oracle request
}

struct RebateHandler {
    address rebateToken; // the token contract address to be used for rebates
    uint256 rebateTrigger; // the tx value lower boundry that can trigger rebates
    address dispatcher; // the address to transfer the rebates from. can be set to validation address if need be
    uint8 rebatePercentage; // the percentage of tx.value to be calculated for rebates
    uint256 maxRebateAmount; // maximum amount of rebates a user can recieve. set to uint256 max if not checked.
    uint128 maxNumberOfRebates; //maximum number of times a user can recieve rebates in a lifetime. set uint256 max if unlimited.
}
