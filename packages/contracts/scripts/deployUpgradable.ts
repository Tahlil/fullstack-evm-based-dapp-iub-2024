import { ethers, upgrades } from "hardhat";

async function main() {
  const MyImplementation = await ethers.getContractFactory("MyImplementation");
  console.log(process.env.WALLET_ADDRESS);
  
  const proxy = await upgrades.deployProxy(MyImplementation, [process.env.WALLET_ADDRESS], {kind: "uups"});

  await proxy.waitForDeployment();

  console.log("Proxy deployed to:", proxy.target);
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxy.target+"");
  console.log("Implementation deployed to:", implementationAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
