import { useAppSelector } from '../store/hooks'

export default function MarketOverview() {
  const { market, error } = useAppSelector((s) => s.analysis)

  return (
    <section className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl border border-dark-600 p-5">
      {error && (
        <div className="mb-3 bg-signal-sell/10 border border-signal-sell/30 rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="text-signal-sell text-xs font-medium">Error:</span>
          <span className="text-signal-sell/70 text-xs">{error}</span>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1 h-3 bg-gradient-to-b from-accent-blue to-accent-purple rounded-full" />
            Market Overview
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">{market.summary}</p>
        </div>
        <div className="flex gap-3 md:gap-4 shrink-0">
          <Indicator label="Fed Rate" value={market.fedRate} />
          <Indicator label="Inflation" value={market.inflation} />
          <Indicator label="Oil" value={market.oil} />
        </div>
      </div>
    </section>
  )
}

function Indicator({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-dark-600/30 rounded-lg px-3 py-2 text-center min-w-[80px]">
      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">{label}</div>
      <div className="text-sm text-white font-semibold tabular-nums">{value}</div>
    </div>
  )
}
