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

  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl border border-dark-600 p-6">
      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-gradient-to-b from-signal-buy to-signal-hold rounded-full" />
        Signal Distribution
        <span className="text-xs text-gray-500 font-normal">({total} stocks)</span>
      </h3>
      <div className="flex items-center gap-8 flex-wrap justify-center">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={signalData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {signalData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#1a1a25', border: '1px solid #2a2a3a', borderRadius: '8px', color: '#e5e7eb' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-3">
          {signalData.map((d) => (
            <div key={d.name} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
              <span className="text-sm text-gray-300 font-medium w-12">{d.name}</span>
              <span className="text-white font-bold text-lg tabular-nums">{d.value}</span>
              <span className="text-xs text-gray-500">({total > 0 ? Math.round((d.value / total) * 100) : 0}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
