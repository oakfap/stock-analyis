import { useAppSelector } from '../store/hooks'

export default function Header() {
  const { market } = useAppSelector((s) => s.analysis)

  return (
    <header className="border-b border-dark-600 bg-dark-800/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-lg">
            SA
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-tight">
              Stock Analysis
            </h1>
            <p className="text-xs text-gray-400">
              AI-Powered Daily Insights
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <IndexBadge label="S&P 500" value={market.sp500.value} change={market.sp500.change} />
          <IndexBadge label="NASDAQ" value={market.nasdaq.value} change={market.nasdaq.change} />
          <IndexBadge label="DOW" value={market.dow.value} change={market.dow.change} />
          <div className="text-xs text-gray-500 hidden md:block">
            {market.date}
          </div>
        </div>
      </div>
    </header>
  )
}

function IndexBadge({ label, value, change }: { label: string; value: number; change: number }) {
  const isNeg = change < 0
  return (
    <div className="hidden sm:flex flex-col items-end">
      <span className="text-gray-400 text-xs">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-white font-medium text-sm">{value.toLocaleString()}</span>
        <span className={`text-xs font-medium ${isNeg ? 'text-signal-sell' : 'text-signal-buy'}`}>
          {isNeg ? '' : '+'}{change}%
        </span>
      </div>
    </div>
  )
}
