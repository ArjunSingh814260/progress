import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import FreelainLead from '@/models/FreelainLead'

/**
 * Phase 1 — Lead Generation
 * Sources: Apollo.io, LinkedIn scraper, Job boards (Upwork/Fiverr RSS), Social signals
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const leads = await FreelainLead.find({ userId: session.user.id }).sort({ createdAt: -1 })
  return NextResponse.json({ success: true, data: leads })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const {
      name,
      company,
      email,
      linkedinUrl,
      source, // 'apollo' | 'linkedin' | 'jobboard' | 'social'
      techStack,
      companySize,
      jobTitle,
      notes,
    } = body

    if (!name || !source)
      return NextResponse.json({ error: 'name and source are required' }, { status: 400 })

    await connectDB()
    const lead = await FreelainLead.create({
      userId: session.user.id,
      name,
      company,
      email,
      linkedinUrl,
      source,
      techStack,
      companySize,
      jobTitle,
      notes,
      status: 'new',
      phase: 1,
    })

    return NextResponse.json({ success: true, data: lead }, { status: 201 })
  } catch (err) {
    console.error('[freelainc/leads POST]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
