// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

interface IAgrregatorV0 {
    function save(address, address, bytes memory) external;

    function update(address, bytes memory) external;

    function remove(address) external;

    function get(address) external view;

    function getAll() external view;
}
