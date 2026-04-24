// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ALVIdentityBadge is ERC721, Ownable {
    uint256 private _nextTokenId = 1;
    mapping(address => bool) public hasBadge;

    constructor(address initialOwner)
        ERC721("ALVChain Identity Badge", "ALVID")
        Ownable(initialOwner)
    {}

    function issueBadge(address recipient)
        external
        onlyOwner
        returns (uint256 tokenId)
    {
        require(!hasBadge[recipient], "Recipient already has a badge");

        tokenId = _nextTokenId++;
        hasBadge[recipient] = true;
        _safeMint(recipient, tokenId);
    }
}
