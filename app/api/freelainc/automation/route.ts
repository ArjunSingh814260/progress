import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import FreelainLead from '@/models/FreelainLead'

/**
 * Phase 2 — n8n Automation Hub (the brain)
 * Actions: Deduplicate, Lead scoring, Push to CRM, Trigger Claude AI research
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  // Return leads that are in phase 1 (ready for automation)
  const leads = await FreelainLead.find({
    userId: session.user.id,
    phase: 1,
    status: { $ne: 'duplicate' },
  }).sort({ fitScore: -1 })

  return NextResponse.json({ success: true, data: leads })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { leadId, action, fitScore, crmPushed, isDuplicate } = body

    if (!leadId || !action)
      return NextResponse.json({ error: 'leadId and action are required' }, { status: 400 })

    await connectDB()

    const updateData: Record<string, unknown> = { updatedAt: new Date() }

    if (action === 'score') {
      // Budget signals + fit score
      updateData.fitScore = fitScore ?? 0
      updateData.status = 'scored'
    } else if (action === 'deduplicate') {
      updateData.status = isDuplicate ? 'duplicate' : 'unique'
    } else if (action === 'push_crm') {
      // Push to Airtable / Notion / Google Sheets
      updateData.crmPushed = crmPushed ?? true
      updateData.crmPushedAt = new Date()
    } else if (action === 'trigger_ai') {
      // Trigger Claude AI research via Anthropic API
      updateData.aiResearchTriggered = true
      updateData.aiResearchTriggeredAt = new Date()
      updateData.phase = 2
      updateData.status = 'ai_queued'
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
    console.error('[freelainc/automation POST]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
