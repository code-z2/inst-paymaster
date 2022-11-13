// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";
import "@matterlabs/zksync-contracts/l2/system-contracts/SystemContractsCaller.sol";
import "./PaymasterFactoryStorage.sol";

contract SPaymasterFactory {
    bytes32 public BytecodeHash;
    SPaymasterStorage paymasterStorage;

    /**
     * @notice creates new instance of paymasterStorage at factory creation time (see IPaymasterStorage.sol)
     */
    constructor(bytes32 _bytecodeHash) {
        BytecodeHash = _bytecodeHash;
        paymasterStorage = new SPaymasterStorage();
    }

    /**
     * @notice This function uses Create2 to deploy a paymaster contract
     * @dev uses SystemcontractCaller makes a call to the DEPLOYER_SYSTEM_CONTRACT and deploys paymaster contract with bytecode (BytecodeHash).
     * @param salt - create2 salt
     * @param owner - deployer address or whomever will be assumed paymaster owner
     * @param metadata - metadata to be passed to PaymasterStorage
     * @param maxNonce - used in Paymaster to allow paymaster useable by only new wallets
     * @param useCustomToken - tells paymaster an ERC20 should be used for Validation (see Paymaster.sol)
     * @param amount - (optional) tells paymaster to require to hold x amount of ERCX token
     * @param validationAddress - ERC20 Fee reciever. A specific address that should hold high level paymaster roles (e.g protocol governance contract)
     */
    function deployPaymaster(
        // used in create2
        bytes32 salt,
        address owner,
        // used in paymasterStorage
        bytes memory metadata,
        // parsed to paymaster constructor
        uint64 maxNonce,
        bool useCustomToken,
        address tokenAddress,
        uint192 amount,
        address validationAddress
    ) external returns (address accountAddress) {
        bytes memory returnData = SystemContractsCaller.systemCall(
            uint32(gasleft()),
            address(DEPLOYER_SYSTEM_CONTRACT),
            0,
            abi.encodeCall(
                DEPLOYER_SYSTEM_CONTRACT.create2,
                (
                    salt,
                    BytecodeHash,
                    abi.encode(
                        owner,
                        maxNonce,
                        useCustomToken,
                        tokenAddress,
                        amount,
                        validationAddress
                    )
                )
            )
        );

        (accountAddress, ) = abi.decode(returnData, (address, bytes));
        storePaymaster(owner, accountAddress, metadata);
    }

    function storePaymaster(
        address owner,
        address paymasterAddr,
        bytes memory metadata
    ) internal {
        paymasterStorage.storePaymaster(owner, paymasterAddr, metadata);
    }

    function getStorageAddress() public view returns (address) {
        return address(paymasterStorage);
    }
}
