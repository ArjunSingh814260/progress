import mongoose, { Schema, Document, Model } from 'mongoose'

// ─── Sub-schemas ─────────────────────────────────────────────────────────────

const TaskSchema = new Schema({
  taskId:      { type: String, required: true },   // unique slug e.g. "p1_apollo"
  title:       { type: String, required: true },   // display name
  description: { type: String, default: '' },      // short note
  completed:   { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
}, { _id: false })

const PhaseSchema = new Schema({
  phaseId:     { type: Number, required: true },   // 1-5
  title:       { type: String, required: true },
  tasks:       [TaskSchema],
}, { _id: false })

// ─── Main document ────────────────────────────────────────────────────────────

export interface IFreelancePipeline extends Document {
  userId: string
  phases: typeof PhaseSchema[]
  createdAt: Date
  updatedAt: Date
}

const FreelancePipelineSchema = new Schema<IFreelancePipeline>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    phases: [PhaseSchema],
  },
  { timestamps: true }
)

const FreelancePipeline: Model<IFreelancePipeline> =
  mongoose.models.FreelancePipeline ||
  mongoose.model<IFreelancePipeline>('FreelancePipeline', FreelancePipelineSchema)

export default FreelancePipeline

// ─── Default pipeline seed data (from the diagram) ───────────────────────────

export const DEFAULT_PIPELINE = [
  {
    phaseId: 1,
    title: 'Phase 1 — Lead Generation',
    tasks: [
      { taskId: 'p1_apollo',   title: 'Apollo.io',        description: 'Filter by tech stack + company size',        completed: false, completedAt: null },
      { taskId: 'p1_linkedin', title: 'LinkedIn Scraper',  description: 'n8n + Phantombuster or Apify',               completed: false, completedAt: null },
      { taskId: 'p1_jobboard', title: 'Job Boards',        description: 'Upwork, Fiverr RSS → n8n trigger',           completed: false, completedAt: null },
      { taskId: 'p1_social',   title: 'Social Signals',    description: 'Reddit, X (Twitter) keyword alerts',         completed: false, completedAt: null },
    ],
  },
  {
    phaseId: 2,
    title: 'Phase 2 — n8n Automation Hub',
    tasks: [
      { taskId: 'p2_dedup',     title: 'Deduplicate',    description: 'Remove duplicates + enrich data',              completed: false, completedAt: null },
      { taskId: 'p2_score',     title: 'Lead Scoring',   description: 'Budget signals + fit score',                   completed: false, completedAt: null },
      { taskId: 'p2_crm',       title: 'Push to CRM',    description: 'Airtable / Notion or Google Sheets',           completed: false, completedAt: null },
      { taskId: 'p2_claude',    title: 'Trigger Claude AI', description: 'Research each lead via Anthropic API',      completed: false, completedAt: null },
    ],
  },
  {
    phaseId: 3,
    title: 'Phase 3 — Claude AI Personalization Engine',
    tasks: [
      { taskId: 'p3_research',  title: 'Company Research',   description: 'Pain points, stack, recent news',          completed: false, completedAt: null },
      { taskId: 'p3_email',     title: 'Draft Cold Email',   description: 'Hyper-personalized per lead profile',       completed: false, completedAt: null },
      { taskId: 'p3_proposal',  title: 'Generate Proposal',  description: 'Custom PPT/PDF via Claude API',             completed: false, completedAt: null },
      { taskId: 'p3_loom',      title: 'Loom Script',        description: '30-sec video pitch per lead',               completed: false, completedAt: null },
    ],
  },
  {
    phaseId: 4,
    title: 'Phase 4 — Automated Outreach Engine',
    tasks: [
      { taskId: 'p4_email',     title: 'Cold Email Send',   description: 'Instantly.ai or Lemlist',                   completed: false, completedAt: null },
      { taskId: 'p4_linkedin',  title: 'LinkedIn DM',       description: 'Dripify or Expandi auto-sequences',         completed: false, completedAt: null },
      { taskId: 'p4_followup',  title: 'Follow-up Flow',    description: '5-step sequence, auto-timed',               completed: false, completedAt: null },
      { taskId: 'p4_replies',   title: 'Track Replies',     description: 'Open / click / reply → CRM update',         completed: false, completedAt: null },
    ],
  },
  {
    phaseId: 5,
    title: 'Phase 5 — Conversion and Onboarding',
    tasks: [
      { taskId: 'p5_calendly',  title: 'Calendly Booking',  description: 'Auto-triggered on positive reply',          completed: false, completedAt: null },
      { taskId: 'p5_contract',  title: 'Contract Gen',      description: 'Claude drafts it, DocuSign sends',          completed: false, completedAt: null },
      { taskId: 'p5_invoice',   title: 'Stripe Invoice',    description: 'Auto-sent after contract signed',           completed: false, completedAt: null },
      { taskId: 'p5_notion',    title: 'Notion Onboard',    description: 'Auto-created page per new client',          completed: false, completedAt: null },
    ],
  },
]
