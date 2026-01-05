import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react'

export function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm bg-background/50 mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Live on Testnet
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                        Liquidity for the <br /> Modern Economy
                    </h1>
                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        Transform your unpaid invoices into instant capital.
                        A decentralized marketplace connecting businesses with global investors for seamless, fractional invoice financing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/create">
                            <Button size="lg" className="h-12 px-8 text-lg shadow-lg shadow-primary/25">
                                Get Funded <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to="/marketplace">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-lg backdrop-blur-sm bg-background/50">
                                Start Investing
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="h-10 w-10 text-yellow-500" />}
                            title="Instant Liquidity"
                            description="Access up to 85% of your invoice value immediately. No more waiting 30-90 days for payment."
                        />
                        <FeatureCard
                            icon={<Globe className="h-10 w-10 text-blue-500" />}
                            title="Global Access"
                            description="Tap into a global pool of liquidity. Investors from anywhere can fund your growth."
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="h-10 w-10 text-green-500" />}
                            title="Secure & Transparent"
                            description="Built on blockchain technology ensuring immutable records and automated smart contract settlements."
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <StatItem value="$2M+" label="Volume Traded" />
                        <StatItem value="1.5k+" label="Invoices Funded" />
                        <StatItem value="12h" label="Avg. Funding Time" />
                        <StatItem value="0%" label="Fraud Rate" />
                    </div>
                </div>
            </section>
        </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="mb-4 p-3 rounded-xl bg-muted/50 w-fit">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    )
}

function StatItem({ value, label }: { value: string, label: string }) {
    return (
        <div>
            <div className="text-4xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">{value}</div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</div>
        </div>
    )
}
