import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InvoiceNFTConfig, MarketplaceAddress, MarketplaceConfig } from '@/contracts'

export function CreateInvoice() {
    const [amount, setAmount] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const { address } = useAccount()

    const { writeContract, data: hash, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!amount || !dueDate || !address) return

        // 1. Upload file to IPFS (mock for now)
        const uri = "ipfs://mock-uri"

        // 2. Mint Invoice NFT
        writeContract({
            ...InvoiceNFTConfig,
            functionName: 'mintInvoice',
            args: [address, uri, parseEther(amount), BigInt(new Date(dueDate).getTime() / 1000)],
        })
    }

    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Invoice</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Invoice Amount (ETH)</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.001"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="file">Invoice Document</Label>
                            <Input
                                id="file"
                                type="file"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isPending || isConfirming}>
                            {isPending ? 'Confirming...' : isConfirming ? 'Minting...' : 'Mint Invoice'}
                        </Button>
                        {isConfirmed && <p className="text-green-500 text-center">Invoice Minted Successfully!</p>}
                        {hash && <p className="text-xs text-muted-foreground text-center break-all">Tx: {hash}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
