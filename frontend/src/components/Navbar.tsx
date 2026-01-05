import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Wallet, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
    const { address, isConnected } = useAccount()
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect()
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const isActive = (path: string) => location.pathname === path

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
            <div className="max-w-7xl mx-auto">
                <div className="glass rounded-2xl px-6 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-primary/50 transition-all duration-300">
                            IM
                        </div>
                        <span className="text-xl font-bold tracking-tight hidden sm:block">InvoiceMarket</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full p-1 border border-white/5">
                        <NavLink to="/marketplace" active={isActive('/marketplace')}>Marketplace</NavLink>
                        <NavLink to="/secondary" active={isActive('/secondary')}>Secondary</NavLink>
                        <NavLink to="/create" active={isActive('/create')}>Create</NavLink>
                        <NavLink to="/buyer" active={isActive('/buyer')}>Buyer</NavLink>
                        <NavLink to="/dashboard" active={isActive('/dashboard')}>Dashboard</NavLink>
                    </div>

                    {/* Wallet Connection */}
                    <div className="hidden md:block">
                        {isConnected ? (
                            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                <div className="text-right hidden lg:block">
                                    <p className="text-xs text-muted-foreground">Connected</p>
                                    <p className="text-sm font-medium font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => disconnect()}
                                    className="rounded-full border-red-500/20 hover:bg-red-500/10 hover:text-red-500"
                                >
                                    Disconnect
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => connect({ connector: connectors[0] })}
                                className="rounded-full bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                            >
                                <Wallet className="w-4 h-4 mr-2" /> Connect Wallet
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 left-4 right-4 glass rounded-2xl p-4 flex flex-col gap-2 md:hidden animate-in slide-in-from-top-5">
                    <MobileNavLink to="/marketplace" onClick={() => setIsMobileMenuOpen(false)}>Marketplace</MobileNavLink>
                    <MobileNavLink to="/secondary" onClick={() => setIsMobileMenuOpen(false)}>Secondary Market</MobileNavLink>
                    <MobileNavLink to="/create" onClick={() => setIsMobileMenuOpen(false)}>Create Invoice</MobileNavLink>
                    <MobileNavLink to="/buyer" onClick={() => setIsMobileMenuOpen(false)}>Buyer Portal</MobileNavLink>
                    <MobileNavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</MobileNavLink>
                    <div className="h-px bg-white/10 my-2"></div>
                    {isConnected ? (
                        <Button variant="destructive" className="w-full" onClick={() => disconnect()}>Disconnect</Button>
                    ) : (
                        <Button className="w-full" onClick={() => connect({ connector: connectors[0] })}>Connect Wallet</Button>
                    )}
                </div>
            )}
        </nav>
    )
}

function NavLink({ to, children, active }: { to: string, children: React.ReactNode, active: boolean }) {
    return (
        <Link
            to={to}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active
                    ? 'bg-background text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
        >
            {children}
        </Link>
    )
}

function MobileNavLink({ to, children, onClick }: { to: string, children: React.ReactNode, onClick: () => void }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="block px-4 py-3 rounded-xl hover:bg-white/5 text-lg font-medium"
        >
            {children}
        </Link>
    )
}
