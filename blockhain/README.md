# ALVChain Solidity Contracts

This directory contains Solidity smart contracts used by ALVChain.

## Included Contracts

- `alv.sol`: existing banking/loan workflow contract.
- `contracts/ALVAssetNFT.sol`: ERC-721 token contract for mintable asset NFTs.
- `contracts/ALVIdentityBadge.sol`: ERC-721 identity badge contract (one badge per address).

## Notes

- ERC-721 contracts import OpenZeppelin standard libraries.
- Compiler target in these contracts is Solidity `^0.8.20`.
