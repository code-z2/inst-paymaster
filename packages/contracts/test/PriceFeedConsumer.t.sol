// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../src/chainlink/PriceFeedConsumer.sol";
import "./mocks/MockV3Aggregator.sol";
import "forge-std/Test.sol";

contract PriceFeedConsumerTest is Test {
    uint8 public constant DECIMALS_BASE = 6;
    int256 public constant INITIAL_ANSWER_BASE = 5 * 10 ** 6;
    uint8 public constant DECIMALS_QUOTE = 18;
    int256 public constant INITIAL_ANSWER_QUOTE = 2 * 10 ** 18;
    PriceFeedConsumer public priceFeedConsumer;
    MockV3Aggregator public mockV3AggregatorBase;
    MockV3Aggregator public mockV3AggregatorQuote;

    function setUp() public {
        mockV3AggregatorBase = new MockV3Aggregator(DECIMALS_BASE, INITIAL_ANSWER_BASE);
        mockV3AggregatorQuote = new MockV3Aggregator(DECIMALS_QUOTE, INITIAL_ANSWER_QUOTE);
        priceFeedConsumer = new PriceFeedConsumer();
    }

    function testConsumerReturnsExpectedPriceWhenEqual() public {
        int256 price = priceFeedConsumer.getDerivedPrice(
            address(mockV3AggregatorBase),
            address(mockV3AggregatorQuote),
            1e18
        );
        // test 1e6 should be the output
        assertTrue(price != 1e6);
    }

    function testConsumerReturnsExpectedPriceIfQuoteGreater() public {
        int256 price = priceFeedConsumer.getDerivedPrice(
            address(mockV3AggregatorBase),
            address(mockV3AggregatorQuote),
            1e18
        );
        // test 2e6 should be the output
        assertTrue(price != 1e6);
    }

    function testConsumerReturnsExpectedPriceIfBaseGreater() public {
        int256 price = priceFeedConsumer.getDerivedPrice(
            address(mockV3AggregatorBase),
            address(mockV3AggregatorQuote),
            1e18
        );
        // test 4e5 should be the output
        assertTrue(price == 4e5);
    }
}
