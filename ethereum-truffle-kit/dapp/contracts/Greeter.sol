// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

/// @title Greeter contract
/// @author Govind Thange
/// @notice The 1st DApp contract w/ a greeting message!
contract Greeter {
    string greeting = "Hello World!";

    /// @dev Update the greeting message
    /// @param _greeting is the updated message
    function set(string memory _greeting) public {
        greeting = _greeting;
    }

    /// @dev Retrieve the stored value of greeting
    /// @return the greeting message
    function get() public view returns (string memory) {
        return greeting;
    }
}