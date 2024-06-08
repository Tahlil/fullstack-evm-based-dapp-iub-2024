import { ethers, network } from "hardhat";
import fs from 'fs';
import path from 'path';
import { Greeter } from "../typechain-types";
import { NetworkConfig } from "hardhat/types";


const contractDetailsDataPath = path.join(__dirname, "../", "../", "app", "app", "contractInfo", "contractDetails.json");
const abiDetailsDataPath = path.join(__dirname, "../", "../", "app", "app", "abi", "abi.json");
const abiPath = path.join(__dirname, "../", "artifacts", "contracts", "Greeter.sol", "Greeter.json");


const abiRead = fs.readFileSync(abiPath, 'utf8');

const chainIdToExplorer: { [key: number]: string } = {
  59141: "https://sepolia.lineascan.build/address/",
  0: "Unknown/"
}

async function main() {
  const networkConfig: NetworkConfig = network.config;
  const jsonObject = {contractAddress: "", explorerLink: ""}
  const greeting = "Hello, world!";
  const greeter: Greeter = await ethers.deployContract("Greeter", [
    greeting
  ]);
 
  await greeter.waitForDeployment();
  console.log(
    `Greeter with greeting "${greeting}" deployed to ${greeter.target}`,
  );

  jsonObject.contractAddress = greeter.target+"";
  jsonObject.explorerLink = `${chainIdToExplorer[networkConfig.chainId ?? 0]}${greeter.target}`;
  const abiObject = JSON.parse(abiRead).abi;
  const updatedJsonData = JSON.stringify(jsonObject, null, 2);
  const abiObjectData = JSON.stringify(abiObject, null, 2);
  fs.writeFileSync(abiDetailsDataPath, abiObjectData, 'utf8');
  fs.writeFileSync(contractDetailsDataPath, updatedJsonData, 'utf8');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
