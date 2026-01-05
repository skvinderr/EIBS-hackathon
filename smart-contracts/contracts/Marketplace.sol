// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./InvoiceNFT.sol";

contract Marketplace is ReentrancyGuard {
    enum ListingState { Active, Funded, Repaid }

    struct Listing {
        address seller;
        uint256 goalAmount;     // Amount to raise (e.g. 85% of face value)
        uint256 currentAmount;  // Amount raised so far
        uint256 returnAmount;   // Amount to be repaid (e.g. 100% face value)
        ListingState state;
    }

    InvoiceNFT public invoiceNFT;
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => mapping(address => uint256)) public investments; // tokenId -> investor -> amount

    event Listed(uint256 indexed tokenId, address indexed seller, uint256 goalAmount, uint256 returnAmount);
    event Funded(uint256 indexed tokenId, address indexed investor, uint256 amount);
    event Repaid(uint256 indexed tokenId, uint256 amount);
    event Claimed(uint256 indexed tokenId, address indexed investor, uint256 amount);

    constructor(address _invoiceNFT) {
        invoiceNFT = InvoiceNFT(_invoiceNFT);
    }

    function listInvoice(uint256 tokenId, uint256 goalAmount, uint256 returnAmount) external {
        require(invoiceNFT.ownerOf(tokenId) == msg.sender, "Not owner");
        require(
            invoiceNFT.getApproved(tokenId) == address(this) || 
            invoiceNFT.isApprovedForAll(msg.sender, address(this)), 
            "Not approved"
        );
        require(goalAmount > 0 && returnAmount >= goalAmount, "Invalid amounts");

        // Transfer NFT to marketplace to lock it during funding/repayment
        invoiceNFT.transferFrom(msg.sender, address(this), tokenId);

        listings[tokenId] = Listing({
            seller: msg.sender,
            goalAmount: goalAmount,
            currentAmount: 0,
            returnAmount: returnAmount,
            state: ListingState.Active
        });

        emit Listed(tokenId, msg.sender, goalAmount, returnAmount);
    }

    function fundInvoice(uint256 tokenId) external payable nonReentrant {
        Listing storage listing = listings[tokenId];
        require(listing.state == ListingState.Active, "Not active");
        require(listing.currentAmount + msg.value <= listing.goalAmount, "Overfunded");
        require(msg.value > 0, "Amount must be > 0");

        investments[tokenId][msg.sender] += msg.value;
        listing.currentAmount += msg.value;

        emit Funded(tokenId, msg.sender, msg.value);

        if (listing.currentAmount == listing.goalAmount) {
            listing.state = ListingState.Funded;
            // Transfer raised funds to seller
            payable(listing.seller).transfer(listing.currentAmount);
        }
    }

    function repayInvoice(uint256 tokenId) external payable nonReentrant {
        Listing storage listing = listings[tokenId];
        require(listing.state == ListingState.Funded, "Not funded");
        require(msg.value == listing.returnAmount, "Incorrect repayment amount");

        listing.state = ListingState.Repaid;
        
        // Return NFT to seller as the invoice is settled
        invoiceNFT.transferFrom(address(this), listing.seller, tokenId);
        
        // Mark as paid in NFT contract (optional, for metadata consistency)
        try invoiceNFT.markPaid(tokenId) {} catch {}

        emit Repaid(tokenId, msg.value);
    }

    function claimReturns(uint256 tokenId) external nonReentrant {
        Listing storage listing = listings[tokenId];
        require(listing.state == ListingState.Repaid, "Not repaid");
        
        uint256 invested = investments[tokenId][msg.sender];
        require(invested > 0, "No investment found");

        investments[tokenId][msg.sender] = 0; // Prevent re-entrancy

        // Calculate share: (invested / goalAmount) * returnAmount
        uint256 share = (invested * listing.returnAmount) / listing.goalAmount;

        payable(msg.sender).transfer(share);
        emit Claimed(tokenId, msg.sender, share);
    }
    
    // Helper to get listing details
    function getListing(uint256 tokenId) external view returns (Listing memory) {
        return listings[tokenId];
    }
}
