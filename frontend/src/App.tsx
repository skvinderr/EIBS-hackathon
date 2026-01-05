import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './wagmi'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { CreateInvoice } from './pages/CreateInvoice'
import { Marketplace } from './pages/Marketplace'
import { Dashboard } from './pages/Dashboard'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateInvoice />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
