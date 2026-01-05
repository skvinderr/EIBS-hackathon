import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InvoiceNFTConfig, MarketplaceAddress, MarketplaceConfig } from '@/contracts'

export function CreateInvoice() {
    const [amount, setAmount] = useState('')
    const [advanceRate, setAdvanceRate] = useState('85')
    const [buyerName, setBuyerName] = useState('')
    const [dueDate, setDueDate] = useState('')
    const { address } = useAccount()

    const [step, setStep] = useState<'MINT' | 'APPROVE' | 'LIST' | 'DONE'>('MINT')
    const [tokenIdInput, setTokenIdInput] = useState('')

    // Contract Writes
    const { writeContract, data: hash, isPending, error } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    // Watch for Mint event to get TokenID (simplified: assuming next ID or fetching)
    // For this demo, we'll just assume the user owns the last minted token or we'd need to parse logs.
    // A better way is to read the `totalSupply` or `tokenOfOwnerByIndex` but let's keep it simple:
    // After minting, we'll ask user to proceed. In a real app, we'd index this.

    // We can read the nextTokenId from the contract if it was public, but it's private.
    // Instead, we'll use a "Minted! Click to List" flow where we might need to manually input ID or fetch last owned.
    // Let's fetch the last token owned by user.
    useReadContract({
        ...InvoiceNFTConfig,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: step === 'APPROVE' } // Refetch when entering approve step
    })

    useEffect(() => {
        if (isConfirmed) {
            if (step === 'MINT') {
                setStep('APPROVE')
            } else if (step === 'APPROVE') {
                setStep('LIST')
            } else if (step === 'LIST') {
                setStep('DONE')
            }
        }
    }, [isConfirmed, step])

    const handleMint = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!amount || !dueDate || !address) return

        // Mock IPFS upload
        const uri = `ipfs://mock-metadata-${buyerName}`

        writeContract({
            ...InvoiceNFTConfig,
            functionName: 'mintInvoice',
            args: [address, uri, parseEther(amount), BigInt(new Date(dueDate).getTime() / 1000)],
        })
    }

    const handleApprove = () => {
        writeContract({
            ...InvoiceNFTConfig,
            functionName: 'setApprovalForAll',
            args: [MarketplaceAddress, true],
        })
    }

    const handleList = () => {
        if (!tokenIdInput) return;

        const faceValue = parseEther(amount)
        const goal = (faceValue * BigInt(advanceRate)) / 100n

        writeContract({
            ...MarketplaceConfig,
            functionName: 'listInvoice',
            args: [BigInt(tokenIdInput), goal, faceValue],
        })
    }

    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Create & List Invoice</CardTitle>
                </CardHeader>
                <CardContent>
                    {step === 'MINT' && (
                        <form onSubmit={handleMint} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Buyer Name</Label>
                                <Input value={buyerName} onChange={e => setBuyerName(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Invoice Amount (ETH)</Label>
                                <Input type="number" step="0.001" value={amount} onChange={e => setAmount(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Advance Rate (%)</Label>
                                <Input type="number" value={advanceRate} onChange={e => setAdvanceRate(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Due Date</Label>
                                <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
                            </div>
                            <Button type="submit" className="w-full" disabled={isPending || isConfirming}>
                                {isPending ? 'Confirming...' : isConfirming ? 'Minting...' : '1. Mint Invoice'}
                            </Button>
                        </form>
                    )}

                    {step === 'APPROVE' && (
                        <div className="space-y-4">
                            <p className="text-center">Invoice Minted! Now approve the marketplace.</p>
                            <Button onClick={handleApprove} className="w-full" disabled={isPending || isConfirming}>
                                {isPending ? 'Confirming...' : isConfirming ? 'Approving...' : '2. Approve Marketplace'}
                            </Button>
                        </div>
                    )}

                    {step === 'LIST' && (
                        <div className="space-y-4">
                            <p className="text-center">Approved! Now list it for funding.</p>
                            <div className="space-y-2">
                                <Label>Token ID to List</Label>
                                <Input
                                    type="number"
                                    value={tokenIdInput}
                                    onChange={e => setTokenIdInput(e.target.value)}
                                    placeholder="Enter Token ID (check console/wallet)"
                                />
                                <p className="text-xs text-muted-foreground">Check your wallet for the latest Token ID.</p>
                            </div>
                            <Button onClick={handleList} className="w-full" disabled={isPending || isConfirming}>
                                {isPending ? 'Confirming...' : isConfirming ? 'Listing...' : '3. List Invoice'}
                            </Button>
                        </div>
                    )}

                    {step === 'DONE' && (
                        <div className="text-center space-y-4">
                            <p className="text-green-500 font-bold">Invoice Listed Successfully!</p>
                            <Button onClick={() => {
                                setStep('MINT')
                                setAmount('')
                                setBuyerName('')
                            }} variant="outline">Create Another</Button>
                        </div>
                    )}

                    {hash && <p className="mt-4 text-xs text-muted-foreground text-center break-all">Tx: {hash}</p>}
                    {error && <p className="mt-2 text-sm text-red-500 text-center">{error.message.split('\n')[0]}</p>}
                </CardContent>
            </Card>
        </div>
    )
}
