'use client'
import { Week } from '@/lib/data'

interface Props {
  week: Week
  completedIds: Set<string>
  onToggle: (taskId: string, weekId: number, completed: boolean) => void
}

export default function WeekCard({ week, completedIds, onToggle }: Props) {
  const allTasks = week.sections.flatMap(s => s.tasks)
  const done = allTasks.filter(t => completedIds.has(t.id)).length
  const total = allTasks.length
  const pct = Math.round((done / total) * 100)

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-50">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: week.badgeBg, color: week.badgeColor }}>
            {week.badge}
          </span>
          <span className="text-sm text-gray-500">{week.days}</span>
          <span className="ml-auto text-sm font-semibold text-gray-600">{done}/{total}</span>
        </div>
        <h2 className="font-bold text-gray-800 text-base mb-3">{week.title}</h2>
        {/* Progress bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: pct === 100 ? '#1D9E75' : '#3b82f6' }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-right">{pct}% complete</div>
      </div>

      {/* Tasks */}
      <div className="p-5 space-y-4">
        {week.sections.map((section, si) => (
          <div key={si}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{section.title}</h3>
            <div className="space-y-1">
              {section.tasks.map(task => {
                const isChecked = completedIds.has(task.id)
                return (
                  <label
                    key={task.id}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group transition"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggle(task.id, week.id, !isChecked)}
                      className="mt-0.5 w-4 h-4 rounded accent-green-600 cursor-pointer flex-shrink-0"
                    />
                    <span className={`text-sm flex-1 leading-snug ${isChecked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {task.text}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium" style={{ background: task.tagBg, color: task.tagColor }}>
                      {task.tag}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {pct === 100 && (
        <div className="bg-green-50 border-t border-green-100 p-3 text-center text-sm text-green-700 font-semibold">
          ✅ Week Complete! Bhai tu badhiya hai! 🔥
        </div>
      )}
    </div>
  )
}
