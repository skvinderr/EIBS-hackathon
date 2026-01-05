import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { CheckCircle2, UploadCloud, FileText, ArrowRight, Loader2, ShieldCheck } from 'lucide-react'

export function CreateInvoice() {
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    // Mock Form State
    const [formData, setFormData] = useState({
        buyerName: '',
        amount: '',
        dueDate: '',
        file: null as File | null
    })

    const handleNext = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setStep(s => s + 1)
        }, 800) // Simulate network delay
    }

    const handleReset = () => {
        setStep(1)
        setFormData({ buyerName: '', amount: '', dueDate: '', file: null })
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-2xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Mint New Invoice</h1>
                <p className="text-muted-foreground">Tokenize your invoice to access instant liquidity.</p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10"></div>
                {[1, 2, 3].map((s) => (
                    <div key={s} className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300 ${step >= s ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted text-muted-foreground'}`}>
                        {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                    </div>
                ))}
            </div>

            <Card className="border-muted/50 shadow-xl">
                <CardHeader>
                    <CardTitle>{step === 1 ? 'Invoice Details' : step === 2 ? 'Upload Verification' : 'Confirmation'}</CardTitle>
                    <CardDescription>
                        {step === 1 && 'Enter the core details of the invoice you wish to finance.'}
                        {step === 2 && 'Upload the original invoice PDF for verification.'}
                        {step === 3 && 'Review and mint your invoice NFT.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-2">
                                <Label>Buyer Name</Label>
                                <Input
                                    placeholder="e.g. Acme Corp"
                                    value={formData.buyerName}
                                    onChange={e => setFormData({ ...formData, buyerName: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Amount (ETH)</Label>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.amount}
                                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Due Date</Label>
                                    <Input
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 space-y-4 hover:bg-muted/50 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500 cursor-pointer">
                            <div className="p-4 bg-primary/10 rounded-full">
                                <UploadCloud className="w-10 h-10 text-primary" />
                            </div>
                            <div className="text-center">
                                <p className="font-medium">Click to upload or drag and drop</p>
                                <p className="text-sm text-muted-foreground">PDF, PNG or JPG (max. 10MB)</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-muted/30 p-6 rounded-xl space-y-4 border">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <FileText className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{formData.buyerName || 'Unknown Buyer'}</p>
                                            <p className="text-xs text-muted-foreground">Invoice #INV-{Math.floor(Math.random() * 10000)}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">{formData.amount || '0.00'} ETH</p>
                                        <p className="text-xs text-muted-foreground">Due {formData.dueDate || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="h-px bg-border"></div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Advance Rate</span>
                                    <span className="font-medium">85%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Est. Funding</span>
                                    <span className="font-medium text-green-500">
                                        {(Number(formData.amount || 0) * 0.85).toFixed(3)} ETH
                                    </span>
                                </div>

                                {/* New Features Simulation */}
                                <div className="bg-background p-4 rounded-lg border space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium">Insurance Pool (5%)</span>
                                        </div>
                                        <input type="checkbox" className="toggle" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium">Req. Buyer Multi-sig</span>
                                        </div>
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Auto-sent</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step > 1 ? (
                        <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={isLoading}>Back</Button>
                    ) : (
                        <div></div>
                    )}

                    {step < 3 ? (
                        <Button onClick={handleNext} disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Next Step <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button onClick={() => setStep(4)} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                            Confirm & Mint NFT
                        </Button>
                    )}
                </CardFooter>
            </Card>

            {/* Success State */}
            {step === 4 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <Card className="max-w-md w-full border-green-500/50 shadow-2xl">
                        <CardContent className="pt-10 pb-10 text-center space-y-6">
                            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-green-700">Invoice Minted!</h2>
                                <p className="text-muted-foreground mt-2">Your invoice has been successfully tokenized and listed on the marketplace.</p>
                            </div>
                            <div className="flex gap-3 justify-center">
                                <Button variant="outline" onClick={handleReset}>Mint Another</Button>
                                <Button onClick={() => window.location.href = '/marketplace'}>View in Marketplace</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
