import { useAppSelector } from '../store/hooks'
import type { NewsItem } from '../types'

const impactColors: Record<string, string> = {
  Bullish: 'text-signal-buy bg-signal-buy/10 ring-signal-buy/20',
  Bearish: 'text-signal-sell bg-signal-sell/10 ring-signal-sell/20',
  Neutral: 'text-signal-hold bg-signal-hold/10 ring-signal-hold/20',
}

const categoryConfig: Record<string, { color: string; icon: string }> = {
  AI: { color: 'text-purple-400 bg-purple-400/10', icon: '~' },
  Market: { color: 'text-blue-400 bg-blue-400/10', icon: '#' },
  Geopolitical: { color: 'text-red-400 bg-red-400/10', icon: '!' },
  Sector: { color: 'text-cyan-400 bg-cyan-400/10', icon: '*' },
  Economy: { color: 'text-amber-400 bg-amber-400/10', icon: '$' },
}

export default function NewsFeed() {
  const { news } = useAppSelector((s) => s.analysis)

  return (
    <section className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl border border-dark-600 p-6">
      <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-gradient-to-b from-signal-hold to-signal-buy rounded-full" />
        Key News Drivers
        <span className="text-xs text-gray-500 font-normal ml-1">({news.length} items)</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {news.map((item, i) => (
          <NewsCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const cat = categoryConfig[item.category] || categoryConfig['Market']

  return (
    <div className="flex gap-3 p-4 rounded-xl bg-dark-600/30 hover:bg-dark-600/50 transition-all duration-200 group border border-transparent hover:border-dark-500/50">
      <div className="shrink-0 flex flex-col items-center gap-2">
        <span className="text-[10px] text-gray-600 font-mono tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono ${cat.color}`}>
          {cat.icon}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium text-white leading-snug mb-2 group-hover:text-accent-blue transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed mb-2">{item.summary}</p>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ring-1 ${impactColors[item.impact]}`}>
            {item.impact}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${cat.color}`}>
            {item.category}
          </span>
        </div>
      </div>
    </div>
  )
}
