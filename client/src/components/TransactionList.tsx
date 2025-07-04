'use client'
import { Transaction } from '../types/transaction'
import { format } from 'date-fns'

interface Props {
  transactions: Transaction[]
  onDelete: (id: string) => void
}

export default function TransactionList({ transactions, onDelete }: Props) {
  return (
    <ul className="space-y-2">
      {transactions.map((tx) => (
        <li key={tx._id} className="flex justify-between border p-2 rounded">
          <span>₹{tx.amount} - {tx.description}</span>
          <span>{format(new Date(tx.date), 'dd MMM')}</span>
          <button onClick={() => tx._id && onDelete(tx._id)} className="text-red-600">Delete</button>
        </li>
      ))}
    </ul>
  )
}
