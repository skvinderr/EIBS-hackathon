import { useState } from 'react'
import { useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MarketplaceConfig } from '@/contracts'

// Simple Progress Component if shadcn one is missing
function SimpleProgress({ value }: { value: number }) {
    return (
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${Math.min(value, 100)}%` }} />
        </div>
    )
}

export function Marketplace() {
    // Fetch first 5 potential listings
    const { data: listings, isLoading } = useReadContracts({
        contracts: Array.from({ length: 5 }).map((_, i) => ({
            ...MarketplaceConfig,
            functionName: 'getListing',
            args: [BigInt(i)],
        }))
    })

    const { writeContract, data: hash, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    const [fundAmounts, setFundAmounts] = useState<Record<number, string>>({})

    const handleFund = (tokenId: number) => {
        const amount = fundAmounts[tokenId]
        if (!amount) return

        writeContract({
            ...MarketplaceConfig,
            functionName: 'fundInvoice',
            args: [BigInt(tokenId)],
            value: parseEther(amount)
        })
    }

    if (isLoading) return <div className="p-8 text-center">Loading marketplace...</div>

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings?.map((result, index) => {
                    if (result.status !== 'success') return null
                    const listing = result.result as any

                    // Skip inactive listings (state 0 is Active)
                    // Actually, we might want to show Funded ones too? Let's show Active only for funding.
                    if (listing.state !== 0) return null

                    const goal = Number(formatEther(listing.goalAmount))
                    const current = Number(formatEther(listing.currentAmount))
                    const ret = Number(formatEther(listing.returnAmount))
                    const progress = (current / goal) * 100
                    const roi = ((ret - goal) / goal) * 100

                    return (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="flex justify-between">
                                    <span>Invoice #{index}</span>
                                    <span className="text-sm font-normal text-muted-foreground">ROI: {roi.toFixed(2)}%</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>Raised: {current.toFixed(2)} ETH</span>
                                        <span>Goal: {goal.toFixed(2)} ETH</span>
                                    </div>
                                    <SimpleProgress value={progress} />
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Return Amount:</span>
                                    <span className="font-bold">{ret.toFixed(2)} ETH</span>
                                </div>

                                <div className="space-y-2">
                                    <Input
                                        type="number"
                                        placeholder="Amount to fund (ETH)"
                                        value={fundAmounts[index] || ''}
                                        onChange={e => setFundAmounts(prev => ({ ...prev, [index]: e.target.value }))}
                                    />
                                    <Button
                                        className="w-full"
                                        onClick={() => handleFund(index)}
                                        disabled={isPending || isConfirming}
                                    >
                                        {isPending ? 'Confirming...' : 'Fund Invoice'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
            {hash && <div className="fixed bottom-4 right-4 bg-card p-4 rounded shadow border">
                <p>Tx: {hash}</p>
                {isConfirmed && <p className="text-green-500 font-bold">Transaction Confirmed!</p>}
            </div>}
        </div>
    )
}
