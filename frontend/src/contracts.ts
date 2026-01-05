import InvoiceNFTABI from './abis/InvoiceNFT.json'
import MarketplaceABI from './abis/Marketplace.json'

export const InvoiceNFTAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
export const MarketplaceAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"

export const InvoiceNFTConfig = {
    address: InvoiceNFTAddress as `0x${string}`,
    abi: (InvoiceNFTABI as any).abi,
}

export const MarketplaceConfig = {
    address: MarketplaceAddress as `0x${string}`,
    abi: (MarketplaceABI as any).abi,
}
