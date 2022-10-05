const Greeter = artifacts.require("Greeter");
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Greeter", function (/* accounts */) {
  it("should return 'Hello World!'", async function () {
    const instance = await Greeter.deployed();
    const response = await instance.get();
    assert.equal(response, "Hello World!");
  });

  it("should change the greeting message", async function () {
    const instance = await Greeter.deployed();
    const msg = "Welcome to blockchain world!";
    await instance.set(msg);
    const response = await instance.get();
    assert.equal(response, msg);
  });
});
