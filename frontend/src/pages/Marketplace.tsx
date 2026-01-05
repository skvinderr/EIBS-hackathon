import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function Marketplace() {
    // Mock data for now
    const invoices = [
        { id: 1, amount: "1.5", dueDate: "2024-12-31", borrower: "0x123...abc", price: "1.5" },
        { id: 2, amount: "0.5", dueDate: "2024-11-30", borrower: "0x456...def", price: "0.5" },
    ]

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {invoices.map((invoice) => (
                    <Card key={invoice.id}>
                        <CardHeader>
                            <CardTitle>Invoice #{invoice.id}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Amount:</span>
                                <span className="font-bold">{invoice.amount} ETH</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Due Date:</span>
                                <span>{invoice.dueDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Borrower:</span>
                                <span className="text-sm">{invoice.borrower}</span>
                            </div>
                            <Button className="w-full">Fund Invoice</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
