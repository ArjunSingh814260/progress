import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import FreelainLead from '@/models/FreelainLead'

/**
 * Phase 5 — Conversion and Onboarding
 * Actions: Calendly booking, Contract gen, Stripe invoice, Notion onboard page
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  // Return converted leads (phase 4)
  const leads = await FreelainLead.find({
    userId: session.user.id,
    phase: 4,
  }).sort({ 'conversion.bookedAt': -1 })

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
      // Calendly
      calendlyEventUrl,
      bookedAt,
      // Contract
      contractDraftUrl,
      contractSignedAt,
      docuSignEnvelopeId,
      // Stripe
      stripeInvoiceId,
      stripeInvoiceUrl,
      invoiceSentAt,
      // Notion
      notionPageUrl,
      notionPageId,
    } = body

    if (!leadId || !action)
      return NextResponse.json({ error: 'leadId and action are required' }, { status: 400 })

    await connectDB()
    const updateData: Record<string, unknown> = { updatedAt: new Date() }

    if (action === 'book_call') {
      // Calendly auto-triggered on positive reply
      updateData['conversion.calendly'] = {
        eventUrl: calendlyEventUrl,
        bookedAt: bookedAt ?? new Date(),
      }
      updateData.status = 'call_booked'
    } else if (action === 'generate_contract') {
      // Claude drafts it, DocuSign sends
      updateData['conversion.contract'] = {
        draftUrl: contractDraftUrl,
        docuSignEnvelopeId,
        generatedAt: new Date(),
        signedAt: contractSignedAt ?? null,
      }
      updateData.status = contractSignedAt ? 'contract_signed' : 'contract_sent'
      if (contractSignedAt) {
        updateData.phase = 5 // fully onboarded
      }
    } else if (action === 'send_invoice') {
      // Stripe invoice auto-sent after contract signed
      updateData['conversion.invoice'] = {
        stripeInvoiceId,
        stripeInvoiceUrl,
        sentAt: invoiceSentAt ?? new Date(),
      }
      updateData.status = 'invoice_sent'
    } else if (action === 'create_notion_page') {
      // Notion onboarding page auto-created per new client
      updateData['conversion.notion'] = {
        pageUrl: notionPageUrl,
        pageId: notionPageId,
        createdAt: new Date(),
      }
      updateData.status = 'onboarded'
      updateData.phase = 5
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
    console.error('[freelainc/onboarding POST]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
