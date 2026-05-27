import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import FreelainLead from '@/models/FreelainLead'

/**
 * Phase 3 — Claude AI Personalization Engine
 * Actions: Company research, Draft cold email, Generate proposal, Loom script
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  // Return leads ready for personalization (phase 2)
  const leads = await FreelainLead.find({
    userId: session.user.id,
    phase: 2,
  }).sort({ fitScore: -1 })

  return NextResponse.json({ success: true, data: leads })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const {
      leadId,
      action,
      // Company research fields
      painPoints,
      techStackNotes,
      recentNews,
      // Cold email
      coldEmailDraft,
      // Proposal
      proposalUrl,
      proposalType, // 'ppt' | 'pdf'
      // Loom script
      loomScript,
    } = body

    if (!leadId || !action)
      return NextResponse.json({ error: 'leadId and action are required' }, { status: 400 })

    await connectDB()
    const updateData: Record<string, unknown> = { updatedAt: new Date() }

    if (action === 'research') {
      // Company research — pain points, stack, recent news
      updateData.research = { painPoints, techStackNotes, recentNews, researchedAt: new Date() }
      updateData.status = 'researched'
    } else if (action === 'draft_email') {
      // Hyper-personalized cold email per lead profile
      updateData.coldEmailDraft = coldEmailDraft
      updateData.coldEmailDraftedAt = new Date()
      updateData.status = 'email_drafted'
    } else if (action === 'generate_proposal') {
      // Custom PPT/PDF via Claude API
      updateData.proposal = { url: proposalUrl, type: proposalType, generatedAt: new Date() }
      updateData.status = 'proposal_ready'
    } else if (action === 'loom_script') {
      // 30-sec video pitch script per lead
      updateData.loomScript = loomScript
      updateData.loomScriptAt = new Date()
      updateData.status = 'loom_ready'
      updateData.phase = 3 // ready for outreach
    } else {
      return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
    }

    const lead = await FreelainLead.findOneAndUpdate(
      { _id: leadId, userId: session.user.id },
      updateData,
      { new: true }
    )

    if (!lead)
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

    return NextResponse.json({ success: true, data: lead })
  } catch (err) {
    console.error('[freelainc/personalization POST]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
