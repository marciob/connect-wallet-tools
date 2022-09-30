const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

async function main() {
  const hiHello = await ethers.getContractFactory("HiHello");

  const deployedHiHelloContract = await hiHello.deploy();

  await deployedHiHelloContract.deployed();

  console.log("Verify ERC20 Address:", deployedHiHelloContract.address);

  console.log("Waiting for Etherscan verification.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployedHiHelloContract.address,
    constructorArguments: [],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//npx hardhat compile
//npx hardhat run scripts/deploy.js --network goerli
