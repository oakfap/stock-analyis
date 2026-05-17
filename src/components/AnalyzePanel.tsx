import { useState } from 'react'
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
  const { loading } = useAppSelector((s) => s.analysis)
  const [selected, setSelected] = useState<Set<string>>(
    new Set(['GOOGL', 'NVDA', 'ASML', 'LLY', 'AVGO', 'MU', 'PLTR', 'VRT', 'AMD', 'NBIS', 'RKLB', 'PLUG', 'GEV'])
  )
  const [customInput, setCustomInput] = useState('')
  const [showRaw, setShowRaw] = useState(false)
  const [rawResponse, setRawResponse] = useState('')

  const toggleTicker = (t: string) => setSelected((p) => { const n = new Set(p); n.has(t) ? n.delete(t) : n.add(t); return n })
  const selectAll = () => setSelected(new Set(PRESET_STOCKS.map((s) => s.ticker)))
  const clearAll = () => setSelected(new Set())

  const getAllTickers = () => {
    const custom = customInput.toUpperCase().split(/[,\s]+/).filter(Boolean)
    return [...new Set([...selected, ...custom])]
  }

  const handleAnalyze = async () => {
    const all = getAllTickers()
    if (all.length === 0) return
    dispatch(setTickers(all))
    setRawResponse('Fetching...')
    const result = await dispatch(fetchAnalysis(all))
    setRawResponse(
      fetchAnalysis.fulfilled.match(result)
        ? JSON.stringify(result.payload, null, 2)
        : `Error: ${result.error.message}`
    )
  }

  return (
    <section className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl border border-dark-600 p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1 h-3 bg-gradient-to-b from-accent-purple to-pink-500 rounded-full" />
          Analyze
        </h2>
        <div className="flex gap-2 text-[10px]">
          <button onClick={selectAll} className="text-accent-blue hover:text-white transition-colors">All</button>
          <span className="text-gray-700">|</span>
          <button onClick={clearAll} className="text-accent-blue hover:text-white transition-colors">Clear</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {PRESET_STOCKS.map((s) => (
          <button
            key={s.ticker}
            onClick={() => toggleTicker(s.ticker)}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-all border ${
              selected.has(s.ticker)
                ? 'bg-accent-blue/15 text-accent-blue border-accent-blue/30'
                : 'bg-dark-600/20 text-gray-600 border-transparent hover:text-gray-400'
            }`}
          >
            {s.ticker}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Custom tickers (SOFI, COIN...)"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          className="flex-1 bg-dark-600/50 border border-dark-500 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || getAllTickers().length === 0}
          className="relative px-5 py-2 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg text-white text-xs font-semibold hover:shadow-lg hover:shadow-accent-purple/25 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className={loading ? 'opacity-0' : ''}>
            Analyze ({getAllTickers().length})
          </span>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </button>
      </div>

      <button
        onClick={() => setShowRaw(!showRaw)}
        className="flex items-center gap-1.5 text-[10px] text-gray-600 hover:text-gray-400 transition-colors"
      >
        <svg className={`w-2.5 h-2.5 transition-transform ${showRaw ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Raw Response
        {rawResponse && rawResponse !== 'Fetching...' && <span className="w-1 h-1 rounded-full bg-signal-buy" />}
      </button>
      {showRaw && (
        <textarea
          readOnly
          value={rawResponse || 'Click Analyze to fetch data.'}
          className="w-full mt-2 bg-dark-900 border border-dark-500 rounded-lg p-3 text-[10px] text-gray-500 font-mono h-36 resize-y focus:outline-none"
        />
      )}
    </section>
  )
}
