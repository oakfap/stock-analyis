import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setFilterSignal, setSearchQuery } from '../store/analysisSlice'
import type { FilterSignal } from '../types'
import StockCard from './StockCard'

const filters: { label: string; value: FilterSignal }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Buy', value: 'BUY' },
  { label: 'Hold', value: 'HOLD' },
  { label: 'Sell', value: 'SELL' },
]

export default function StockGrid() {
  const dispatch = useAppDispatch()
  const { stocks, filterSignal, searchQuery } = useAppSelector((s) => s.analysis)

  const filtered = stocks.filter((s) => {
    const matchesSignal = filterSignal === 'ALL' || s.signal === filterSignal
    const matchesSearch =
      !searchQuery ||
      s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.company.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSignal && matchesSearch
  })

  const buyCount = stocks.filter((s) => s.signal === 'BUY').length
  const holdCount = stocks.filter((s) => s.signal === 'HOLD').length
  const sellCount = stocks.filter((s) => s.signal === 'SELL').length

  return (
    <section>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Stock Recommendations</h2>
          <p className="text-sm text-gray-400 mt-1">
            {buyCount} Buy / {holdCount} Hold / {sellCount} Sell
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search ticker..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="bg-dark-700 border border-dark-500 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue w-40"
          />
          <div className="flex bg-dark-700 rounded-lg p-0.5">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => dispatch(setFilterSignal(f.value))}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  filterSignal === f.value
                    ? 'bg-accent-blue text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((stock) => (
          <StockCard key={stock.ticker} stock={stock} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No stocks match your filter.
        </div>
      )}
    </section>
  )
}
