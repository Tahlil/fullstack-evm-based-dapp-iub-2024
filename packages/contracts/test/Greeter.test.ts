import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Greeter", function () {
  // This fixture deploys the contract and returns it
  const deploy = async () => {
    const [owner, ...otherAccounts] = await ethers.getSigners();

    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello world!");

    return { greeter, owner };
  };

  it("Should deploy with the right greeting", async function () {
    const { greeter } = await loadFixture(deploy);
    expect(await greeter.getGreeting()).to.equal("Hello world!");
  });

  it("Should return the new greeting once it's changed", async function () {
    const { greeter } = await loadFixture(deploy);
    await greeter.setGreeting("Hey there!");
    expect(await greeter.getGreeting()).to.equal("Hey there!");
  });

  it("Send ether to payment function", async function () {
    const { greeter, owner } = await loadFixture(deploy);
    const payMeTx = await greeter.connect(owner).payMe({
      value: ethers.parseEther("0.2")
    });
    await payMeTx.wait();
    const balance = Number(await ethers.provider.getBalance(greeter.target))
    expect(ethers.formatEther(balance+"") == "0.2");
  });
});
