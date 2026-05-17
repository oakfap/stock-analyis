import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setFilterSignal, setSearchQuery } from '../store/analysisSlice'
import type { FilterSignal, StockAnalysis } from '../types'
import { SignalBadge, ConfidenceDots } from './SignalBadge'

const filters: { label: string; value: FilterSignal }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Buy', value: 'BUY' },
  { label: 'Hold', value: 'HOLD' },
  { label: 'Sell', value: 'SELL' },
]

export default function StockTable() {
  const dispatch = useAppDispatch()
  const { stocks, filterSignal, searchQuery, loading } = useAppSelector((s) => s.analysis)

  const filtered = stocks.filter((s) => {
    const matchesSignal = filterSignal === 'ALL' || s.signal === filterSignal
    const matchesSearch =
      !searchQuery ||
      s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.company.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSignal && matchesSearch
  })

  const counts = {
    BUY: stocks.filter((s) => s.signal === 'BUY').length,
    HOLD: stocks.filter((s) => s.signal === 'HOLD').length,
    SELL: stocks.filter((s) => s.signal === 'SELL').length,
  }

  return (
    <section className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl border border-dark-600 overflow-hidden">
      <div className="px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-dark-600">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-accent-blue to-accent-purple rounded-full" />
            Recommendations
          </h2>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-signal-buy">{counts.BUY}B</span>
            <span className="text-gray-600">/</span>
            <span className="text-signal-hold">{counts.HOLD}H</span>
            <span className="text-gray-600">/</span>
            <span className="text-signal-sell">{counts.SELL}S</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Filter..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="bg-dark-600/50 border border-dark-500 rounded-md px-2.5 py-1 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue w-24"
          />
          <div className="flex bg-dark-600/50 rounded-md p-0.5">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => dispatch(setFilterSignal(f.value))}
                className={`px-2 py-0.5 text-[10px] font-medium rounded transition-all ${
                  filterSignal === f.value
                    ? 'bg-accent-blue text-white'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-8 flex items-center justify-center gap-3">
          <div className="w-4 h-4 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
          <span className="text-xs text-gray-500">Analyzing stocks...</span>
        </div>
      ) : (
        <div className="divide-y divide-dark-600/50">
          <div className="hidden sm:grid grid-cols-[1fr_80px_80px_2fr] gap-2 px-5 py-2 text-[10px] text-gray-500 uppercase tracking-wider font-semibold bg-dark-900/30">
            <span>Stock</span>
            <span className="text-center">Signal</span>
            <span className="text-center">Conf.</span>
            <span>Summary</span>
          </div>
          {filtered.map((stock) => (
            <StockRow key={stock.ticker} stock={stock} />
          ))}
          {filtered.length === 0 && (
            <div className="py-8 text-center text-xs text-gray-500">No stocks match filter.</div>
          )}
        </div>
      )}
    </section>
  )
}

function StockRow({ stock }: { stock: StockAnalysis }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className={`grid grid-cols-1 sm:grid-cols-[1fr_80px_80px_2fr] gap-1 sm:gap-2 px-5 py-3 cursor-pointer transition-colors hover:bg-dark-600/30 ${
          open ? 'bg-dark-600/20' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <svg className={`w-3 h-3 text-gray-600 transition-transform duration-150 shrink-0 ${open ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-white font-bold text-sm">{stock.ticker}</span>
          <span className="text-gray-500 text-xs truncate">{stock.company}</span>
          {stock.sector && (
            <span className="text-[9px] text-gray-600 bg-dark-500/40 px-1.5 py-0.5 rounded hidden lg:inline">
              {stock.sector}
            </span>
          )}
        </div>
        <div className="flex sm:justify-center items-center">
          <SignalBadge signal={stock.signal} size="sm" />
        </div>
        <div className="flex sm:justify-center items-center">
          <ConfidenceDots confidence={stock.confidence} />
        </div>
        <p className="text-xs text-gray-400 truncate hidden sm:block">{stock.newsSummary}</p>
      </div>

      {open && (
        <div className="px-5 py-3 bg-dark-900/30 border-t border-dark-600/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-5">
            <div>
              <h4 className="text-[10px] font-bold text-signal-buy uppercase tracking-wider mb-1.5">Reasons</h4>
              <ul className="space-y-1">
                {stock.keyReasons.map((r, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-1.5">
                    <span className="text-signal-buy shrink-0">+</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-signal-sell uppercase tracking-wider mb-1.5">Risks</h4>
              <ul className="space-y-1">
                {stock.riskFactors.map((r, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-1.5">
                    <span className="text-signal-sell shrink-0">!</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Summary</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{stock.newsSummary}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
