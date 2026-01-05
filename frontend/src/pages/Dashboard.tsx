import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Dashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">My Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>My Invoices (Borrower)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">No invoices created yet.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>My Investments (Lender)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">No active investments.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
