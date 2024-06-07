import { ethers } from "hardhat";
import fs from 'fs';
import path from 'path';
import { Greeter } from "../typechain-types";

const contractDetailsDataPath = path.join(__dirname, "../", "../", "app", "app", "contractInfo", "contractDetails.json");
const abiDetailsDataPath = path.join(__dirname, "../", "../", "app", "app", "abi", "abi.json");
const abiPath = path.join(__dirname, "../", "artifacts", "contracts", "Greeter.sol", "Greeter.json");


const abiRead = fs.readFileSync(abiPath, 'utf8');


async function main() {

  const jsonObject = {contractAddress: ""}
  const greeting = "Hello, world!";
  const greeter: Greeter = await ethers.deployContract("Greeter", [
    greeting
  ]);
  await greeter.waitForDeployment();
  console.log(
    `Greeter with greeting "${greeting}" deployed to ${greeter.target}`,
  );

  jsonObject.contractAddress = greeter.target+"";
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
