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

struct AprovalBasedFlow {
    address l2FeeToken;
    uint256 l2FeeAmount;
    bool useOracleQuotes;
    string priceFeed;
}
