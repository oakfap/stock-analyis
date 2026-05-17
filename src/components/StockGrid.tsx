import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setFilterSignal, setSearchQuery, setTickers, fetchAnalysis } from '../store/analysisSlice'
import type { FilterSignal } from '../types'
import StockCard from './StockCard'

const filters: { label: string; value: FilterSignal; color: string }[] = [
  { label: 'All', value: 'ALL', color: '' },
  { label: 'Buy', value: 'BUY', color: 'data-[active=true]:bg-signal-buy data-[active=true]:text-white' },
  { label: 'Hold', value: 'HOLD', color: 'data-[active=true]:bg-signal-hold data-[active=true]:text-white' },
  { label: 'Sell', value: 'SELL', color: 'data-[active=true]:bg-signal-sell data-[active=true]:text-white' },
]

export default function StockGrid() {
  const dispatch = useAppDispatch()
  const { stocks, filterSignal, searchQuery, loading, tickers } = useAppSelector((s) => s.analysis)
  const [tickerInput, setTickerInput] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const filtered = stocks.filter((s) => {
    const matchesSignal = filterSignal === 'ALL' || s.signal === filterSignal
    const matchesSearch =
      !searchQuery ||
      s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.company.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSignal && matchesSearch
  })

  const buyCount = stocks.filter((s) => s.signal === 'BUY').length
  const holdCount = stocks.filter((s) => s.signal === 'HOLD').length
  const sellCount = stocks.filter((s) => s.signal === 'SELL').length

  const handleAddTicker = () => {
    const newTickers = tickerInput
      .toUpperCase()
      .split(/[,\s]+/)
      .filter((t) => t && !tickers.includes(t))
    if (newTickers.length > 0) {
      const updated = [...tickers, ...newTickers]
      dispatch(setTickers(updated))
      dispatch(fetchAnalysis(updated))
      setTickerInput('')
      setShowAdd(false)
    }
  }

  return (
    <section>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-5 bg-gradient-to-b from-accent-blue to-accent-purple rounded-full" />
            Stock Recommendations
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <StatPill label="Buy" count={buyCount} color="bg-signal-buy" />
            <StatPill label="Hold" count={holdCount} color="bg-signal-hold" />
            <StatPill label="Sell" count={sellCount} color="bg-signal-sell" />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <svg className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="bg-dark-700 border border-dark-500 rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 w-36 transition-all"
            />
          </div>

          <div className="flex bg-dark-700/80 rounded-lg p-0.5 border border-dark-500/50">
            {filters.map((f) => (
              <button
                key={f.value}
                data-active={filterSignal === f.value}
                onClick={() => dispatch(setFilterSignal(f.value))}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  filterSignal === f.value
                    ? f.color || 'bg-accent-blue text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAdd(!showAdd)}
            className="w-8 h-8 rounded-lg bg-dark-700 border border-dark-500 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-blue transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="mb-6 bg-dark-800 rounded-xl border border-dark-600 p-4 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Add tickers (e.g. AAPL, TSLA, AMZN)"
            value={tickerInput}
            onChange={(e) => setTickerInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTicker()}
            className="flex-1 bg-dark-700 border border-dark-500 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue"
          />
          <button
            onClick={handleAddTicker}
            disabled={loading || !tickerInput.trim()}
            className="px-4 py-2 bg-accent-blue rounded-lg text-white text-sm font-medium hover:bg-accent-blue/80 disabled:opacity-50 transition-colors"
          >
            Analyze
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((stock) => (
            <StockCard key={stock.ticker} stock={stock} />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-700 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No stocks match your filter.</p>
        </div>
      )}
    </section>
  )
}

function StatPill({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-400">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span>{count} {label}</span>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-dark-800 rounded-2xl border border-dark-600 p-5 animate-pulse">
      <div className="flex justify-between mb-4">
        <div>
          <div className="h-6 w-16 bg-dark-600 rounded mb-2" />
          <div className="h-3 w-32 bg-dark-600 rounded" />
        </div>
        <div className="h-7 w-14 bg-dark-600 rounded-full" />
      </div>
      <div className="flex justify-between">
        <div className="h-5 w-20 bg-dark-600 rounded" />
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-dark-600 rounded-full" />
          <div className="w-2 h-2 bg-dark-600 rounded-full" />
          <div className="w-2 h-2 bg-dark-600 rounded-full" />
        </div>
      </div>
    </div>
  )
}
