import { useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchAnalysis, setTickers } from '../store/analysisSlice'

const PRESET_STOCKS = [
  { ticker: 'GOOGL', name: 'Alphabet' },
  { ticker: 'NVDA', name: 'NVIDIA' },
  { ticker: 'ASML', name: 'ASML' },
  { ticker: 'LLY', name: 'Eli Lilly' },
  { ticker: 'AVGO', name: 'Broadcom' },
  { ticker: 'MU', name: 'Micron' },
  { ticker: 'PLTR', name: 'Palantir' },
  { ticker: 'VRT', name: 'Vertiv' },
  { ticker: 'AMD', name: 'AMD' },
  { ticker: 'NBIS', name: 'Nebius' },
  { ticker: 'RKLB', name: 'Rocket Lab' },
  { ticker: 'PLUG', name: 'Plug Power' },
  { ticker: 'GEV', name: 'GE Vernova' },
  { ticker: 'MSFT', name: 'Microsoft' },
  { ticker: 'META', name: 'Meta' },
  { ticker: 'SMCI', name: 'Super Micro' },
  { ticker: 'TSLA', name: 'Tesla' },
  { ticker: 'AAPL', name: 'Apple' },
  { ticker: 'AMZN', name: 'Amazon' },
]

export default function AnalyzePanel() {
  const dispatch = useAppDispatch()
  const { loading, lastUpdated } = useAppSelector((s) => s.analysis)
  const [selected, setSelected] = useState<Set<string>>(
    new Set(['GOOGL', 'NVDA', 'ASML', 'LLY', 'AVGO', 'MU', 'PLTR', 'VRT', 'AMD', 'NBIS', 'RKLB', 'PLUG', 'GEV'])
  )
  const [customInput, setCustomInput] = useState('')
  const [showRaw, setShowRaw] = useState(false)
  const [rawResponse, setRawResponse] = useState('')
  const rawRef = useRef<HTMLTextAreaElement>(null)

  const toggleTicker = (ticker: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(ticker)) next.delete(ticker)
      else next.add(ticker)
      return next
    })
  }

  const selectAll = () => setSelected(new Set(PRESET_STOCKS.map((s) => s.ticker)))
  const clearAll = () => setSelected(new Set())

  const totalCount = () => {
    const custom = customInput.toUpperCase().split(/[,\s]+/).filter((t) => t.length > 0)
    return new Set([...selected, ...custom]).size
  }

  const handleAnalyze = async () => {
    const customTickers = customInput.toUpperCase().split(/[,\s]+/).filter((t) => t.length > 0)
    const allTickers = [...new Set([...selected, ...customTickers])]
    if (allTickers.length === 0) return

    dispatch(setTickers(allTickers))
    setRawResponse('Fetching...')

    const resultAction = await dispatch(fetchAnalysis(allTickers))

    if (fetchAnalysis.fulfilled.match(resultAction)) {
      setRawResponse(JSON.stringify(resultAction.payload, null, 2))
    } else {
      setRawResponse(`Error: ${resultAction.error.message}`)
    }
  }

  return (
    <section className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl border border-dark-600 p-6">
      <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-gradient-to-b from-accent-purple to-pink-500 rounded-full" />
        Analyze Stocks
        {lastUpdated && (
          <span className="text-[10px] text-gray-500 font-normal ml-auto">
            Last: {new Date(lastUpdated).toLocaleString()}
          </span>
        )}
      </h2>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Stock Watchlist
            <span className="text-gray-600 ml-1.5 normal-case tracking-normal">({selected.size} selected)</span>
          </label>
          <div className="flex gap-2">
            <button onClick={selectAll} className="text-[10px] text-accent-blue hover:text-white transition-colors font-medium">
              Select All
            </button>
            <span className="text-gray-600 text-[10px]">|</span>
            <button onClick={clearAll} className="text-[10px] text-accent-blue hover:text-white transition-colors font-medium">
              Clear
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_STOCKS.map((s) => {
            const isSelected = selected.has(s.ticker)
            return (
              <button
                key={s.ticker}
                onClick={() => toggleTicker(s.ticker)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border ${
                  isSelected
                    ? 'bg-accent-blue/15 text-accent-blue border-accent-blue/30 shadow-sm shadow-accent-blue/10'
                    : 'bg-dark-600/30 text-gray-500 border-dark-500/50 hover:text-gray-300 hover:border-dark-500'
                }`}
              >
                <span className="font-bold">{s.ticker}</span>
                <span className="text-[10px] ml-1 opacity-60">{s.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mb-5">
        <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">
          Custom Tickers
        </label>
        <input
          type="text"
          placeholder="Add more tickers separated by comma (e.g. SOFI, COIN, SQ)"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          className="w-full bg-dark-600/50 border border-dark-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 transition-all"
        />
      </div>

      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={handleAnalyze}
          disabled={loading || totalCount() === 0}
          className="relative px-6 py-2.5 bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-accent-purple/25 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className={`flex items-center gap-2 ${loading ? 'opacity-0' : ''}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Analyze {totalCount()} Stocks
          </span>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </button>
        <span className="text-[10px] text-gray-600">
          Powered by Claude AI
        </span>
      </div>

      <div className="border-t border-dark-500/50 pt-4">
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors group"
        >
          <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${showRaw ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-medium">Raw API Response</span>
          {rawResponse && <span className="w-1.5 h-1.5 rounded-full bg-signal-buy animate-pulse" />}
        </button>
        {showRaw && (
          <textarea
            ref={rawRef}
            readOnly
            value={rawResponse || 'No response yet. Click Analyze to fetch data.'}
            className="w-full mt-3 bg-dark-900 border border-dark-500 rounded-xl p-4 text-xs text-gray-400 font-mono h-52 resize-y focus:outline-none selection:bg-accent-blue/30"
          />
        )}
      </div>
    </section>
  )
}
