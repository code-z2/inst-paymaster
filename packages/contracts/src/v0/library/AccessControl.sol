// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";

/// @title Paymastrers Access Control Library
/// @author peter Anyaogu
/// @notice used for access control logic in the IxPaymasterV0 contracts
library AccessControl {
    /// @dev restricts paymaster to users whoose nonce is under specific value.
    /// @param value - the maximum nonce accepted by the paymaster contract
    /// @param from - the address of the tx sender
    /// @return  - true / false
    function useMaxNonce(uint256 value, address from) internal returns (bool) {
        bytes memory payload = abi.encodeWithSignature("getMinNonce(address)", from);
        return !_externalCall(payload, address(NONCE_HOLDER_SYSTEM_CONTRACT), value);
    }

    /// @dev restricts paymaster to users who are hodling a specific amount of ERC20 token.
    /// @param erc20Contract - the ERC20 token contract address
    /// @param value - the the amount of tokens the user is expected to hold.
    /// @param from - the address of the tx sender
    /// @return  - true / false
    function useERC20Gate(
        address erc20Contract,
        uint256 value,
        address from
    ) internal returns (bool) {
        bytes memory payload = abi.encodeWithSignature("balanceOf(address)", from);
        return _externalCall(payload, erc20Contract, value);
    }

    /// @dev restricts paymaster to users who are hodling at an NFT.
    /// @param nftContract - the NFT contract address
    /// @param from - the address of the tx sender
    /// @return  - true / false
    function useNFTGate(address nftContract, address from) internal returns (bool) {
        // payload only surport erc721 only
        bytes memory payload = abi.encodeWithSignature("balanceOf(address)", from);
        return _externalCall(payload, nftContract, 1);
    }

    /// @dev restricts paymaster to users who are interacting with specific contracts.
    /// @param to - the destination contract address for the transaction.
    /// @param allowedDestinations - the addresse(s) of the accepted destination contracts
    /// @return  - true / false
    function useStrictDestination(
        address to,
        address[] memory allowedDestinations
    ) internal pure returns (bool) {
        for (uint256 i = 0; i < allowedDestinations.length; i++) {
            if (to == allowedDestinations[i]) return true;
        }
        return false;
    }

    /// @dev internal function for handling external calls
    /// @param _payload - the the encoded function signature in bytes
    /// @param _to - the contract address to perform external call.
    /// @param _value - value to be compared against the return value from the external call.
    /// @return  - true / false
    function _externalCall(
        bytes memory _payload,
        address _to,
        uint256 _value
    ) private returns (bool) {
        (bool success, bytes memory returnData) = address(_to).call(_payload);
        if (success) {
            uint256 decoded = abi.decode(returnData, (uint256));
            return decoded >= _value ? true : false;
        }
        return false;
    }
}
