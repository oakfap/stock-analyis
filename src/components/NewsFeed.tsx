import { useAppSelector } from '../store/hooks'
import type { NewsItem } from '../types'

const impactColors: Record<string, string> = {
  Bullish: 'text-signal-buy bg-signal-buy/10',
  Bearish: 'text-signal-sell bg-signal-sell/10',
  Neutral: 'text-signal-hold bg-signal-hold/10',
}

const categoryColors: Record<string, string> = {
  AI: 'text-purple-400 bg-purple-400/10',
  Market: 'text-blue-400 bg-blue-400/10',
  Geopolitical: 'text-red-400 bg-red-400/10',
  Sector: 'text-cyan-400 bg-cyan-400/10',
  Economy: 'text-amber-400 bg-amber-400/10',
}

export default function NewsFeed() {
  const { news } = useAppSelector((s) => s.analysis)

  return (
    <section className="bg-dark-800 rounded-2xl border border-dark-600 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Key News Drivers</h2>
      <div className="space-y-3">
        {news.map((item, i) => (
          <NewsCard key={i} item={item} />
        ))}
      </div>
    </section>
  )
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors">
      <div className="shrink-0 flex flex-col gap-1.5 items-start">
        <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${categoryColors[item.category]}`}>
          {item.category}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${impactColors[item.impact]}`}>
          {item.impact}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-medium text-white leading-snug mb-1">{item.title}</h3>
        <p className="text-xs text-gray-400 leading-relaxed">{item.summary}</p>
      </div>
    </div>
  )
}
