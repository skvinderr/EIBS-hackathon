import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, Wallet, PieChart, ArrowDownLeft, DollarSign, Activity, ShieldCheck, TrendingUp } from 'lucide-react'

export function Dashboard() {
    return (
        <div className="container mx-auto px-4 py-24 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Financial Overview</h1>
                    <p className="text-muted-foreground">Manage your invoices, investments, and reputation score.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5">
                        <ArrowDownLeft className="mr-2 h-4 w-4" /> Withdraw
                    </Button>
                    <Button className="rounded-full shadow-lg shadow-primary/20">
                        <ArrowUpRight className="mr-2 h-4 w-4" /> Deposit
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Balance"
                    value="$12,450.00"
                    icon={<Wallet className="h-5 w-5 text-primary" />}
                    trend="+12.5%"
                />
                <StatCard
                    title="Active Investments"
                    value="$8,200.00"
                    icon={<PieChart className="h-5 w-5 text-blue-500" />}
                    trend="+5.2%"
                />
                <StatCard
                    title="Reputation Score"
                    value="850 / 1000"
                    icon={<Activity className="h-5 w-5 text-green-500" />}
                    subtext="Excellent (SBT Minted)"
                />
                <StatCard
                    title="Insurance Coverage"
                    value="$50,000"
                    icon={<ShieldCheck className="h-5 w-5 text-purple-500" />}
                    subtext="Active Policy"
                />
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="borrower" className="space-y-8">
                <TabsList className="bg-white/5 border border-white/10 p-1 rounded-full w-fit">
                    <TabsTrigger value="borrower" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-white">Borrower View</TabsTrigger>
                    <TabsTrigger value="lender" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-white">Lender View</TabsTrigger>
                </TabsList>

                <TabsContent value="borrower" className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="glass rounded-3xl p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-primary" /> Your Invoices
                        </h3>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex flex-col md:flex-row justify-between items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors gap-4 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-bold text-lg">
                                            #{1000 + i}
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">Acme Corp Invoice</p>
                                            <p className="text-sm text-muted-foreground">Due in 30 days • 12% APY</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Amount</p>
                                            <p className="font-bold text-lg">5.00 ETH</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Status</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                                Pending Repayment
                                            </span>
                                        </div>
                                        <Button size="sm" className="rounded-full px-6">Repay</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="lender" className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="glass rounded-3xl p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-500" /> Investment Portfolio
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col md:flex-row justify-between items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors gap-4 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center text-green-500 font-bold text-lg">
                                            <PieChart className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">TechFlow Solutions</p>
                                            <p className="text-sm text-muted-foreground">Fractional Share • 14% APY</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Invested</p>
                                            <p className="font-bold text-lg">1.50 ETH</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Est. Return</p>
                                            <p className="font-bold text-lg text-green-400">+0.21 ETH</p>
                                        </div>
                                        <Button size="sm" variant="outline" className="rounded-full px-6 border-white/10">Claim</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function StatCard({ title, value, icon, trend, subtext }: { title: string, value: string, icon: React.ReactNode, trend?: string, subtext?: string }) {
    return (
        <Card className="glass-card border-0">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
                    {trend && (
                        <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> {trend}
                        </span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
                {subtext && <p className="text-xs text-muted-foreground mt-2">{subtext}</p>}
            </CardContent>
        </Card>
    )
}
