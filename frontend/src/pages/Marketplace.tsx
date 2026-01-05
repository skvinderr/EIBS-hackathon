import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, TrendingUp, Clock, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react'

// Mock Data for Marketplace
const MOCK_INVOICES = [
    { id: 1, company: "TechFlow Solutions", amount: 15000, return: 16500, apy: "12%", due: "45 Days", risk: "A", sector: "Technology", funded: 65 },
    { id: 2, company: "Green Earth Logistics", amount: 8500, return: 9100, apy: "14%", due: "30 Days", risk: "B+", sector: "Logistics", funded: 20 },
    { id: 3, company: "Apex Manufacturing", amount: 25000, return: 28000, apy: "15%", due: "60 Days", risk: "B", sector: "Industrial", funded: 90 },
    { id: 4, company: "Urban Retail Group", amount: 5000, return: 5300, apy: "10%", due: "15 Days", risk: "A+", sector: "Retail", funded: 0 },
    { id: 5, company: "Quantum Systems", amount: 42000, return: 48000, apy: "18%", due: "90 Days", risk: "B-", sector: "Technology", funded: 45 },
    { id: 6, company: "Global Foods Inc", amount: 12000, return: 13000, apy: "11%", due: "25 Days", risk: "A", sector: "FMCG", funded: 10 },
]

export function Marketplace() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSector, setSelectedSector] = useState('All')

    const filteredInvoices = MOCK_INVOICES.filter(inv =>
        (selectedSector === 'All' || inv.sector === selectedSector) &&
        inv.company.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto px-4 py-24 space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Marketplace</h1>
                    <p className="text-lg text-muted-foreground max-w-xl">
                        Discover and fund high-yield invoices from verified businesses.
                        Earn up to <span className="text-primary font-bold">18% APY</span> with fractional ownership.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="glass px-6 py-3 rounded-2xl text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Liquidity</p>
                        <p className="text-xl font-bold font-mono">$2.4M</p>
                    </div>
                    <div className="glass px-6 py-3 rounded-2xl text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg APY</p>
                        <p className="text-xl font-bold font-mono text-green-400">14.2%</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="glass p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by company name..."
                        className="pl-10 bg-background/50 border-none focus-visible:ring-primary/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {['All', 'Technology', 'Logistics', 'Industrial', 'Retail'].map((sector) => (
                        <Button
                            key={sector}
                            variant={selectedSector === sector ? 'default' : 'outline'}
                            onClick={() => setSelectedSector(sector)}
                            className={`rounded-full ${selectedSector === sector ? 'bg-primary hover:bg-primary/90' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
                        >
                            {sector}
                        </Button>
                    ))}
                    <Button variant="outline" size="icon" className="rounded-full border-white/10 shrink-0">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInvoices.map((invoice) => (
                    <Card key={invoice.id} className="glass-card border-0 overflow-hidden group relative">
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-all duration-500"></div>

                        <CardContent className="p-6 relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10">
                                        <Zap className="h-6 w-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{invoice.company}</h3>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                            <ShieldCheck className="h-3 w-3 text-green-500" /> Verified • {invoice.sector}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="outline" className={`
                                    ${invoice.risk.startsWith('A') ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                                    ${invoice.risk.startsWith('B') ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : ''}
                                `}>
                                    Risk: {invoice.risk}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white/5 rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Invoice Value</p>
                                    <p className="text-lg font-bold font-mono">${invoice.amount.toLocaleString()}</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Est. Return</p>
                                    <p className="text-lg font-bold font-mono text-green-400">${invoice.return.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> APY</p>
                                    <p className="font-bold">{invoice.apy}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Duration</p>
                                    <p className="font-bold">{invoice.due}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Funding Progress</span>
                                    <span className="font-bold text-primary">{invoice.funded}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-1000 ease-out"
                                        style={{ width: `${invoice.funded}%` }}
                                    ></div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="p-4 bg-white/5 border-t border-white/5 flex gap-3">
                            <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-0">
                                Details
                            </Button>
                            <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                                Fund Now <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
