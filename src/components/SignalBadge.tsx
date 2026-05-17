import type { Signal, Confidence } from '../types'

const signalConfig: Record<Signal, { bg: string; text: string; ring: string }> = {
  BUY: { bg: 'bg-signal-buy/15', text: 'text-signal-buy', ring: 'ring-signal-buy/30' },
  HOLD: { bg: 'bg-signal-hold/15', text: 'text-signal-hold', ring: 'ring-signal-hold/30' },
  SELL: { bg: 'bg-signal-sell/15', text: 'text-signal-sell', ring: 'ring-signal-sell/30' },
}

export function SignalBadge({ signal, size = 'md' }: { signal: Signal; size?: 'sm' | 'md' | 'lg' }) {
  const c = signalConfig[signal]
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }
  return (
    <span className={`${c.bg} ${c.text} ${c.ring} ring-1 rounded-full font-semibold inline-flex items-center ${sizeClasses[size]}`}>
      {signal}
    </span>
  )
}

export function ConfidenceDots({ confidence }: { confidence: Confidence }) {
  const count = confidence === 'High' ? 3 : confidence === 'Medium' ? 2 : 1
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i <= count ? 'bg-accent-blue' : 'bg-dark-500'
          }`}
        />
      ))}
      <span className="text-xs text-gray-400 ml-1">{confidence}</span>
    </div>
  )
}
