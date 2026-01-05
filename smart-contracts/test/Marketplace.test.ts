import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Marketplace", function () {
    async function deployMarketplaceFixture() {
        const [owner, otherAccount, investor1, investor2] = await ethers.getSigners();

        const InvoiceNFT = await ethers.getContractFactory("InvoiceNFT");
        const invoiceNFT = await InvoiceNFT.deploy();

        const Marketplace = await ethers.getContractFactory("Marketplace");
        const marketplace = await Marketplace.deploy(await invoiceNFT.getAddress());

        return { invoiceNFT, marketplace, owner, otherAccount, investor1, investor2 };
    }

    describe("Crowdfunding Flow", function () {
        it("Should execute full flow: List -> Fund -> Repay -> Claim", async function () {
            const { invoiceNFT, marketplace, owner, investor1, investor2 } = await loadFixture(deployMarketplaceFixture);

            const faceValue = ethers.parseEther("1.0");
            const goalAmount = ethers.parseEther("0.85"); // 85% advance
            const returnAmount = ethers.parseEther("1.0"); // Repay full face value
            const dueDate = Math.floor(Date.now() / 1000) + 3600;

            // 1. Mint
            await invoiceNFT.mintInvoice(owner.address, "uri", faceValue, dueDate);
            const tokenId = 0;

            // 2. List
            await invoiceNFT.approve(await marketplace.getAddress(), tokenId);
            await marketplace.listInvoice(tokenId, goalAmount, returnAmount);

            const listing = await marketplace.listings(tokenId);
            expect(listing.goalAmount).to.equal(goalAmount);
            expect(listing.state).to.equal(0); // Active
            expect(await invoiceNFT.ownerOf(tokenId)).to.equal(await marketplace.getAddress()); // NFT locked

            // 3. Partial Fund (Investor 1)
            const contribution1 = ethers.parseEther("0.5");
            await marketplace.connect(investor1).fundInvoice(tokenId, { value: contribution1 });

            expect((await marketplace.listings(tokenId)).currentAmount).to.equal(contribution1);

            // 4. Complete Fund (Investor 2)
            const contribution2 = ethers.parseEther("0.35");
            // Check seller balance change
            await expect(
                marketplace.connect(investor2).fundInvoice(tokenId, { value: contribution2 })
            ).to.changeEtherBalance(owner, goalAmount); // Seller receives total raised

            expect((await marketplace.listings(tokenId)).state).to.equal(1); // Funded

            // 5. Repay
            await expect(
                marketplace.repayInvoice(tokenId, { value: returnAmount })
            ).to.changeEtherBalance(marketplace, returnAmount); // Contract holds repayment

            expect((await marketplace.listings(tokenId)).state).to.equal(2); // Repaid
            expect(await invoiceNFT.ownerOf(tokenId)).to.equal(owner.address); // NFT returned

            // 6. Claim (Investor 1)
            // Share = (0.5 / 0.85) * 1.0 = 0.588235... ETH
            const expectedShare1 = (contribution1 * returnAmount) / goalAmount;
            await expect(
                marketplace.connect(investor1).claimReturns(tokenId)
            ).to.changeEtherBalance(investor1, expectedShare1);

            // 7. Claim (Investor 2)
            const expectedShare2 = (contribution2 * returnAmount) / goalAmount;
            await expect(
                marketplace.connect(investor2).claimReturns(tokenId)
            ).to.changeEtherBalance(investor2, expectedShare2);
        });
    });
});
