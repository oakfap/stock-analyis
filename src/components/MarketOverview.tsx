import { useAppSelector } from '../store/hooks'

export default function MarketOverview() {
  const { market } = useAppSelector((s) => s.analysis)

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-dark-800 rounded-2xl p-6 border border-dark-600">
        <h2 className="text-lg font-semibold text-white mb-3">Market Overview</h2>
        <p className="text-gray-400 text-sm leading-relaxed">{market.summary}</p>
      </div>
      <div className="bg-dark-800 rounded-2xl p-6 border border-dark-600 flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-white mb-1">Key Indicators</h2>
        <Indicator label="Fed Rate" value={market.fedRate} />
        <Indicator label="Inflation (PCE)" value={market.inflation} />
        <Indicator label="Oil Price" value={market.oil} />
      </div>
    </section>
  )
}

function Indicator({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-dark-600 last:border-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white font-medium text-sm">{value}</span>
    </div>
  )
}
