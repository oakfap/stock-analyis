import type { Signal, Confidence } from '../types'

const signalConfig: Record<Signal, { bg: string; text: string; ring: string; glow: string }> = {
  BUY: { bg: 'bg-signal-buy/15', text: 'text-signal-buy', ring: 'ring-signal-buy/30', glow: 'shadow-signal-buy/20' },
  HOLD: { bg: 'bg-signal-hold/15', text: 'text-signal-hold', ring: 'ring-signal-hold/30', glow: 'shadow-signal-hold/20' },
  SELL: { bg: 'bg-signal-sell/15', text: 'text-signal-sell', ring: 'ring-signal-sell/30', glow: 'shadow-signal-sell/20' },
}

export function SignalBadge({ signal, size = 'md' }: { signal: Signal; size?: 'sm' | 'md' | 'lg' }) {
  const c = signalConfig[signal]
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  }
  return (
    <span className={`${c.bg} ${c.text} ${c.ring} ring-1 rounded-full font-bold inline-flex items-center tracking-wider ${sizeClasses[size]} shadow-sm ${c.glow}`}>
      {signal}
    </span>
  )
}

export function ConfidenceDots({ confidence }: { confidence: Confidence }) {
  const count = confidence === 'High' ? 3 : confidence === 'Medium' ? 2 : 1
  const colors = ['bg-accent-blue', 'bg-accent-blue', 'bg-accent-blue']
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            i <= count ? colors[i - 1] : 'bg-dark-500'
          }`}
        />
      ))}
      <span className="text-[10px] text-gray-500 ml-0.5 uppercase tracking-wider">{confidence}</span>
    </div>
  )
}
