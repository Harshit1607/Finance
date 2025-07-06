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

export const editTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.body._id,
      {
        $set: {
          amount: req.body.amount,
          description: req.body.description,
          date: req.body.date,
          category: req.body.category,
        }
      },
      { new: true } // return the updated document
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Edit error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const deleteTransaction = async (req: Request, res: Response) => {
  await Transaction.findByIdAndDelete(req.params.id)
  res.status(204).send()
}
