// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import {PaymasterMeta} from "./utils/Structs.sol";
import "./utils/Modifiers.sol";

contract AggregatorV0 is ISmod {
    PaymasterMeta[] private paymasters;
    mapping(address => uint256[]) private ownerToPaymasters;

    event NewPaymster(address contractAddress);

    function save(
        address owner,
        address paymasterAddr,
        bytes memory metadata
    ) external onlyPaymasters(paymasterAddr) {
        // updates paymaster owner.
        ownerToPaymasters[owner].push(paymasters.length);
        // updates paymaster storage.
        paymasters.push(PaymasterMeta({contractAddress: paymasterAddr, metadata: metadata}));
        // emits new event
        emit NewPaymster(paymasterAddr);
    }

    function update(address paymasterAddr, bytes memory metadata) external {
        // get owners paymasters
        uint256[] memory ownedPaymasters = ownerToPaymasters[msg.sender];
        // loop through owners paymasters
        for (uint256 i = 0; i < ownedPaymasters.length; i++) {
            // if the paymaster address is same as this one update it.
            if (paymasters[ownedPaymasters[i]].contractAddress == paymasterAddr) {
                paymasters[ownedPaymasters[i]].metadata = metadata;
            }
        }
    }

    function remove(address paymasterAddr) external {
        // get owners paymasters
        uint256[] memory ownedPaymasters = ownerToPaymasters[msg.sender];
        // loop through owners paymasters
        for (uint256 i = 0; i < ownedPaymasters.length; i++) {
            // if the paymaster address is same as this one remove it.
            if (paymasters[ownedPaymasters[i]].contractAddress == paymasterAddr) {
                paymasters[ownedPaymasters[i]] = paymasters[paymasters.length - 1];
                paymasters.pop();
            }
        }
    }

    function get(address owner) external view returns (PaymasterMeta[] memory) {
        // get owners paymasters
        uint256[] memory ownedPaymasters = ownerToPaymasters[owner];
        PaymasterMeta[] memory all = new PaymasterMeta[](ownedPaymasters.length);

        for (uint256 i = 0; i < ownedPaymasters.length; i++) {
            all[i] = paymasters[ownedPaymasters[i]];
        }

        return all;
    }

    function getAll() external view returns (PaymasterMeta[] memory) {
        return paymasters;
    }
}
