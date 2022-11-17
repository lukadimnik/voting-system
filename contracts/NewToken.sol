// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract NewToken is ERC20 {
  constructor(uint256 initalSupply) ERC20('SimpleToken', 'ST') {
    _mint(msg.sender, initalSupply);
  }
}
