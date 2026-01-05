import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Marketplace", function () {
    async function deployMarketplaceFixture() {
        const [owner, otherAccount, investor] = await ethers.getSigners();

        const InvoiceNFT = await ethers.getContractFactory("InvoiceNFT");
        const invoiceNFT = await InvoiceNFT.deploy();

        const Marketplace = await ethers.getContractFactory("Marketplace");
        const marketplace = await Marketplace.deploy(await invoiceNFT.getAddress());

        return { invoiceNFT, marketplace, owner, otherAccount, investor };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { invoiceNFT, owner } = await loadFixture(deployMarketplaceFixture);
            expect(await invoiceNFT.owner()).to.equal(owner.address);
        });
    });

    describe("Minting and Listing", function () {
        it("Should mint and list an invoice", async function () {
            const { invoiceNFT, marketplace, owner } = await loadFixture(deployMarketplaceFixture);

            const amount = ethers.parseEther("1");
            const dueDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

            await invoiceNFT.mintInvoice(owner.address, "uri", amount, dueDate);
            const tokenId = 0;

            await invoiceNFT.approve(await marketplace.getAddress(), tokenId);
            await marketplace.listInvoice(tokenId, amount);

            const listing = await marketplace.listings(tokenId);
            expect(listing.price).to.equal(amount);
            expect(listing.active).to.be.true;
        });
    });

    describe("Funding", function () {
        it("Should fund an invoice", async function () {
            const { invoiceNFT, marketplace, owner, investor } = await loadFixture(deployMarketplaceFixture);

            const amount = ethers.parseEther("1");
            const dueDate = Math.floor(Date.now() / 1000) + 3600;

            await invoiceNFT.mintInvoice(owner.address, "uri", amount, dueDate);
            const tokenId = 0;

            await invoiceNFT.approve(await marketplace.getAddress(), tokenId);
            await marketplace.listInvoice(tokenId, amount);

            await marketplace.connect(investor).fundInvoice(tokenId, { value: amount });

            expect(await invoiceNFT.ownerOf(tokenId)).to.equal(investor.address);
            const listing = await marketplace.listings(tokenId);
            expect(listing.active).to.be.false;
        });
    });
});
