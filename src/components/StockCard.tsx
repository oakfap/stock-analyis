import { useState } from 'react'
import type { StockAnalysis } from '../types'
import { SignalBadge, ConfidenceDots } from './SignalBadge'

const signalGlow: Record<string, string> = {
  BUY: 'hover:shadow-signal-buy/10',
  HOLD: 'hover:shadow-signal-hold/10',
  SELL: 'hover:shadow-signal-sell/10',
}

export default function StockCard({ stock }: { stock: StockAnalysis }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-xl ${signalGlow[stock.signal]} ${
          open ? 'border-accent-blue ring-1 ring-accent-blue/20 shadow-lg shadow-accent-blue/5' : 'border-dark-600 hover:border-dark-500'
        }`}
      >
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-white font-bold text-xl tracking-tight">{stock.ticker}</span>
              <p className="text-gray-500 text-xs mt-0.5">{stock.company}</p>
            </div>
            <SignalBadge signal={stock.signal} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {stock.sector && (
                <span className="text-[10px] text-gray-500 bg-dark-600/50 px-2 py-1 rounded-md uppercase tracking-wider">
                  {stock.sector}
                </span>
              )}
              <ConfidenceDots confidence={stock.confidence} />
            </div>
            <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {open && (
        <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-dark-800 border border-accent-blue/30 rounded-2xl shadow-2xl shadow-black/40 p-5 space-y-4">
          <div className="absolute -top-2 left-6 w-4 h-4 bg-dark-800 border-l border-t border-accent-blue/30 rotate-45" />
          <div>
            <h4 className="text-xs font-bold text-signal-buy uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1 h-3 bg-signal-buy rounded-full" />
              Key Reasons
            </h4>
            <ul className="space-y-1.5">
              {stock.keyReasons.map((r, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2 pl-2.5">
                  <span className="text-signal-buy mt-0.5 shrink-0 text-xs">+</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-signal-sell uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1 h-3 bg-signal-sell rounded-full" />
              Risk Factors
            </h4>
            <ul className="space-y-1.5">
              {stock.riskFactors.map((r, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2 pl-2.5">
                  <span className="text-signal-sell mt-0.5 shrink-0 text-xs">!</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-dark-600/30 rounded-xl p-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Summary</h4>
            <p className="text-sm text-gray-300 leading-relaxed">{stock.newsSummary}</p>
          </div>
        </div>
      )}
    </div>
  )
}
