// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

struct PaymasterMeta {
    address contractAddress;
    bytes metadata;
}

struct AccessControlSchema {
    uint256 maxNonce;
    address validationAddress;
    address ERC20GateContract;
    uint256 ERC20GateValue;
    address NFTGateContract;
    address[] strictDestinations;
}

struct AccessControlRules {
    bool useMaxNonce;
    bool useERC20Gate;
    bool useNFTGate;
    bool useStrictDestination;
}

struct ApprovalBasedFlow {
    address l2FeeToken;
    uint256 l2FeeAmount;
    bool useOracleQuotes;
    address priceFeed;
}

struct RebateHandler {
    address rebateToken;
    uint256 rebateTrigger;
    address dispatcher; // can be set to validation address if need be
    uint8 rebatePercentage;
    uint256 maxRebateAmount; // set to uint256 max if not checked. advisable not to.
    uint128 maxNumberOfRebates; // set uint256 max if its unlimited rebates.
}

//tbd
struct L1Messenger {
    address l1Contract;
    string l1Selector;
}
