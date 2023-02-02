// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * Network: goerli : future zksync
 * Base: Expected/USD
 * Base Address: 0x...
 * Quote: Eth/USD
 * Quote Address: 0x...
 * Decimals: 8
 * Output: Expected/Eth
 */

contract PriceFeedConsumer {
    //address private _quote = 0xA39434A63A52E749F02807ae27335515BA4b07F7; // to be replaced
    address internal _quotePriceFeed; // to be set later

    function getDerivedPrice(
        address _base,
        address _quote,
        int256 value
    ) public view returns (int256) {
        (, int256 basePrice, , , ) = AggregatorV3Interface(_base).latestRoundData();
        uint8 baseDecimals = AggregatorV3Interface(_base).decimals();
        int256 decimals = int256(10 ** uint256(baseDecimals));

        (, int256 quotePrice, , , ) = AggregatorV3Interface(_quote).latestRoundData();
        uint8 quoteDecimals = AggregatorV3Interface(_quote).decimals();
        quotePrice = scalePrice(quotePrice, quoteDecimals, baseDecimals);
        // todo this is confusing. need to make the maths accurate.
        // explanation
        // i get the price of the token and place it basePrice
        // the decimal of the token is baseDecimals
        // i get the quote and place it in quotePrice
        // the decimals in quote decimals

        // there can be an issue where the decimals of the quote token is not the same with the base token
        // so i scale quote token to match the decimal of the base token

        // issue
        // i want to get the base token equivalent of value
        // e.g basePrice (link) 5$
        // quotePrice (eth) 100$
        // value = 5eth
        // how do i get 5eth worth of link?

        int256 expectedValue = (scalePrice(value, quoteDecimals, baseDecimals) * decimals) /
            quotePrice;
        return expectedValue / (basePrice * decimals) / quotePrice;
    }

    function scalePrice(
        int256 _price,
        uint8 _priceDecimals,
        uint8 _decimals
    ) internal pure returns (int256) {
        if (_priceDecimals < _decimals) {
            return _price * int256(10 ** uint256(_decimals - _priceDecimals));
        } else if (_priceDecimals > _decimals) {
            return _price / int256(10 ** uint256(_priceDecimals - _decimals));
        }
        return _price;
    }
}
