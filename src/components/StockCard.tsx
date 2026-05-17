import type { StockAnalysis } from '../types'
import { SignalBadge, ConfidenceDots } from './SignalBadge'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setSelectedTicker } from '../store/analysisSlice'

const signalGlow: Record<string, string> = {
  BUY: 'hover:shadow-signal-buy/10',
  HOLD: 'hover:shadow-signal-hold/10',
  SELL: 'hover:shadow-signal-sell/10',
}

export default function StockCard({ stock }: { stock: StockAnalysis }) {
  const dispatch = useAppDispatch()
  const selectedTicker = useAppSelector((s) => s.analysis.selectedTicker)
  const isSelected = selectedTicker === stock.ticker

  return (
    <div
      onClick={() => dispatch(setSelectedTicker(isSelected ? null : stock.ticker))}
      className={`bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-xl ${signalGlow[stock.signal]} ${
        isSelected ? 'border-accent-blue ring-1 ring-accent-blue/20 shadow-lg shadow-accent-blue/5' : 'border-dark-600 hover:border-dark-500'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-white font-bold text-xl tracking-tight">{stock.ticker}</span>
              {stock.ytdChange !== undefined && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  stock.ytdChange >= 0
                    ? 'text-signal-buy bg-signal-buy/10'
                    : 'text-signal-sell bg-signal-sell/10'
                }`}>
                  {stock.ytdChange >= 0 ? '+' : ''}{stock.ytdChange}%
                </span>
              )}
            </div>
            <p className="text-gray-500 text-xs">{stock.company}</p>
          </div>
          <SignalBadge signal={stock.signal} />
        </div>

        <div className="flex items-center justify-between mb-3">
          {stock.price && (
            <span className="text-white font-bold text-lg tabular-nums">
              ${stock.price.toFixed(2)}
            </span>
          )}
          <ConfidenceDots confidence={stock.confidence} />
        </div>

        {stock.sector && (
          <span className="text-[10px] text-gray-500 bg-dark-600/50 px-2 py-1 rounded-md uppercase tracking-wider">
            {stock.sector}
          </span>
        )}
      </div>

      <div className={`border-t border-dark-600 overflow-hidden transition-all duration-300 ${
        isSelected ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-5 space-y-4">
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
      </div>
    </div>
  )
}
