import Header from './components/Header'
import MarketOverview from './components/MarketOverview'
import AnalyzePanel from './components/AnalyzePanel'
import SignalChart from './components/SignalChart'
import StockTable from './components/StockTable'
import NewsFeed from './components/NewsFeed'
import Disclaimer from './components/Disclaimer'

export default function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        <AnalyzePanel />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
          <MarketOverview />
          <SignalChart />
        </div>
        <StockTable />
        <NewsFeed />
        <Disclaimer />
      </main>
    </div>
  )
}
