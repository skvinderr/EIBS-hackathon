import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, polygon, hardhat } from 'wagmi/chains'
import { injected, mock } from 'wagmi/connectors'

export const config = createConfig({
    chains: [hardhat, mainnet, sepolia, polygon],
    connectors: [
        mock({
            accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
        }),
        injected(),
    ],
    transports: {
        [hardhat.id]: http(),
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [polygon.id]: http(),
    },
})
