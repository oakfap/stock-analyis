import { useAppSelector, useAppDispatch } from '../store/hooks'
import { fetchAnalysis } from '../store/analysisSlice'

export default function Header() {
  const dispatch = useAppDispatch()
  const { market, loading, lastUpdated, tickers } = useAppSelector((s) => s.analysis)

  return (
    <header className="border-b border-dark-600 bg-dark-800/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue via-accent-purple to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-accent-purple/20">
              SA
            </div>
            {loading && (
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-signal-buy animate-ping" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-tight tracking-tight">
              Stock Analysis
            </h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              AI-Powered Insights
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-5">
            <IndexBadge label="S&P 500" value={market.sp500.value} change={market.sp500.change} />
            <IndexBadge label="NASDAQ" value={market.nasdaq.value} change={market.nasdaq.change} />
            <IndexBadge label="DOW" value={market.dow.value} change={market.dow.change} />
          </div>

          <div className="flex items-center gap-2">
            {lastUpdated && (
              <span className="text-[10px] text-gray-500 hidden lg:block">
                {new Date(lastUpdated).toLocaleString()}
              </span>
            )}
            <button
              onClick={() => dispatch(fetchAnalysis(tickers))}
              disabled={loading}
              className="group relative px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-accent-purple/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <span className={`flex items-center gap-2 ${loading ? 'opacity-0' : ''}`}>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </span>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="h-0.5 bg-dark-700 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-pink-500 animate-pulse w-full" />
        </div>
      )}
    </header>
  )
}

function IndexBadge({ label, value, change }: { label: string; value: number; change: number }) {
  const isNeg = change < 0
  return (
    <div className="flex flex-col items-end">
      <span className="text-gray-500 text-[10px] uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-white font-semibold text-sm tabular-nums">{value.toLocaleString()}</span>
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
          isNeg ? 'text-signal-sell bg-signal-sell/10' : 'text-signal-buy bg-signal-buy/10'
        }`}>
          {isNeg ? '' : '+'}{change}%
        </span>
      </div>
    </div>
  )
}
