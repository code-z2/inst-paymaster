// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

interface ISPaymasterFactory {
    function deployPaymaster(
        // used in create2
        bytes32 salt,
        address owner,
        // used in paymasterStorage
        bytes memory metadata,
        // parsed to paymaster constructor
        uint64 maxNonce, // allow users to perfom a limited amount of tx, default = 0 == unlimited
        bool useCustomToken, // use an erc20 or erc721 token for user vlidation, default = false == adress(this)
        address tokenAddress, // custom token contract for user validation, required if useCustomToken == true
        uint192 amount, // amount in erc20 required to use this paymaster, default = 1 for erc721, > 1 for erc20
        // account that pays the fees, if erc20 is set, default = caller
        // if erc721 is set, address(this) pays the eth cost
        // if not useCustomToken, address(this) pays the eth cost
        address validationAddress //VA default is address(this) if erc20 not set
    ) external;
}
