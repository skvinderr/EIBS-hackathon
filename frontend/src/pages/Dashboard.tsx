import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, Wallet, PieChart, ArrowDownLeft, DollarSign, Activity } from 'lucide-react'

export function Dashboard() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your financial activity.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Export Data</Button>
                    <Button>Withdraw Funds</Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Value Locked"
                    value="$12,450.00"
                    change="+12.5%"
                    icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                    title="Active Investments"
                    value="$8,200.00"
                    change="+5.2%"
                    icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                    title="Total Earnings"
                    value="$1,250.00"
                    change="+18.2%"
                    icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                    title="Net APY"
                    value="14.2%"
                    change="+2.1%"
                    icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                />
            </div>

            <Tabs defaultValue="investments" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="investments">My Investments</TabsTrigger>
                    <TabsTrigger value="invoices">My Invoices</TabsTrigger>
                    <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="investments" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Portfolios</CardTitle>
                            <CardDescription>Your current positions in invoice financing.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <ArrowUpRight className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">TechFlow Solutions Invoice #{100 + i}</p>
                                                <p className="text-sm text-muted-foreground">Due in 12 days</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">2.5 ETH</p>
                                            <p className="text-sm text-green-600">+0.35 ETH (Est.)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="invoices" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Issued Invoices</CardTitle>
                            <CardDescription>Invoices you have minted and listed for funding.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                            <Clock className="h-5 w-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Acme Corp Invoice #INV-2024-001</p>
                                            <p className="text-sm text-muted-foreground">Listed 2 days ago</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">15.0 ETH</p>
                                        <p className="text-sm text-yellow-600">85% Funded</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="activity">
                    <Card>
                        <CardHeader>
                            <CardTitle>Transaction History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-2">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                                <ArrowDownLeft className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Funded Invoice #10{i}</p>
                                                <p className="text-xs text-muted-foreground">2 hours ago</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium">-0.5 ETH</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 font-medium">{change}</span> from last month
                </p>
            </CardContent>
        </Card>
    )
}

// Helper for icons
function Clock(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
