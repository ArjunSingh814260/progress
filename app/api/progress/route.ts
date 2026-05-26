import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Progress from '@/models/Progress'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Login karo pehle' }, { status: 401 })
  await connectDB()
  const data = await Progress.find({ userId: session.user.id })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Login karo pehle' }, { status: 401 })
  const { taskId, weekId, completed } = await req.json()
  await connectDB()
  const doc = await Progress.findOneAndUpdate(
    { userId: session.user.id, taskId },
    { userId: session.user.id, taskId, weekId, completed, completedAt: completed ? new Date() : null },
    { upsert: true, new: true }
  )
  return NextResponse.json(doc)
}
