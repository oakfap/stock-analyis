import { useAppSelector } from '../store/hooks'
import type { NewsItem } from '../types'

const impactColors: Record<string, string> = {
  Bullish: 'text-signal-buy',
  Bearish: 'text-signal-sell',
  Neutral: 'text-signal-hold',
}

const categoryColors: Record<string, string> = {
  AI: 'text-purple-400',
  Market: 'text-blue-400',
  Geopolitical: 'text-red-400',
  Sector: 'text-cyan-400',
  Economy: 'text-amber-400',
}

export default function NewsFeed() {
  const { news } = useAppSelector((s) => s.analysis)
  if (news.length === 0) return null

  return (
    <section className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl border border-dark-600 overflow-hidden">
      <div className="px-5 py-3 border-b border-dark-600">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1 h-3 bg-gradient-to-b from-signal-hold to-signal-buy rounded-full" />
          News Drivers
          <span className="text-gray-600 font-normal">({news.length})</span>
        </h2>
      </div>
      <div className="divide-y divide-dark-600/30">
        {news.map((item, i) => (
          <NewsRow key={i} item={item} />
        ))}
      </div>
    </section>
  )
}

function NewsRow({ item }: { item: NewsItem }) {
  return (
    <div className="flex items-start gap-3 px-5 py-2.5 hover:bg-dark-600/20 transition-colors">
      <div className="flex items-center gap-1.5 shrink-0 pt-0.5 min-w-[100px]">
        <span className={`text-[10px] font-semibold ${categoryColors[item.category] || 'text-gray-400'}`}>
          {item.category}
        </span>
        <span className="text-gray-700">·</span>
        <span className={`text-[10px] font-semibold ${impactColors[item.impact]}`}>
          {item.impact}
        </span>
      </div>
      <div className="min-w-0">
        <span className="text-xs text-white font-medium">{item.title}</span>
        <span className="text-xs text-gray-500 ml-1.5">{item.summary}</span>
      </div>
    </div>
  )
}
