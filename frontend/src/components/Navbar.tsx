import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function Navbar() {
    const { address, isConnected } = useAccount()
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect()

    return (
        <nav className="border-b p-4 flex justify-between items-center bg-card text-card-foreground">
            <div className="flex items-center gap-6">
                <Link to="/" className="text-xl font-bold">InvoiceMarket</Link>
                <div className="flex gap-4">
                    <Link to="/marketplace" className="hover:underline">Marketplace</Link>
                    <Link to="/secondary" className="hover:underline text-muted-foreground">Secondary</Link>
                    <Link to="/create" className="hover:underline">Create Invoice</Link>
                    <Link to="/buyer" className="hover:underline text-muted-foreground">Buyer Portal</Link>
                    <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                </div>
            </div>
            <div>
                {isConnected ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                        <Button variant="outline" onClick={() => disconnect()}>Disconnect</Button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        {connectors.map((connector) => (
                            <Button key={connector.uid} onClick={() => connect({ connector })}>
                                {connector.name === 'Mock' ? 'Simulate Wallet' : 'Connect Wallet'}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}
