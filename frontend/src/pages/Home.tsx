import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Zap, Globe, PlayCircle, Star } from 'lucide-react'

export function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50 animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8 backdrop-blur-md shadow-sm hover:bg-primary/10 transition-colors cursor-default">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        Live on Testnet v2.0
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground">
                            Liquidity for the
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                            Modern Economy
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                        Transform your unpaid invoices into instant capital.
                        The world's first decentralized marketplace for fractional invoice financing.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link to="/create">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105">
                                Get Funded Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to="/marketplace">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-muted/50 backdrop-blur-sm transition-all hover:scale-105">
                                <PlayCircle className="mr-2 h-5 w-5" /> Start Investing
                            </Button>
                        </Link>
                    </div>

                    {/* Social Proof / Trust Badges */}
                    <div className="mt-16 pt-8 border-t border-border/50 max-w-4xl mx-auto">
                        <p className="text-sm text-muted-foreground mb-6 font-medium uppercase tracking-widest">Trusted by industry leaders</p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {['Acme Corp', 'Global Logistics', 'TechFlow', 'Future Finance', 'BlockPay'].map((brand) => (
                                <span key={brand} className="text-xl font-bold flex items-center gap-2">
                                    <div className="w-6 h-6 bg-foreground/20 rounded-full"></div> {brand}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-muted/30 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Seamless financing in three simple steps.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        <StepCard
                            number="01"
                            title="Mint Invoice"
                            desc="Upload your invoice details. We tokenize it into an NFT with a unique risk score."
                        />
                        <StepCard
                            number="02"
                            title="Get Funded"
                            desc="Investors globally bid to fund your invoice. Receive up to 85% value instantly."
                        />
                        <StepCard
                            number="03"
                            title="Repay & Grow"
                            desc="Repay the loan when your client pays. Build on-chain reputation for lower rates."
                        />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="h-8 w-8 text-yellow-500" />}
                            title="Instant Liquidity"
                            description="Access capital in minutes, not months. Smart contracts automate the entire settlement process."
                        />
                        <FeatureCard
                            icon={<Globe className="h-8 w-8 text-blue-500" />}
                            title="Global Access"
                            description="Tap into a borderless liquidity pool. Investors from anywhere can fund your business growth."
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="h-8 w-8 text-green-500" />}
                            title="Bank-Grade Security"
                            description="Built on Ethereum with audited smart contracts. Your data is encrypted and immutable."
                        />
                        <FeatureCard
                            icon={<Star className="h-8 w-8 text-purple-500" />}
                            title="Reputation System"
                            description="Earn 'Soulbound' tokens for every successful repayment. Better score = Better rates."
                        />
                        <FeatureCard
                            icon={<ArrowRight className="h-8 w-8 text-pink-500" />}
                            title="Secondary Market"
                            description="Need to exit early? Trade your invoice positions on our liquid secondary market."
                        />
                        <FeatureCard
                            icon={<PlayCircle className="h-8 w-8 text-orange-500" />}
                            title="Automated Escrow"
                            description="Funds are held safely in smart contract escrow until all conditions are met."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="bg-primary/5 border border-primary/10 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Ready to unlock your capital?</h2>
                        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10">
                            Join thousands of businesses and investors building the future of supply chain finance.
                        </p>
                        <div className="relative z-10">
                            <Link to="/create">
                                <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all">
                                    Get Started Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">IM</div>
                            <span className="text-xl font-bold">InvoiceMarket</span>
                        </div>
                        <div className="flex gap-8 text-muted-foreground">
                            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
                            <a href="#" className="hover:text-foreground transition-colors">Support</a>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            © 2024 InvoiceMarket Inc. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="group p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
            <div className="mb-6 p-4 rounded-2xl bg-muted/50 w-fit group-hover:bg-primary/10 transition-colors duration-500">{icon}</div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">{description}</p>
        </div>
    )
}

function StepCard({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="relative p-8 rounded-3xl bg-background border shadow-sm hover:shadow-md transition-all">
            <div className="text-6xl font-black text-muted/20 absolute top-4 right-6 select-none">{number}</div>
            <h3 className="text-2xl font-bold mb-4 mt-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{desc}</p>
        </div>
    )
}
