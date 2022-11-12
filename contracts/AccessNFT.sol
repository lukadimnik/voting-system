// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AccessNft is ERC721 {
    constructor() ERC721("Doggie", "DOG") {}
}
