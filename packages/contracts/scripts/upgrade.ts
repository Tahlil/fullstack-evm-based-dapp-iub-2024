import { ethers, upgrades } from "hardhat";

async function main() {
  const proxyAddress = "0x85b1f032d263457587aD3EeCd7b5DD51F73F2d38"; // Replace with the deployed proxy address
  const MyImplementationV2 = await ethers.getContractFactory("MyImplementationV2");
  console.log("Upgrading...");
  await upgrades.upgradeProxy(proxyAddress, MyImplementationV2, {redeployImplementation: 'always', kind: "uups"});
  console.log("V1 Upgraded to V2");
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress+"");
  console.log("New Implementation (V2) deployed to:", implementationAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
