import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, DollarSign, ShieldCheck, Building2 } from 'lucide-react'

// Mock Invoices Owed by the Buyer
const MOCK_OWED_INVOICES = [
    { id: 101, supplier: "ABC Textiles", amount: 10000, due: "2024-05-15", status: "Pending", risk: "Low" },
    { id: 102, supplier: "Global Logistics Co", amount: 4500, due: "2024-04-20", status: "Overdue", risk: "Medium" },
    { id: 103, supplier: "Tech Services Ltd", amount: 12000, due: "2024-06-01", status: "Pending", risk: "Low" },
]

export function BuyerPortal() {
    const [invoices, setInvoices] = useState(MOCK_OWED_INVOICES)
    const [settlingId, setSettlingId] = useState<number | null>(null)

    const handleSettle = (id: number) => {
        setSettlingId(id)
        setTimeout(() => {
            setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: "Settled" } : inv))
            setSettlingId(null)
        }, 2000)
    }

    return (
        <div className="container mx-auto px-4 py-24 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Buyer Portal</h1>
                    <p className="text-muted-foreground">Manage and settle your payables on-chain.</p>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">Zara Inc.</span>
                    <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-600 border-green-500/20">Verified Buyer</Badge>
                </div>
            </div>

            <div className="grid gap-6">
                {invoices.map((invoice) => (
                    <Card key={invoice.id} className={`transition-all duration-500 ${invoice.status === 'Settled' ? 'border-green-500/50 bg-green-500/5' : ''}`}>
                        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${invoice.status === 'Settled' ? 'bg-green-500/20 text-green-600' : 'bg-primary/10 text-primary'}`}>
                                    {invoice.status === 'Settled' ? <CheckCircle2 className="h-6 w-6" /> : <DollarSign className="h-6 w-6" />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{invoice.supplier}</h3>
                                    <p className="text-sm text-muted-foreground">Invoice #{invoice.id} • Due {invoice.due}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Amount Due</p>
                                    <p className="text-2xl font-bold">${invoice.amount.toLocaleString()}</p>
                                </div>

                                {invoice.status === 'Settled' ? (
                                    <Button variant="outline" className="w-32 border-green-500 text-green-600 hover:bg-green-500/10 hover:text-green-700 cursor-default">
                                        Paid
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-32 bg-primary hover:bg-primary/90"
                                        onClick={() => handleSettle(invoice.id)}
                                        disabled={settlingId === invoice.id}
                                    >
                                        {settlingId === invoice.id ? 'Settling...' : 'Settle Now'}
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                        {invoice.status === 'Settled' && (
                            <CardFooter className="bg-green-500/10 py-3 px-6 text-sm text-green-700 flex justify-between animate-in slide-in-from-top-2">
                                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Smart Contract Escrow Executed</span>
                                <span>Funds Distributed: 85% to Supplier, 15% to Investors</span>
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    )
}
