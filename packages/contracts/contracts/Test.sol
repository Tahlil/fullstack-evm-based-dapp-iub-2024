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
    // Struct definition
    struct MyStruct {
        uint256 id;
        string name;
    }
    
    // Array of struct
    MyStruct[] public arrayOfStructs;

    // Mapping of address to struct
    mapping(address => MyStruct) public addressToStruct;

    // Array in struct
    struct StructWithArray {
        uint256 id;
        string[] names;
    }

    // Mapping of uint to struct that has an array type
    mapping(uint256 => StructWithArray) public uintToStructWithArray;

    // Mapping of uint to array
    mapping(uint256 => uint256[]) public uintToArray;
     // Two-dimensional mapping
    mapping(uint256 => mapping(uint256 => uint256)) public twoDimensionalMapping;


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

    // Add a new entry to array of struct
    function addToArrayOfStructs(uint256 _id, string memory _name) external {
        MyStruct memory newStruct = MyStruct(_id, _name);
        arrayOfStructs.push(newStruct);
    }

    // Get an entry from array of struct
    function getFromArrayOfStructs(uint256 index) external view returns (uint256, string memory) {
        require(index < arrayOfStructs.length, "Index out of bounds");
        MyStruct memory retrievedStruct = arrayOfStructs[index];
        return (retrievedStruct.id, retrievedStruct.name);
    }

    // Delete an entry from array of struct
    function deleteFromArrayOfStructs(uint256 index) external {
        require(index < arrayOfStructs.length, "Index out of bounds");
        delete arrayOfStructs[index];
    }

    // Add a new entry to mapping of address to struct
    function addToAddressToStruct(address _address, uint256 _id, string memory _name) external {
        addressToStruct[_address] = MyStruct(_id, _name);
    }

    // Get an entry from mapping of address to struct
    function getFromAddressToStruct(address _address) external view returns (uint256, string memory) {
        MyStruct memory retrievedStruct = addressToStruct[_address];
        return (retrievedStruct.id, retrievedStruct.name);
    }

    // Delete an entry from mapping of address to struct
    function deleteFromAddressToStruct(address _address) external {
        delete addressToStruct[_address];
    }

    // Add a new entry to mapping of uint to struct that has an array type
    function addToUintToStructWithArray(uint256 _id, uint256 _subId, string memory _name) external {
        uintToStructWithArray[_id].id = _subId;
        uintToStructWithArray[_id].names.push(_name);
    }

    // Get an entry from mapping of uint to struct that has an array type
    function getFromUintToStructWithArray(uint256 _id) external view returns (uint256, string[] memory) {
        return (uintToStructWithArray[_id].id, uintToStructWithArray[_id].names);
    }

    // Delete an entry from mapping of uint to struct that has an array type
    function deleteFromUintToStructWithArray(uint256 _id) external {
        delete uintToStructWithArray[_id];
    }

    // Add a new entry to mapping of uint to array
    function addToUintToArray(uint256 _id, uint256 _value) external {
        uintToArray[_id].push(_value);
    }

    // Get an entry from mapping of uint to array
    function getFromUintToArray(uint256 _id, uint256 index) external view returns (uint256) {
        require(index < uintToArray[_id].length, "Index out of bounds");
        return uintToArray[_id][index];
    }

    // Delete an entry from mapping of uint to array
    function deleteFromUintToArray(uint256 _id, uint256 index) external {
        require(index < uintToArray[_id].length, "Index out of bounds");
        delete uintToArray[_id][index];
    }

     // Add a new entry to the two-dimensional mapping
    function addToTwoDimensionalMapping(uint256 _key1, uint256 _key2, uint256 _value) external {
        twoDimensionalMapping[_key1][_key2] = _value;
    }

    // Get an entry from the two-dimensional mapping
    function getFromTwoDimensionalMapping(uint256 _key1, uint256 _key2) external view returns (uint256) {
        return twoDimensionalMapping[_key1][_key2];
    }

    // Delete an entry from the two-dimensional mapping
    function deleteFromTwoDimensionalMapping(uint256 _key1, uint256 _key2) external {
        delete twoDimensionalMapping[_key1][_key2];
    }

    receive() external payable {
        // Receive ether
    }

    // Send ether from contract to address
    function sendEther(address payable _to, uint256 _amount) external {
        require(address(this).balance >= _amount, "Insufficient balance");
        _to.transfer(_amount);
    }

    // Send ether from caller to address
    function sendEtherFromCaller(address payable _to, uint256 _amount) external payable {
        require(msg.value >= _amount, "Insufficient ether sent");
        _to.transfer(_amount);
    }

    // Send ERC20 tokens to contract
    function sendERC20(address _tokenAddress, uint256 _amount) external {
        IERC20 token = IERC20(_tokenAddress);
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
    }

    // Send ERC20 tokens from contract to address
    function sendERC20To(address _tokenAddress, address _to, uint256 _amount) external {
        IERC20 token = IERC20(_tokenAddress);
        require(token.transfer(_to, _amount), "Transfer failed");
    }

    // Send ERC20 tokens from caller to address
    function sendERC20FromCaller(address _tokenAddress, address _to, uint256 _amount) external {
        IERC20 token = IERC20(_tokenAddress);
        require(token.transferFrom(msg.sender, _to, _amount), "Transfer failed");
    }

    // Check effect interaction pattern
    mapping(address => uint256) public balances;
    mapping(address => bool) public claimed;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Transfer failed");
    }

    function claim() external {
        require(!claimed[msg.sender], "Already claimed");
        claimed[msg.sender] = true;
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
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