// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";
import "@matterlabs/zksync-contracts/l2/system-contracts/SystemContractsCaller.sol";

contract SAccountFactory {
    bytes32 public BytecodeHash;

    constructor(bytes32 _bytecodeHash) {
        BytecodeHash = _bytecodeHash;
    }

    function deployAccount(bytes32 salt, address owner)
        external
        returns (address accountAddress)
    {
        bytes memory returnData = SystemContractsCaller.systemCall(
            uint32(gasleft()),
            address(DEPLOYER_SYSTEM_CONTRACT),
            0,
            abi.encodeCall(
                DEPLOYER_SYSTEM_CONTRACT.create2Account,
                (salt, BytecodeHash, abi.encode(owner))
            )
        );

        (accountAddress, ) = abi.decode(returnData, (address, bytes));
    }
}
