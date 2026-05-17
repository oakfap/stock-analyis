import type { StockAnalysis } from '../types'
import { SignalBadge, ConfidenceDots } from './SignalBadge'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setSelectedTicker } from '../store/analysisSlice'

export default function StockCard({ stock }: { stock: StockAnalysis }) {
  const dispatch = useAppDispatch()
  const selectedTicker = useAppSelector((s) => s.analysis.selectedTicker)
  const isSelected = selectedTicker === stock.ticker

  return (
    <div
      onClick={() => dispatch(setSelectedTicker(isSelected ? null : stock.ticker))}
      className={`bg-dark-800 rounded-2xl border cursor-pointer transition-all duration-200 hover:border-accent-blue/50 ${
        isSelected ? 'border-accent-blue ring-1 ring-accent-blue/20' : 'border-dark-600'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold text-lg">{stock.ticker}</span>
              {stock.ytdChange !== undefined && (
                <span className={`text-xs font-medium ${stock.ytdChange >= 0 ? 'text-signal-buy' : 'text-signal-sell'}`}>
                  {stock.ytdChange >= 0 ? '+' : ''}{stock.ytdChange}% YTD
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm">{stock.company}</p>
          </div>
          <SignalBadge signal={stock.signal} />
        </div>

        <div className="flex items-center justify-between mb-4">
          {stock.price && (
            <span className="text-white font-semibold">${stock.price.toFixed(2)}</span>
          )}
          <ConfidenceDots confidence={stock.confidence} />
        </div>

        {stock.sector && (
          <span className="text-xs text-gray-500 bg-dark-700 px-2 py-0.5 rounded-md">
            {stock.sector}
          </span>
        )}
      </div>

      {isSelected && (
        <div className="border-t border-dark-600 p-5 space-y-4 animate-in fade-in">
          <div>
            <h4 className="text-sm font-semibold text-signal-buy mb-2">Key Reasons</h4>
            <ul className="space-y-1">
              {stock.keyReasons.map((r, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-signal-buy mt-1 shrink-0">+</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-signal-sell mb-2">Risk Factors</h4>
            <ul className="space-y-1">
              {stock.riskFactors.map((r, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-signal-sell mt-1 shrink-0">!</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-1">Summary</h4>
            <p className="text-sm text-gray-300 leading-relaxed">{stock.newsSummary}</p>
          </div>
        </div>
      )}
    </div>
  )
}
