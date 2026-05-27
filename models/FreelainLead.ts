import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IFreelainLead extends Document {
  userId: string
  // Phase 1 — Lead info
  name: string
  company?: string
  email?: string
  linkedinUrl?: string
  source: 'apollo' | 'linkedin' | 'jobboard' | 'social'
  techStack?: string[]
  companySize?: string
  jobTitle?: string
  notes?: string
  // Phase 2 — Automation
  fitScore?: number
  status: string
  phase: number // 1=leads 2=automation 3=personalized 4=outreach 5=onboarded
  crmPushed?: boolean
  crmPushedAt?: Date
  aiResearchTriggered?: boolean
  aiResearchTriggeredAt?: Date
  // Phase 3 — Personalization
  research?: {
    painPoints?: string
    techStackNotes?: string
    recentNews?: string
    researchedAt?: Date
  }
  coldEmailDraft?: string
  coldEmailDraftedAt?: Date
  proposal?: { url?: string; type?: string; generatedAt?: Date }
  loomScript?: string
  loomScriptAt?: Date
  // Phase 4 — Outreach
  outreach?: {
    coldEmail?: { provider?: string; sentAt?: Date }
    linkedinDm?: { provider?: string; sentAt?: Date }
    followUpStep?: number
    followUpSentAt?: Date
    lastContactedAt?: Date
    reply?: { type?: string; receivedAt?: Date; content?: string }
  }
  // Phase 5 — Conversion
  conversion?: {
    calendly?: { eventUrl?: string; bookedAt?: Date }
    contract?: { draftUrl?: string; docuSignEnvelopeId?: string; generatedAt?: Date; signedAt?: Date }
    invoice?: { stripeInvoiceId?: string; stripeInvoiceUrl?: string; sentAt?: Date }
    notion?: { pageUrl?: string; pageId?: string; createdAt?: Date }
  }
  createdAt: Date
  updatedAt: Date
}

const FreelainLeadSchema = new Schema<IFreelainLead>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    company: String,
    email: String,
    linkedinUrl: String,
    source: { type: String, enum: ['apollo', 'linkedin', 'jobboard', 'social'], required: true },
    techStack: [String],
    companySize: String,
    jobTitle: String,
    notes: String,
    fitScore: { type: Number, default: 0 },
    status: { type: String, default: 'new' },
    phase: { type: Number, default: 1 },
    crmPushed: { type: Boolean, default: false },
    crmPushedAt: Date,
    aiResearchTriggered: { type: Boolean, default: false },
    aiResearchTriggeredAt: Date,
    research: {
      painPoints: String,
      techStackNotes: String,
      recentNews: String,
      researchedAt: Date,
    },
    coldEmailDraft: String,
    coldEmailDraftedAt: Date,
    proposal: { url: String, type: String, generatedAt: Date },
    loomScript: String,
    loomScriptAt: Date,
    outreach: {
      coldEmail: { provider: String, sentAt: Date },
      linkedinDm: { provider: String, sentAt: Date },
      followUpStep: Number,
      followUpSentAt: Date,
      lastContactedAt: Date,
      reply: { type_: String, receivedAt: Date, content: String },
    },
    conversion: {
      calendly: { eventUrl: String, bookedAt: Date },
      contract: { draftUrl: String, docuSignEnvelopeId: String, generatedAt: Date, signedAt: Date },
      invoice: { stripeInvoiceId: String, stripeInvoiceUrl: String, sentAt: Date },
      notion: { pageUrl: String, pageId: String, createdAt: Date },
    },
  },
  { timestamps: true }
)

const FreelainLead: Model<IFreelainLead> =
  mongoose.models.FreelainLead ||
  mongoose.model<IFreelainLead>('FreelainLead', FreelainLeadSchema)

export default FreelainLead
