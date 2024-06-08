// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// @dev Remove the console import if you don't want to use it
import "hardhat/console.sol";

/**
 * @title Greeter
 * @author @tom_hirst
 * @notice Simple contract to demonstrate basic Solidity features
 */
contract Greeter {
    /**
     * @dev Stores a greeting string
     */
    string greeting;
    mapping (address => uint256) balances;


    /**
     * @dev Constructor sets the greeting string
     * @param _greeting The greeting string to store
     */
    constructor(string memory _greeting) {
        // @dev Remove the console log if you don't want to use it
        console.log("Deploying a Greeter with greeting:", _greeting);

        greeting = _greeting;
    }

    /**
     * @dev Returns the greeting string
     * @return The greeting string
     */
    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    /**
     * @dev Sets the greeting string
     * @param _greeting The greeting string to store
     */
    function setGreeting(string memory _greeting) public {
        // @dev Remove the console log if you don't want to use it
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);

        greeting = _greeting;
    }

    function payMe() external payable {
        require((msg.value>0.1 ether), "This is an error");
        balances[msg.sender] = balances[msg.sender] + msg.value;
    } 
}
