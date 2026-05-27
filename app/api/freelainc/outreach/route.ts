import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import FreelainLead from '@/models/FreelainLead'

/**
 * Phase 4 — Automated Outreach Engine
 * Actions: Cold email send, LinkedIn DM, Follow-up flow, Track replies
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  // Return leads in active outreach (phase 3)
  const leads = await FreelainLead.find({
    userId: session.user.id,
    phase: 3,
  }).sort({ 'outreach.lastContactedAt': -1 })

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
      // Cold email
      emailProvider, // 'instantly' | 'lemlist'
      emailSentAt,
      // LinkedIn DM
      linkedinProvider, // 'dripify' | 'expandi'
      linkedinDmSentAt,
      // Follow-up
      followUpStep,   // 1–5
      followUpSentAt,
      // Reply tracking
      replyType,      // 'open' | 'click' | 'reply'
      replyReceivedAt,
      replyContent,
    } = body

    if (!leadId || !action)
      return NextResponse.json({ error: 'leadId and action are required' }, { status: 400 })

    await connectDB()
    const updateData: Record<string, unknown> = { updatedAt: new Date() }

    if (action === 'send_email') {
      // Send via Instantly.ai or Lemlist
      updateData['outreach.coldEmail'] = {
        provider: emailProvider,
        sentAt: emailSentAt ?? new Date(),
      }
      updateData['outreach.lastContactedAt'] = new Date()
      updateData.status = 'email_sent'
    } else if (action === 'send_linkedin_dm') {
      // Dripify or Expandi auto-sequences
      updateData['outreach.linkedinDm'] = {
        provider: linkedinProvider,
        sentAt: linkedinDmSentAt ?? new Date(),
      }
      updateData['outreach.lastContactedAt'] = new Date()
      updateData.status = 'linkedin_dm_sent'
    } else if (action === 'follow_up') {
      // 5-step sequence, auto-timed
      updateData['outreach.followUpStep'] = followUpStep ?? 1
      updateData['outreach.followUpSentAt'] = followUpSentAt ?? new Date()
      updateData['outreach.lastContactedAt'] = new Date()
      updateData.status = `follow_up_${followUpStep ?? 1}`
    } else if (action === 'track_reply') {
      // Open / click / reply → CRM update
      updateData['outreach.reply'] = {
        type: replyType,
        receivedAt: replyReceivedAt ?? new Date(),
        content: replyContent,
      }
      if (replyType === 'reply') {
        updateData.status = 'replied'
        updateData.phase = 4 // move to conversion
      } else {
        updateData.status = `reply_${replyType}`
      }
    } else {
      return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
    }

    const lead = await FreelainLead.findOneAndUpdate(
      { _id: leadId, userId: session.user.id },
      { $set: updateData },
      { new: true }
    )

    if (!lead)
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

    return NextResponse.json({ success: true, data: lead })
  } catch (err) {
    console.error('[freelainc/outreach POST]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
