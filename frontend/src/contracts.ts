import InvoiceNFTABI from './abis/InvoiceNFT.json'
import MarketplaceABI from './abis/Marketplace.json'

export const InvoiceNFTAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
export const MarketplaceAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

export const InvoiceNFTConfig = {
    address: InvoiceNFTAddress as `0x${string}`,
    abi: InvoiceNFTABI,
}

export const MarketplaceConfig = {
    address: MarketplaceAddress as `0x${string}`,
    abi: MarketplaceABI,
}
