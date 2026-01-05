import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
            <h1 className="text-5xl font-bold mb-6">Decentralized Invoice Financing</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Turn your unpaid invoices into immediate cash flow.
                Mint invoices as NFTs and get funded by investors instantly.
            </p>
            <div className="flex gap-4">
                <Link to="/create">
                    <Button size="lg">Get Funding</Button>
                </Link>
                <Link to="/marketplace">
                    <Button variant="outline" size="lg">Invest Now</Button>
                </Link>
            </div>
        </div>
    )
}
