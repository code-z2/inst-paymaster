// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

interface ISAccountFactory {
    function deployAccount(bytes32 salt, address owner) external;
}
