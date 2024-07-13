import { ethers, upgrades } from "hardhat";

async function main() {
  const proxyAddress = "0xdCd0A5579029Eab1062Fce4557694187fF2AC649"; // Replace with the deployed proxy address
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
