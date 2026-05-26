'use client'
import { useEffect, useState, useCallback } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { weeks } from '@/lib/data'
import WeekCard from '@/components/WeekCard'
import ProgressCharts from '@/components/ProgressCharts'

type View = 'tracker' | 'charts'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<View>('tracker')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  const fetchProgress = useCallback(async () => {
    const res = await fetch('/api/progress')
    const data = await res.json()
    const ids = new Set<string>(data.filter((d: { completed: boolean }) => d.completed).map((d: { taskId: string }) => d.taskId))
    setCompletedIds(ids)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (status === 'authenticated') fetchProgress()
  }, [status, fetchProgress])

  const handleToggle = async (taskId: string, weekId: number, completed: boolean) => {
    // Optimistic update
    setCompletedIds(prev => {
      const next = new Set(prev)
      if (completed) next.add(taskId)
      else next.delete(taskId)
      return next
    })
    setSaving(true)
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, weekId, completed }),
    })
    setSaving(false)
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-3">⚡</div>
          <p className="text-gray-500">Progress load ho raha hai...</p>
        </div>
      </div>
    )
  }

  const totalTasks = weeks.flatMap(w => w.sections.flatMap(s => s.tasks)).length
  const totalDone = completedIds.size
  const overallPct = Math.round((totalDone / totalTasks) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🚀</span>
            <div>
              <h1 className="font-bold text-gray-800 text-sm leading-none">MERN Prep Tracker</h1>
              <p className="text-xs text-gray-400">Target: 18-20 LPA</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saving && <span className="text-xs text-blue-500 animate-pulse">Saving...</span>}
            <span className="text-xs text-gray-500 hidden sm:block">Hi, {session?.user?.name?.split(' ')[0]}!</span>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-xs text-red-500 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Overall progress banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 mb-6 text-white">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-blue-100 text-sm">Overall Progress</p>
              <p className="text-3xl font-bold">{overallPct}%</p>
              <p className="text-blue-200 text-xs mt-1">{totalDone}/{totalTasks} tasks complete</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">6 Weeks Plan</p>
              <p className="text-2xl font-bold">45 Days</p>
              <p className="text-blue-200 text-xs mt-1">8 hours/day</p>
            </div>
          </div>
          <div className="h-3 bg-blue-500 rounded-full overflow-hidden">
            <div
              className="h-3 bg-white rounded-full transition-all duration-700"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('tracker')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${view === 'tracker' ? 'bg-blue-600 text-white shadow' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            ✅ Tracker
          </button>
          <button
            onClick={() => setView('charts')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${view === 'charts' ? 'bg-blue-600 text-white shadow' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            📊 Charts
          </button>
        </div>

        {/* Content */}
        {view === 'tracker' ? (
          <div className="space-y-4">
            {weeks.map(week => (
              <WeekCard
                key={week.id}
                week={week}
                completedIds={completedIds}
                onToggle={handleToggle}
              />
            ))}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 text-center">
              <p className="text-sm font-semibold text-orange-700">🏆 Target: 18-20 LPA job ya ₹2L+/month freelancing — Week 6 tak!</p>
            </div>
          </div>
        ) : (
          <ProgressCharts completedIds={completedIds} />
        )}
      </div>
    </div>
  )
}
