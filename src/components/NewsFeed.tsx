import { useState } from 'react'
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

type Tab = 'previous' | 'current' | 'next'

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'previous', label: 'Last Week', icon: '<<' },
  { key: 'current', label: 'This Week', icon: '>>' },
  { key: 'next', label: 'Next Week', icon: '>|' },
]

export default function NewsFeed() {
  const { previousWeek, currentWeek, nextWeek } = useAppSelector((s) => s.analysis)
  const [activeTab, setActiveTab] = useState<Tab>('current')

  const newsMap: Record<Tab, NewsItem[]> = {
    previous: previousWeek,
    current: currentWeek,
    next: nextWeek,
  }

  const items = newsMap[activeTab]

  return (
    <section className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl border border-dark-600 overflow-hidden">
      <div className="px-5 py-3 border-b border-dark-600 flex items-center justify-between">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1 h-3 bg-gradient-to-b from-signal-hold to-signal-buy rounded-full" />
          Weekly News
        </h2>
        <div className="flex bg-dark-600/50 rounded-md p-0.5">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-3 py-1 text-[10px] font-medium rounded transition-all flex items-center gap-1 ${
                activeTab === t.key
                  ? t.key === 'next'
                    ? 'bg-accent-purple text-white'
                    : t.key === 'current'
                    ? 'bg-accent-blue text-white'
                    : 'bg-dark-500 text-white'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <span className="font-mono text-[8px] opacity-60">{t.icon}</span>
              {t.label}
              <span className="text-[9px] opacity-50">({newsMap[t.key].length})</span>
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="py-6 text-center text-xs text-gray-600">No news items.</div>
      ) : (
        <div className="divide-y divide-dark-600/30">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 px-5 py-2.5 hover:bg-dark-600/20 transition-colors">
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
          ))}
        </div>
      )}
    </section>
  )
}
