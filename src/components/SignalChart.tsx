import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { useAppSelector } from '../store/hooks'

export default function SignalChart() {
  const { stocks } = useAppSelector((s) => s.analysis)

  const signalData = [
    { name: 'BUY', value: stocks.filter((s) => s.signal === 'BUY').length, color: '#10b981' },
    { name: 'HOLD', value: stocks.filter((s) => s.signal === 'HOLD').length, color: '#f59e0b' },
    { name: 'SELL', value: stocks.filter((s) => s.signal === 'SELL').length, color: '#ef4444' },
  ].filter((d) => d.value > 0)

  const total = stocks.length
  if (total === 0) return null

  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl border border-dark-600 p-5">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <span className="w-1 h-3 bg-gradient-to-b from-signal-buy to-signal-hold rounded-full" />
        Signals
      </h3>
      <div className="flex items-center justify-center gap-6">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie data={signalData} cx="50%" cy="50%" innerRadius={36} outerRadius={55} paddingAngle={4} dataKey="value">
              {signalData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: '#1a1a25', border: '1px solid #2a2a3a', borderRadius: '6px', color: '#e5e7eb', fontSize: '11px' }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-2">
          {signalData.map((d) => (
            <div key={d.name} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
              <span className="text-xs text-gray-400 w-9">{d.name}</span>
              <span className="text-white font-bold text-sm tabular-nums">{d.value}</span>
              <span className="text-[10px] text-gray-600">{Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
