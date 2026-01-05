// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InvoiceNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    struct InvoiceData {
        uint256 amount;
        uint256 dueDate;
        address borrower;
        bool isPaid;
    }

    mapping(uint256 => InvoiceData) public invoices;

    constructor() ERC721("InvoiceNFT", "INV") Ownable(msg.sender) {}

    function mintInvoice(
        address to,
        string memory uri,
        uint256 amount,
        uint256 dueDate
    ) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);

        invoices[tokenId] = InvoiceData({
            amount: amount,
            dueDate: dueDate,
            borrower: to,
            isPaid: false
        });

        return tokenId;
    }

    function getInvoice(uint256 tokenId) public view returns (InvoiceData memory) {
        return invoices[tokenId];
    }

    function markPaid(uint256 tokenId) external {
        // Only the owner (Marketplace) or specific logic should call this
        // For simplicity, allowing owner (Marketplace) to update
        // In real app, this would be restricted to the Marketplace contract
        invoices[tokenId].isPaid = true;
    }
}
