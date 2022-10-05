var Greeter = artifacts.require("Greeter");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Greeter);
};