import { useAccount, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MarketplaceConfig } from '@/contracts'

export function Dashboard() {
    const { address } = useAccount()

    // Fetch listings 0-5
    const { data: listings, isLoading } = useReadContracts({
        contracts: Array.from({ length: 5 }).map((_, i) => ({
            ...MarketplaceConfig,
            functionName: 'getListing',
            args: [BigInt(i)],
        }))
    })

    // Fetch investments for these listings (separate call or just try to claim?)
    // To check if invested, we need to call `investments(tokenId, user)`.
    const { data: investments } = useReadContracts({
        contracts: Array.from({ length: 5 }).map((_, i) => ({
            ...MarketplaceConfig,
            functionName: 'investments',
            args: [BigInt(i), address],
        })),
        query: { enabled: !!address }
    })

    const { writeContract, data: hash, isPending } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    const handleRepay = (tokenId: number, returnAmount: bigint) => {
        writeContract({
            ...MarketplaceConfig,
            functionName: 'repayInvoice',
            args: [BigInt(tokenId)],
            value: returnAmount
        })
    }

    const handleClaim = (tokenId: number) => {
        writeContract({
            ...MarketplaceConfig,
            functionName: 'claimReturns',
            args: [BigInt(tokenId)],
        })
    }

    if (isLoading) return <div>Loading dashboard...</div>

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">My Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>My Invoices (Borrower)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {listings?.map((result, index) => {
                            if (result.status !== 'success') return null
                            const listing = result.result as any
                            if (listing.seller !== address) return null

                            // State: 0=Active, 1=Funded, 2=Repaid
                            const stateLabel = ['Active', 'Funded', 'Repaid'][listing.state]

                            return (
                                <div key={index} className="border p-4 rounded space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-bold">Invoice #{index}</span>
                                        <span className="text-sm bg-secondary px-2 py-1 rounded">{stateLabel}</span>
                                    </div>
                                    <div className="text-sm">
                                        <p>Raised: {formatEther(listing.currentAmount)} / {formatEther(listing.goalAmount)} ETH</p>
                                        <p>Repay Amount: {formatEther(listing.returnAmount)} ETH</p>
                                    </div>
                                    {listing.state === 1 && (
                                        <Button
                                            size="sm"
                                            className="w-full mt-2"
                                            onClick={() => handleRepay(index, listing.returnAmount)}
                                            disabled={isPending || isConfirming}
                                        >
                                            Repay Loan
                                        </Button>
                                    )}
                                </div>
                            )
                        })}
                        {!listings?.some(r => r.status === 'success' && (r.result as any).seller === address) && (
                            <p className="text-muted-foreground">No invoices found.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>My Investments (Lender)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {investments?.map((result, index) => {
                            if (result.status !== 'success') return null
                            const investedAmount = result.result as bigint
                            if (investedAmount === 0n) return null

                            // We need listing details to know if we can claim
                            const listingResult = listings?.[index]
                            if (!listingResult || listingResult.status !== 'success') return null
                            const listing = listingResult.result as any

                            return (
                                <div key={index} className="border p-4 rounded space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-bold">Invoice #{index}</span>
                                        <span className="text-sm">Invested: {formatEther(investedAmount)} ETH</span>
                                    </div>
                                    <div className="text-sm">
                                        <p>Status: {['Active', 'Funded', 'Repaid'][listing.state]}</p>
                                    </div>
                                    {listing.state === 2 && (
                                        <Button
                                            size="sm"
                                            className="w-full mt-2"
                                            onClick={() => handleClaim(index)}
                                            disabled={isPending || isConfirming}
                                        >
                                            Claim Returns
                                        </Button>
                                    )}
                                </div>
                            )
                        })}
                        {!investments?.some(r => r.status === 'success' && (r.result as bigint) > 0n) && (
                            <p className="text-muted-foreground">No active investments.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
            {hash && <div className="fixed bottom-4 right-4 bg-card p-4 rounded shadow border">Tx: {hash}</div>}
        </div>
    )
}
