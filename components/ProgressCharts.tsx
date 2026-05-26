'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { weeks } from '@/lib/data'

interface Props {
  completedIds: Set<string>
}

const COLORS = ['#1D9E75', '#e5e7eb']

export default function ProgressCharts({ completedIds }: Props) {
  const weekData = weeks.map(w => {
    const allTasks = w.sections.flatMap(s => s.tasks)
    const total = allTasks.length
    const done = allTasks.filter(t => completedIds.has(t.id)).length
    return { name: w.badge, done, remaining: total - done, total, pct: Math.round((done / total) * 100) }
  })

  const totalTasks = weekData.reduce((a, b) => a + b.total, 0)
  const totalDone = weekData.reduce((a, b) => a + b.done, 0)
  const overallPct = Math.round((totalDone / totalTasks) * 100)

  const pieData = [
    { name: 'Completed', value: totalDone },
    { name: 'Remaining', value: totalTasks - totalDone },
  ]

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: totalTasks, color: 'text-gray-800' },
          { label: 'Completed', value: totalDone, color: 'text-green-600' },
          { label: 'Remaining', value: totalTasks - totalDone, color: 'text-orange-500' },
          { label: 'Progress', value: `${overallPct}%`, color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-700">Overall Progress</h3>
          <span className="text-sm font-bold text-green-600">{overallPct}%</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0%</span>
          <span>{totalDone}/{totalTasks} tasks done</span>
          <span>100%</span>
        </div>
      </div>

      {/* Bar Chart - Week wise */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-4">Week-wise Progress</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weekData} barSize={28}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value, name) => [value, name === 'done' ? 'Completed' : 'Remaining']}
              contentStyle={{ borderRadius: '8px', fontSize: '13px' }}
            />
            <Bar dataKey="done" fill="#1D9E75" radius={[4, 4, 0, 0]} name="done" />
            <Bar dataKey="remaining" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="remaining" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-4">Completion Overview</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '13px' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Per Week Progress Bars */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-4">Per Week Breakdown</h3>
        <div className="space-y-3">
          {weekData.map(w => (
            <div key={w.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{w.name}</span>
                <span className="text-gray-500">{w.done}/{w.total} — {w.pct}%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-2.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${w.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
