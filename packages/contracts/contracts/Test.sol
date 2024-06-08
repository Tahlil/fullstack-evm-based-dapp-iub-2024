// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
interface AnotherContractInterface {
    function getValue() external view returns (uint256);
    function setValue(uint256 newValue) external;
}

contract MyContract {
    event ContractDeployed(address indexed deployedAddress);

    function deployAnotherContract() external returns (address) {
        AnotherContract newContract = new AnotherContract();
        emit ContractDeployed(address(newContract));
        return address(newContract);
    }

    function deployERC20() external returns (address) {
        MyToken newToken = new MyToken();
        emit ContractDeployed(address(newToken));
        return address(newToken);
    }

    function getEthersBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function callGetValueFunction(address _contractAddress) external view returns (uint256) {
        AnotherContractInterface anotherContract = AnotherContractInterface(_contractAddress);
        return anotherContract.getValue();
    }

    function callSetValueFunction(address _contractAddress, uint256 newValue) external {
        AnotherContractInterface anotherContract = AnotherContractInterface(_contractAddress);
        anotherContract.setValue(newValue);
    }
}

contract AnotherContract {
    uint256 private storedValue;

    function getValue() external view returns (uint256) {
        return storedValue;
    }

    function setValue(uint256 newValue) external {
        storedValue = newValue;
    }
}