// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyImplementationV2 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 public value;

    function initialize() public initializer {
    }

    function setValue(uint256 _value) public {
        value = _value + 1; // New logic: increment the value by 1
    }

    function newFunction() public pure returns (string memory) {
        return "New Functionality";
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}