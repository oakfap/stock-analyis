import Header from './components/Header'
import MarketOverview from './components/MarketOverview'
import SignalChart from './components/SignalChart'
import StockGrid from './components/StockGrid'
import NewsFeed from './components/NewsFeed'
import Disclaimer from './components/Disclaimer'

export default function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <MarketOverview />
        <SignalChart />
        <StockGrid />
        <NewsFeed />
        <Disclaimer />
      </main>
    </div>
  )
}
