import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useAppSelector } from '../store/hooks'

export default function SignalChart() {
  const { stocks } = useAppSelector((s) => s.analysis)

  const signalData = [
    { name: 'BUY', value: stocks.filter((s) => s.signal === 'BUY').length, color: '#10b981' },
    { name: 'HOLD', value: stocks.filter((s) => s.signal === 'HOLD').length, color: '#f59e0b' },
    { name: 'SELL', value: stocks.filter((s) => s.signal === 'SELL').length, color: '#ef4444' },
  ].filter((d) => d.value > 0)

  const ytdData = stocks
    .filter((s) => s.ytdChange !== undefined)
    .sort((a, b) => (b.ytdChange ?? 0) - (a.ytdChange ?? 0))
    .map((s) => ({
      ticker: s.ticker,
      ytd: s.ytdChange,
      fill: (s.ytdChange ?? 0) >= 0 ? '#10b981' : '#ef4444',
    }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-dark-800 rounded-2xl border border-dark-600 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Signal Distribution</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={signalData}
              cx="50%"
              cy="50%"
              innerRadius={50}
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
        <div className="flex justify-center gap-4 mt-2">
          {signalData.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
              {d.name} ({d.value})
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dark-800 rounded-2xl border border-dark-600 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">YTD Performance (%)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ytdData} layout="vertical" margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} />
            <YAxis type="category" dataKey="ticker" tick={{ fill: '#e5e7eb', fontSize: 12, fontWeight: 600 }} axisLine={false} width={50} />
            <Tooltip
              contentStyle={{ background: '#1a1a25', border: '1px solid #2a2a3a', borderRadius: '8px', color: '#e5e7eb' }}
              formatter={(v) => [`${v}%`, 'YTD']}
            />
            <Bar dataKey="ytd" radius={[0, 4, 4, 0]} barSize={16}>
              {ytdData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
