import mongoose, { Schema } from 'mongoose'

const ProgressSchema = new Schema({
  userId: { type: String, required: true },
  taskId: { type: String, required: true },
  weekId: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
}, { timestamps: true })

ProgressSchema.index({ userId: 1, taskId: 1 }, { unique: true })

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema)
