// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import {ExecutionResult} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymaster.sol";
import {IPaymasterFlow} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymasterFlow.sol";
import {TransactionHelper, Transaction} from "@matterlabs/zksync-contracts/l2/system-contracts/TransactionHelper.sol";

import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";

import "./interface/IPaymaster.sol";

/**
 * @title Paymaster Contract
 * @notice handles custom logic for Account Abstraction Paymaster
 */
contract SPaymaster is ISPaymaster {
    struct PaymasterParams {
        address owner;
        uint64 maxNonce;
        uint192 amount;
        bool useCustomToken;
        address tokenAddress;
        address validationAddress;
    }

    PaymasterParams private params;

    // x amount of ERC20 that can be used instead of eth as gas fees
    uint256 public ERC20_PRICE_FOR_PAYING_FEES = 1;

    // @notice see (factory/PaymasterFactory.sol)
    constructor(
        address _owner, // deployer address
        uint64 _maxNonce,
        bool _useCustomToken,
        address _tokenAddress,
        uint192 _amount,
        address _validationAddress // protocol address (for future modifications where governance may be used to halt paymaster) possibly, validationAddress (VA) can have high level roles
    ) {
        params = PaymasterParams({
            owner: _owner,
            maxNonce: _maxNonce,
            amount: _amount,
            useCustomToken: _useCustomToken,
            tokenAddress: _tokenAddress,
            validationAddress: _validationAddress
        });
    }

    modifier onlyBootloader() {
        require(
            msg.sender == BOOTLOADER_FORMAL_ADDRESS,
            "Only bootloader can call this method"
        );
        // Continure execution if called from the bootloader.
        _;
    }

    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader returns (bytes memory context) {
        // Transaction validation logic goes here
        require(
            _transaction.paymasterInput.length >= 4,
            "The standard paymaster input must be at least 4 bytes long"
        );

        bytes4 paymasterInputSelector = bytes4(
            _transaction.paymasterInput[0:4]
        );
        if (paymasterInputSelector == IPaymasterFlow.approvalBased.selector) {
            (address token, uint256 minAllowance, bytes memory data) = abi
                .decode(
                    _transaction.paymasterInput[4:],
                    (address, uint256, bytes)
                );

            address callerAddress = address(uint160(_transaction.from));
            address addressThis = address(this);

            // Note, that while the minimal amount of ETH needed is tx.ergsPrice * tx.ergsLimit,
            // neither paymaster nor account are allowed to access this context variable.
            uint256 requiredETH = _transaction.ergsLimit *
                _transaction.maxFeePerErg;

            // start modified logic
            if (params.useCustomToken) {
                // if useCustom == true: proceed else just charge the contract
                require(
                    params.tokenAddress != address(0), // global token must be valid
                    "Custom Token must be provided"
                );
                require(token == params.tokenAddress, "Invalid token"); // user provided token must match global token
                require(minAllowance >= 1, "Min allowance too low"); // probably useless, or check against ERC20_PRICE_FOR_PAYING_FEES instead
                if (params.amount >= 1) {
                    // satisfaction must be reached
                    require(
                        _satisfiedTokenRequirements(callerAddress),
                        "user not eligible to use this paymaster"
                    );
                    if (params.validationAddress == address(0)) {
                        // will fail if params.tokenaddress == erc721
                        // if params.tokenaddress == erc721, consider setting a validation address.
                        _chargeERC20FeeFromAddress(callerAddress, addressThis);
                        _chargeEthFeeFromContract(requiredETH);
                    } else {
                        _chargeERC20FeeFromAddress(
                            callerAddress,
                            params.validationAddress
                        );
                        _chargeEthFeeFromContract(requiredETH);
                    }
                } else {
                    // satisfaction is not required
                    if (params.validationAddress == address(0)) {
                        // same logic as above
                        _chargeERC20FeeFromAddress(callerAddress, addressThis);
                        _chargeEthFeeFromContract(requiredETH);
                    } else {
                        _chargeERC20FeeFromAddress(
                            callerAddress,
                            params.validationAddress
                        );
                        _chargeEthFeeFromContract(requiredETH);
                    }
                }
            } else {
                _chargeEthFeeFromContract(requiredETH);
            }
            // end modified logic
        } else {
            revert("Unsupported paymaster flow");
        }
    }

    //
    // validation functions
    //

    /**
     * @notice checks for ERC20 allowance of address (_addressToCheck)
     * @param _addressToCheck - AA wallet address
     * @return uint256 - allowance
     */
    function _checkAllowance(address _addressToCheck)
        internal
        view
        returns (uint256)
    {
        // checck allowance logic
        uint256 providedAllowance = IERC20(params.tokenAddress).allowance(
            _addressToCheck,
            address(this)
        );
        return providedAllowance;
    }

    function satisfiedTokenrequirements(address addressToSatisfy)
        external
        payable
    {
        _satisfiedTokenRequirements(addressToSatisfy);
    }

    /**
     * @notice satisfies that (caller) holds x required amount of ERC(X) token before paying for (caller)
     * @param _addressToSatisfy - AA Wallet to satisfy
     * @return bool - true/false
     */
    function _satisfiedTokenRequirements(address _addressToSatisfy)
        internal
        view
        returns (bool)
    {
        // satisfy that an address holds the required token of amount x
        // checks if token is erc20 or erc721
        // note the surported token should implement ERC165
        // whether true or false user must hold the token before paymaster proceeds except the amount == 0
        // if does not support erc721 then assume its erc20 and allow transactions fail (bad approach)

        bool isERC721 = IERC165(params.tokenAddress).supportsInterface(
            type(IERC721).interfaceId
        );

        if (!isERC721) {
            // if is erc20, then the caller must satisfy.
            require(
                IERC20(params.tokenAddress).balanceOf(_addressToSatisfy) >=
                    params.amount,
                "address does not satisy paymaster conditions"
            );
            return true;
        } else if (isERC721) {
            // if is erc721, then the caller must satisfy.
            require(
                IERC721(params.tokenAddress).balanceOf(_addressToSatisfy) >= 1,
                "address does not satisy paymaster conditions"
            );
            return true;
        }
        return false;
    }

    //
    // debit and money handling functions
    //

    /**
     * @notice transfers gas fee required for transaction to the BOOTLOADER
     * @param _requiredETH - amount of eth required for transaction
     */
    function _chargeEthFeeFromContract(uint256 _requiredETH) internal {
        // debit paymaster logic
        (bool success, ) = payable(BOOTLOADER_FORMAL_ADDRESS).call{
            value: _requiredETH
        }("");
        require(success, "Failed to transfer funds to the bootloader");
    }

    /**
     * @dev - checks (caller) allowance and transfers ERC20_PRICE_FOR_PAYING_FEES amount of ERC20 to (_addrToCharge)
     * @param _addrToCharge - ERC20 Fee reciever
     * @return success - true/false
     */
    function _chargeERC20FeeFromAddress(address _addrToCharge, address _to)
        internal
        returns (bool success)
    {
        // check allowance and charge addrToCharge corresponding ERC20 tokens
        require(
            _checkAllowance(_addrToCharge) >= ERC20_PRICE_FOR_PAYING_FEES,
            "The user did not provide enough allowance"
        );
        success = IERC20(params.tokenAddress).transferFrom(
            _addrToCharge,
            _to,
            ERC20_PRICE_FOR_PAYING_FEES
        );
    }

    //
    // risky update functions
    //

    /**
     * @notice can only be called by the deployer - updates the ERC20_PRICE_FOR_PAYING_FEES
     * in the future might allow only the validation address to have this priviledge
     * @param newPrice - updated ERC20_PRICE_FOR_PAYING_FEES
     */
    function updateERC20Fee(uint256 newPrice) public {
        require(
            msg.sender == params.owner, // may refactor to allow validation address to change fee
            "only paymaster creator can change ERC20Fee"
        );
        ERC20_PRICE_FOR_PAYING_FEES = newPrice;
    }

    // can be implemented if need be
    // function updateInternalPaymasterParams(
    //     uint64 maxNonce,
    //     uint192 amount,
    //     bool useCustomToken,
    //     address tokenAddress,
    //     address newValidationAddress
    // ) public {
    //     address currentValidationAddress = params.validationAddress;
    //     require(
    //         msg.sender == params.owner ||
    //             msg.sender == currentValidationAddress, // only VA or owner can modify params
    //         "only paymaster creator can change ERC20Fee"
    //     );
    //     params = PaymasterParams(
    //         params.owner,
    //         maxNonce,
    //         amount,
    //         useCustomToken,
    //         tokenAddress,
    //         newValidationAddress
    //     );
    // }

    function postOp(
        bytes calldata _context,
        Transaction calldata _transaction,
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        ExecutionResult _txResult,
        uint256 _maxRefundedErgs
    ) external payable onlyBootloader {
        // This contract does not support any refunding logic
    }

    function supportsInterface(bytes4 interfaceId)
        external
        pure
        returns (bool)
    {
        return interfaceId == type(ISPaymaster).interfaceId;
    }

    receive() external payable {}
}
