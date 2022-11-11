// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "../interface/IPaymaster.sol";

/// @title Paymster Storage Contract
/// @author (github@peteruche21)
/// @notice Stores paymasters deployed by the Paymaster factory.
/// @dev includes Paymaster Contract address and paymaster metadata, paymaster metadata consists of owner address, name and logoHash, creation detials. Paymaster metadata is stored offchain
contract SPaymasterStorage {
    struct PaymasterMeta {
        address contract_address;
        bytes metadata;
    }
    mapping(address => uint256) private ownerToPaymaster;
    PaymasterMeta[] internal Paymasters;

    /**
     * @notice Stores Paymaster to Array Paymasters
     * @dev External function! must be called from the factory, does not guarantee ERC165 check.
     * @param owner - the deployer of this paymaster
     * @param paymasterAddr - the address of paymaster to store
     * @param metadata - offchain metadata cid/hash (name, owner, logoHash: paymaster logo, creation details)
     */
    function storePaymaster(
        address owner,
        address paymasterAddr,
        bytes memory metadata
    ) external {
        // check if paymasterAddr surpports the ISPaymaster Interface
        // not a valid check, cause you can just return bool==true from attacking contract.
        // but lets keep it. possibly allow only calls from factory.
        require(
            IERC165(paymasterAddr).supportsInterface(
                type(ISPaymaster).interfaceId
            ),
            "not a valid paymaster contract"
        );
        ownerToPaymaster[owner] = Paymasters.length;
        Paymasters.push(
            PaymasterMeta({contract_address: paymasterAddr, metadata: metadata})
        );
    }

    function getPaymasterByOwner(address owner)
        external
        view
        returns (PaymasterMeta memory)
    {
        return (Paymasters[ownerToPaymaster[owner]]);
    }

    function getAllPaymasters() external view returns (PaymasterMeta[] memory) {
        return Paymasters;
    }
}
