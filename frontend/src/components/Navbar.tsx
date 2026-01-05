import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function Navbar() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect()
    const { disconnect } = useDisconnect()

    return (
        <nav className="border-b p-4 flex justify-between items-center bg-card text-card-foreground">
            <div className="flex items-center gap-6">
                <Link to="/" className="text-xl font-bold">InvoiceMarket</Link>
                <div className="flex gap-4">
                    <Link to="/marketplace" className="hover:underline">Marketplace</Link>
                    <Link to="/create" className="hover:underline">Create Invoice</Link>
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
                    <Button onClick={() => connect({ connector: injected() })}>Connect Wallet</Button>
                )}
            </div>
        </nav>
    )
}
