// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

interface ISPaymasterStorage {
    function storePaymaster(
        address owner,
        address paymasterAddr,
        bytes memory metadata
    ) external;

    function getPaymasterByOwner() external view;

    function getAllPaymasters() external view;
}
