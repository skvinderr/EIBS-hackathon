import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'

const MOCK_ORDER_BOOK = [
    { id: 1, asset: "TechFlow Invoice #101", type: "Sell", amount: "50 Shares", price: "$98.50", total: "$4,925", seller: "0x12...45A" },
    { id: 2, asset: "Green Earth #204", type: "Buy", amount: "20 Shares", price: "$97.00", total: "$1,940", buyer: "0x88...99B" },
    { id: 3, asset: "Apex Mfg #305", type: "Sell", amount: "100 Shares", price: "$99.00", total: "$9,900", seller: "0xCC...DD1" },
]

export function SecondaryMarket() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Secondary Market</h1>
                    <p className="text-muted-foreground">Trade invoice shares before maturity.</p>
                </div>
                <div className="flex gap-2">
                    <Button>Create Order</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Market Stats */}
                <Card className="lg:col-span-3 bg-muted/30">
                    <CardContent className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">24h Volume</p>
                            <p className="text-2xl font-bold">$124,500</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Active Orders</p>
                            <p className="text-2xl font-bold">1,240</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Avg. Discount</p>
                            <p className="text-2xl font-bold text-green-600">2.4%</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Top Asset</p>
                            <p className="text-2xl font-bold">TechFlow</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Book */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Order Book</CardTitle>
                        <CardDescription>Live buy and sell orders from other investors.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {MOCK_ORDER_BOOK.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${order.type === 'Sell' ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-600'}`}>
                                            {order.type === 'Sell' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <p className="font-medium">{order.asset}</p>
                                            <p className="text-sm text-muted-foreground">{order.amount} @ {order.price}/share</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">{order.total}</p>
                                        <Button size="sm" variant={order.type === 'Sell' ? 'default' : 'outline'} className="mt-1 h-7">
                                            {order.type === 'Sell' ? 'Buy Now' : 'Sell Now'}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Trades */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Trades</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">10:4{i} AM</span>
                                    <span className="font-medium">TechFlow #101</span>
                                    <span className="text-green-600">$98.20</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
