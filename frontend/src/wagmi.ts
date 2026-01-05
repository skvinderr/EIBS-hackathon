import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, polygon, hardhat } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
    chains: [hardhat, mainnet, sepolia, polygon],
    connectors: [
        injected(),
    ],
    transports: {
        [hardhat.id]: http(),
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [polygon.id]: http(),
    },
})
