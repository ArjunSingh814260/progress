import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import FreelancePipeline, { DEFAULT_PIPELINE } from '@/models/FreelancePipeline'

/**
 * GET /api/freelainc-tasks
 * Returns the current user's full pipeline with all phases & task completion status.
 * Auto-seeds the default pipeline on first visit.
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()

  // Auto-seed on first visit
  let pipeline = await FreelancePipeline.findOne({ userId: session.user.id })
  if (!pipeline) {
    pipeline = await FreelancePipeline.create({
      userId: session.user.id,
      phases: DEFAULT_PIPELINE,
    })
  }

  // Compute summary stats
  const allTasks = pipeline.phases.flatMap((p: any) => p.tasks)
  const totalTasks = allTasks.length
  const completedTasks = allTasks.filter((t: any) => t.completed).length
  const overallPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const phaseStats = pipeline.phases.map((p: any) => ({
    phaseId: p.phaseId,
    title: p.title,
    total: p.tasks.length,
    completed: p.tasks.filter((t: any) => t.completed).length,
    percent: p.tasks.length > 0
      ? Math.round((p.tasks.filter((t: any) => t.completed).length / p.tasks.length) * 100)
      : 0,
    tasks: p.tasks,
  }))

  return NextResponse.json({
    success: true,
    data: {
      userId: pipeline.userId,
      overallPercent,
      completedTasks,
      totalTasks,
      phases: phaseStats,
      updatedAt: pipeline.updatedAt,
    },
  })
}

/**
 * PATCH /api/freelainc-tasks
 * Toggle a task completed/uncompleted.
 * Body: { taskId: string, completed: boolean }
 */
export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { taskId, completed } = await req.json()

    if (!taskId || typeof completed !== 'boolean')
      return NextResponse.json(
        { error: 'taskId (string) and completed (boolean) are required' },
        { status: 400 }
      )

    await connectDB()

    const pipeline = await FreelancePipeline.findOne({ userId: session.user.id })
    if (!pipeline)
      return NextResponse.json({ error: 'Pipeline not found. Call GET first to seed it.' }, { status: 404 })

    // Find and update the task inside the phases array
    let found = false
    for (const phase of pipeline.phases) {
      const task = phase.tasks.find((t: any) => t.taskId === taskId)
      if (task) {
        task.completed = completed
        task.completedAt = completed ? new Date() : null
        found = true
        break
      }
    }

    if (!found)
      return NextResponse.json({ error: `Task "${taskId}" not found` }, { status: 404 })

    pipeline.markModified('phases')
    await pipeline.save()

    // Return updated stats
    const allTasks = pipeline.phases.flatMap((p: any) => p.tasks)
    const totalTasks = allTasks.length
    const completedTasks = allTasks.filter((t: any) => t.completed).length

    return NextResponse.json({
      success: true,
      data: {
        taskId,
        completed,
        completedAt: completed ? new Date() : null,
        overallPercent: Math.round((completedTasks / totalTasks) * 100),
        completedTasks,
        totalTasks,
      },
    })
  } catch (err) {
    console.error('[freelainc-tasks PATCH]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

/**
 * POST /api/freelainc-tasks
 * Reset the pipeline back to all tasks uncompleted.
 * Body: { reset: true }
 */
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { reset } = await req.json()
    if (!reset)
      return NextResponse.json({ error: 'Send { reset: true } to reset pipeline' }, { status: 400 })

    await connectDB()

    const pipeline = await FreelancePipeline.findOneAndUpdate(
      { userId: session.user.id },
      { phases: DEFAULT_PIPELINE },
      { upsert: true, new: true }
    )

    return NextResponse.json({
      success: true,
      message: 'Pipeline reset to default',
      data: pipeline,
    })
  } catch (err) {
    console.error('[freelainc-tasks POST]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
