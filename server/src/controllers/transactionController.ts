import { Request, Response } from 'express'
import { Transaction } from '../models/Transaction'

export const getTransactions = async (req: Request, res: Response) => {
  const transactions = await Transaction.find().sort({ date: -1 })
  res.json(transactions)
}

export const createTransaction = async (req: Request, res: Response) => {
  const transaction = new Transaction(req.body)
  await transaction.save()
  res.status(201).json(transaction)
}

export const deleteTransaction = async (req: Request, res: Response) => {
  await Transaction.findByIdAndDelete(req.params.id)
  res.status(204).send()
}
