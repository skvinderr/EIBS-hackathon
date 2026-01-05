import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2, UploadCloud, FileText, ArrowRight, Loader2, ShieldCheck, Wallet, ArrowLeft } from 'lucide-react'

export function CreateInvoice() {
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [formData, setFormData] = useState({
        buyerName: '',
        amount: '',
        dueDate: '',
        file: null as File | null
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, file: e.target.files[0] })
        }
    }

    const handleNext = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setStep(step + 1)
        }, 800)
    }

    const handleMint = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setIsSuccess(true)
        }, 2000)
    }

    return (
        <div className="container mx-auto px-4 py-24 max-w-3xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Tokenize Invoice</h1>
                <p className="text-muted-foreground">Turn your accounts receivable into a tradable digital asset in minutes.</p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between items-center mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -z-10 rounded-full"></div>
                <div className={`absolute top-1/2 left-0 h-1 bg-primary -z-10 rounded-full transition-all duration-500`} style={{ width: `${((step - 1) / 2) * 100}%` }}></div>

                {[1, 2, 3].map((s) => (
                    <div key={s} className={`flex flex-col items-center gap-2 transition-all duration-300 ${step >= s ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-all duration-300 ${step >= s ? 'bg-background border-primary text-primary shadow-lg shadow-primary/20' : 'bg-background border-white/10 text-muted-foreground'}`}>
                            {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                        </div>
                        <span className="text-xs font-medium uppercase tracking-wider">{s === 1 ? 'Details' : s === 2 ? 'Verify' : 'Mint'}</span>
                    </div>
                ))}
            </div>

            <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                {isSuccess ? (
                    <div className="text-center py-12 animate-in zoom-in-50 duration-500">
                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Invoice Tokenized!</h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Your invoice has been successfully minted as an NFT and listed on the marketplace.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button variant="outline" onClick={() => window.location.href = '/dashboard'} className="rounded-full h-12 px-8">
                                View Dashboard
                            </Button>
                            <Button onClick={() => window.location.href = '/marketplace'} className="rounded-full h-12 px-8 shadow-lg shadow-primary/25">
                                Go to Marketplace
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        {step === 1 && (
                            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Buyer Company Name</Label>
                                        <Input
                                            name="buyerName"
                                            placeholder="e.g. Acme Corp"
                                            value={formData.buyerName}
                                            onChange={handleInputChange}
                                            className="h-12 bg-white/5 border-white/10 focus-visible:ring-primary/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Invoice Amount (ETH)</Label>
                                        <div className="relative">
                                            <Wallet className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                            <Input
                                                name="amount"
                                                type="number"
                                                placeholder="0.00"
                                                className="pl-10 h-12 bg-white/5 border-white/10 focus-visible:ring-primary/50"
                                                value={formData.amount}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Due Date</Label>
                                    <Input
                                        name="dueDate"
                                        type="date"
                                        className="h-12 bg-white/5 border-white/10 focus-visible:ring-primary/50"
                                        value={formData.dueDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="pt-4">
                                    <Button className="w-full h-12 text-lg rounded-full shadow-lg shadow-primary/20" onClick={handleNext}>
                                        Continue <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                                <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <UploadCloud className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">Upload Invoice PDF</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to browse</p>
                                    <Input type="file" className="hidden" id="file-upload" onChange={handleFileChange} />
                                    <Button variant="secondary" size="sm" onClick={() => document.getElementById('file-upload')?.click()}>
                                        Choose File
                                    </Button>
                                    {formData.file && <p className="mt-4 text-green-500 text-sm font-medium flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /> {formData.file.name}</p>}
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="w-full h-12 rounded-full" onClick={() => setStep(1)}>
                                        <ArrowLeft className="mr-2 w-4 h-4" /> Back
                                    </Button>
                                    <Button className="w-full h-12 rounded-full shadow-lg shadow-primary/20" onClick={handleNext} disabled={!formData.file}>
                                        Verify & Continue
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                                <div className="bg-white/5 rounded-2xl p-6 space-y-4 border border-white/10">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                                <FileText className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg">{formData.buyerName || 'Unknown Buyer'}</p>
                                                <p className="text-sm text-muted-foreground">Invoice #INV-{Math.floor(Math.random() * 10000)}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-2xl">{formData.amount || '0.00'} ETH</p>
                                            <p className="text-sm text-muted-foreground">Due {formData.dueDate || 'N/A'}</p>
                                        </div>
                                    </div>

                                    <div className="h-px bg-white/10"></div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                                            <span className="text-muted-foreground">Advance Rate</span>
                                            <span className="font-bold">85%</span>
                                        </div>
                                        <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                                            <span className="text-muted-foreground">Est. Funding</span>
                                            <span className="font-bold text-green-400">{(Number(formData.amount || 0) * 0.85).toFixed(3)} ETH</span>
                                        </div>
                                    </div>

                                    {/* New Features Simulation */}
                                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium">Insurance Pool (5%)</span>
                                            </div>
                                            <input type="checkbox" className="toggle accent-primary" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium">Req. Buyer Multi-sig</span>
                                            </div>
                                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-md font-medium">Auto-sent</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="outline" className="w-full h-12 rounded-full" onClick={() => setStep(2)}>
                                        Back
                                    </Button>
                                    <Button className="w-full h-12 rounded-full shadow-xl shadow-primary/25 text-lg" onClick={handleMint} disabled={isLoading}>
                                        {isLoading ? <Loader2 className="animate-spin mr-2" /> : 'Mint Invoice NFT'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
