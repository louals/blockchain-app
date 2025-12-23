
require("@nomiclabs/hardhat-ethers");
// 
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.28", 
  networks: {
    sepolia: {
      url:"https://eth-sepolia.g.alchemy.com/v2/S2hcA6q_z4gRmVDio34gh",
      accounts:['12197ec3a66fe685b16760eecb73fe80924bf6dde1523ca10a9c98322adafc99']
    }
  }
};
