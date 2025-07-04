import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, default: 'Uncategorized' },
})

export const Transaction = mongoose.model('Transaction', transactionSchema)
