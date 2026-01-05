import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, TrendingUp, Clock, ArrowUpRight } from 'lucide-react'

// Mock Data for Marketplace
const MOCK_INVOICES = [
    { id: 1, company: "TechFlow Solutions", amount: 15.5, goal: 13.175, raised: 8.5, return: 15.5, due: "2024-05-15", risk: "A", sector: "Technology" },
    { id: 2, company: "Green Earth Logistics", amount: 42.0, goal: 35.7, raised: 35.7, return: 42.0, due: "2024-04-30", risk: "B+", sector: "Logistics" },
    { id: 3, company: "Apex Manufacturing", amount: 8.2, goal: 6.97, raised: 2.1, return: 8.2, due: "2024-06-01", risk: "A-", sector: "Manufacturing" },
    { id: 4, company: "Urban Retail Group", amount: 25.0, goal: 21.25, raised: 10.0, return: 25.0, due: "2024-05-20", risk: "B", sector: "Retail" },
    { id: 5, company: "Quantum Systems", amount: 12.0, goal: 10.2, raised: 0, return: 12.0, due: "2024-06-10", risk: "A+", sector: "Technology" },
    { id: 6, company: "Blue Sky Energy", amount: 50.0, goal: 42.5, raised: 15.2, return: 50.0, due: "2024-07-01", risk: "A", sector: "Energy" },
]

export function Marketplace() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSector, setSelectedSector] = useState('All')

    const filteredInvoices = MOCK_INVOICES.filter(inv =>
        (selectedSector === 'All' || inv.sector === selectedSector) &&
        inv.company.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Marketplace</h1>
                    <p className="text-muted-foreground">Discover and fund high-yield invoices.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search companies..."
                            className="pl-9 w-full sm:w-[250px]"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" /> Filter
                    </Button>
                </div>
            </div>

            {/* Sector Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'Technology', 'Logistics', 'Manufacturing', 'Retail', 'Energy'].map(sector => (
                    <Button
                        key={sector}
                        variant={selectedSector === sector ? "default" : "secondary"}
                        size="sm"
                        onClick={() => setSelectedSector(sector)}
                        className="rounded-full"
                    >
                        {sector}
                    </Button>
                ))}
            </div>

            {/* Invoice Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInvoices.map((invoice) => {
                    const progress = (invoice.raised / invoice.goal) * 100
                    const roi = ((invoice.return - invoice.goal) / invoice.goal) * 100

                    return (
                        <Card key={invoice.id} className="group hover:shadow-lg transition-all duration-300 border-muted/60">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant={invoice.risk.startsWith('A') ? 'default' : 'secondary'} className={invoice.risk.startsWith('A') ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20' : 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20'}>
                                        Risk: {invoice.risk}
                                    </Badge>
                                    <Badge variant="outline">{invoice.sector}</Badge>
                                </div>
                                <CardTitle className="text-xl">{invoice.company}</CardTitle>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> Due {invoice.due}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Invoice Value</p>
                                        <p className="font-semibold text-lg">{invoice.amount} ETH</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-muted-foreground">Est. ROI</p>
                                        <p className="font-semibold text-lg text-green-600 flex items-center justify-end gap-1">
                                            <TrendingUp className="h-4 w-4" /> {roi.toFixed(2)}%
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Funded</span>
                                        <span className="font-medium">{progress.toFixed(0)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-500 ease-out"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>{invoice.raised} ETH</span>
                                        <span>Goal: {invoice.goal} ETH</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                                    Fund Now <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
