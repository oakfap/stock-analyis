import { useAppSelector } from '../store/hooks'

export default function Header() {
  const { loading, lastUpdated } = useAppSelector((s) => s.analysis)

  return (
    <header className="border-b border-dark-600 bg-dark-800/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
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

        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-[10px] text-gray-500">
              Updated: {new Date(lastUpdated).toLocaleString()}
            </span>
          )}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-accent-blue">
              <div className="w-4 h-4 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
              Analyzing...
            </div>
          )}
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
