import { useAppSelector } from '../store/hooks'

export default function MarketOverview() {
  const { market, error } = useAppSelector((s) => s.analysis)

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {error && (
        <div className="md:col-span-3 bg-signal-sell/10 border border-signal-sell/30 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-signal-sell/20 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-signal-sell" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <p className="text-signal-sell font-medium text-sm">Analysis Error</p>
            <p className="text-signal-sell/70 text-xs">{error}</p>
          </div>
        </div>
      )}

      <div className="md:col-span-2 bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl p-6 border border-dark-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-purple/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-gradient-to-b from-accent-blue to-accent-purple rounded-full" />
          Market Overview
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed relative">{market.summary}</p>
      </div>

      <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl p-6 border border-dark-600">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-gradient-to-b from-signal-hold to-signal-sell rounded-full" />
          Key Indicators
        </h2>
        <div className="space-y-0.5">
          <Indicator label="Fed Rate" value={market.fedRate} icon="%" />
          <Indicator label="Inflation" value={market.inflation} icon="^" />
          <Indicator label="Oil Price" value={market.oil} icon="$" />
        </div>
      </div>
    </section>
  )
}

function Indicator({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-dark-500/50 last:border-0 group">
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-md bg-dark-500/50 flex items-center justify-center text-xs text-gray-400 font-mono group-hover:bg-accent-blue/20 group-hover:text-accent-blue transition-colors">
          {icon}
        </span>
        <span className="text-gray-400 text-sm">{label}</span>
      </div>
      <span className="text-white font-semibold text-sm tabular-nums">{value}</span>
    </div>
  )
}
