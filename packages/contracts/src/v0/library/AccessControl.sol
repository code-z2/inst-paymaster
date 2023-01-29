// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";

library AccessControl {
    function useMaxNonce(uint256 value, address from) internal returns (bool) {
        bytes memory payload = abi.encodeWithSignature("getMinNonce(address)", from);
        return !_externalCall(payload, address(NONCE_HOLDER_SYSTEM_CONTRACT), value);
    }

    function useERC20Gate(address erc20Contract, uint256 value, address from) internal returns (bool) {
        bytes memory payload = abi.encodeWithSignature("balanceOf(address)", from);
        return _externalCall(payload, erc20Contract, value);
    }

    function useNFTGate(address nftContract, address from) internal returns (bool) {
        // payload only surport erc721 only
        bytes memory payload = abi.encodeWithSignature("balanceOf(address)", from);
        return _externalCall(payload, nftContract, 1);
    }

    function useStrictDestination(address to, address[] memory allowedDestinations) internal pure returns (bool) {
        for (uint256 i = 0; i < allowedDestinations.length; i++) {
            if (to == allowedDestinations[i]) return true;
        }
        return false;
    }

    function _externalCall(bytes memory _payload, address _to, uint256 _value) private returns (bool) {
        (bool success, bytes memory returnData) = address(_to).call(_payload);
        if (success) {
            uint256 decoded = abi.decode(returnData, (uint256));
            return decoded >= _value ? true : false;
        }
        return false;
    }
}
