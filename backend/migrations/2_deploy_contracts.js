const TeaProduct = artifacts.require("TeaProduct");

module.exports = function (deployer) {
  // Deploy the TeaProduct contract
  deployer.deploy(TeaProduct);
};
