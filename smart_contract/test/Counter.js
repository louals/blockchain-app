const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  let counter;

  beforeEach(async function () {
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    await counter.deployed();
  });

  it("should start at 0", async function () {
    expect(await counter.count()).to.equal(0);
  });

  it("should increment", async function () {
    await counter.increment();
    expect(await counter.count()).to.equal(1);
  });

  it("should decrement", async function () {
    await counter.increment();
    await counter.decrement();
    expect(await counter.count()).to.equal(0);
  });
});
