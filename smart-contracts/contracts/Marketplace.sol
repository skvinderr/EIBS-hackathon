// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./InvoiceNFT.sol";

contract Marketplace is ReentrancyGuard {
    struct Listing {
        uint256 tokenId;
        address seller;
        uint256 price;
        bool active;
    }

    InvoiceNFT public invoiceNFT;
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event Funded(uint256 indexed tokenId, address indexed investor, uint256 price);
    event Repaid(uint256 indexed tokenId, address indexed borrower, uint256 amount);

    constructor(address _invoiceNFT) {
        invoiceNFT = InvoiceNFT(_invoiceNFT);
    }

    function listInvoice(uint256 tokenId, uint256 price) external {
        require(invoiceNFT.ownerOf(tokenId) == msg.sender, "Not owner");
        require(invoiceNFT.getApproved(tokenId) == address(this) || invoiceNFT.isApprovedForAll(msg.sender, address(this)), "Not approved");

        listings[tokenId] = Listing({
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            active: true
        });

        emit Listed(tokenId, msg.sender, price);
    }

    function fundInvoice(uint256 tokenId) external payable nonReentrant {
        Listing storage listing = listings[tokenId];
        require(listing.active, "Not active");
        require(msg.value >= listing.price, "Insufficient funds");

        listing.active = false;
        
        // Transfer funds to seller (borrower)
        payable(listing.seller).transfer(listing.price);

        // Transfer NFT to investor
        invoiceNFT.transferFrom(listing.seller, msg.sender, tokenId);

        emit Funded(tokenId, msg.sender, listing.price);
    }

    function repayInvoice(uint256 tokenId) external payable nonReentrant {
        // Borrower repays the invoice amount + interest (simplified here as just repaying to current owner)
        address currentOwner = invoiceNFT.ownerOf(tokenId);
        
        // Transfer repayment to current owner (investor)
        payable(currentOwner).transfer(msg.value);
        
        // Mark invoice as paid in NFT contract
        // Note: Marketplace needs to be authorized or owner of NFT contract to call this if restricted
        // For now, assuming InvoiceNFT allows it or we handle it differently
        // invoiceNFT.markPaid(tokenId); 

        emit Repaid(tokenId, msg.sender, msg.value);
    }
}
